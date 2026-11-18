from typing import List, Optional
from fastapi import APIRouter, Query
from ...models.digest import FeedbackItem
from ...models.user import UserRole
from ...services.sheets_service import sheets_service

router = APIRouter(prefix="/feedback", tags=["Customer Feedback Data"])

@router.get("/raw", response_model=List[FeedbackItem])
def get_raw_feedback(
    role: Optional[UserRole] = None,
    sheet_url: Optional[str] = Query(None, description="Custom Google Sheet URL")
):
    """Retrieves raw 30-row customer feedback dataset with role-relevance scoring."""
    return sheets_service.fetch_feedback_items(sheet_url=sheet_url, role=role)

@router.get("/stats")
def get_feedback_stats(sheet_url: Optional[str] = None):
    """Provides dataset overview metrics (categories, urgency, channels)."""
    df = sheets_service.fetch_dataframe(sheet_url)
    return {
        "total_records": len(df),
        "categories": df["category"].value_counts().to_dict(),
        "urgency_levels": df["urgency"].value_counts().to_dict(),
        "average_rating": round(float(df["rating"].mean()), 2),
        "channels": df["channel"].value_counts().to_dict()
    }
