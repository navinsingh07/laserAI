from typing import List, Optional
from fastapi import APIRouter, Query, UploadFile, File, HTTPException
from ...models.digest import FeedbackItem
from ...models.user import UserRole
from ...services.sheets_service import sheets_service
from ...services.llm_service import llm_service

router = APIRouter(prefix="/feedback", tags=["Customer Feedback Data"])

@router.get("/raw", response_model=List[FeedbackItem])
def get_raw_feedback(
    role: Optional[UserRole] = None,
    sheet_url: Optional[str] = Query(None, description="Custom Google Sheet URL")
):
    """Retrieves customer feedback dataset with dynamic AI role filtering."""
    items = sheets_service.fetch_feedback_items(sheet_url=sheet_url)
    if role and role in (UserRole.ENGINEERS, UserRole.SALES):
        digest = llm_service.generate_role_digest(items, role)
        return digest.filtered_reviews or items
    return items

@router.post("/upload")
async def upload_feedback_file(file: UploadFile = File(...)):
    """Uploads a CSV or Excel file (.xlsx, .xls) to dynamically change the feedback dataset."""
    allowed_exts = (".csv", ".xlsx", ".xls")
    if not file.filename.lower().endswith(allowed_exts):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a .csv, .xlsx, or .xls file."
        )

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        result = sheets_service.load_from_upload(content, file.filename)
        return {
            "success": True,
            "message": f"Successfully ingested {result['total_rows']} rows from {file.filename}",
            **result
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error parsing uploaded file: {str(e)}"
        )

@router.post("/reset")
def reset_feedback_dataset():
    """Resets dataset back to the default 150-row Google Sheet dataset."""
    result = sheets_service.reset_custom_dataset()
    return {"success": True, **result}

@router.get("/dataset-info")
def get_current_dataset_info():
    """Returns metadata about the active dataset."""
    return sheets_service.get_dataset_info()

@router.get("/stats")
def get_feedback_stats(sheet_url: Optional[str] = None):
    """Provides dataset overview metrics (categories, urgency, channels)."""
    df = sheets_service.fetch_dataframe(sheet_url)
    cat_dict = df["category"].value_counts().to_dict() if "category" in df.columns else {"General": len(df)}
    urg_dict = df["urgency"].value_counts().to_dict() if "urgency" in df.columns else {"Normal": len(df)}
    avg_rating = round(float(df["rating"].mean()), 2) if "rating" in df.columns else 3.5
    chan_dict = df["channel"].value_counts().to_dict() if "channel" in df.columns else {"Google Sheets": len(df)}

    return {
        "total_records": len(df),
        "categories": cat_dict,
        "urgency_levels": urg_dict,
        "average_rating": avg_rating,
        "channels": chan_dict
    }
