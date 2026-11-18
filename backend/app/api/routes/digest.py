from fastapi import APIRouter, HTTPException
from ...models.digest import RoleDigest, GenerateDigestRequest
from ...services.sheets_service import sheets_service
from ...services.llm_service import llm_service

router = APIRouter(prefix="/digest", tags=["Digest Intelligence"])

@router.post("/generate", response_model=RoleDigest)
def generate_role_digest(req: GenerateDigestRequest):
    """Generates structured role-specific digest via Gemini / intelligence engine."""
    items = sheets_service.fetch_feedback_items(sheet_url=req.sheet_url, role=req.role)
    if not items:
        raise HTTPException(status_code=400, detail="No feedback records found to synthesize.")

    return llm_service.generate_role_digest(items, req.role)
