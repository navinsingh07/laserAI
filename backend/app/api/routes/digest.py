import asyncio
from fastapi import APIRouter, HTTPException
from ...models.digest import RoleDigest, GenerateDigestRequest
from ...services.sheets_service import sheets_service
from ...services.llm_service import llm_service

router = APIRouter(prefix="/digest", tags=["Digest Intelligence"])

@router.post("/generate", response_model=RoleDigest)
async def generate_role_digest(req: GenerateDigestRequest):
    """
    Generates structured role-specific digest.
    - Default Demo Mode: Serves precomputed static role data with a simulated 2-second realistic delay (Zero Gemini API calls).
    - Live Online Sheet Mode: Runs real-time Gemini 2.5 Flash API single-pass role-filtering pipeline on live fetched rows.
    """
    is_demo = sheets_service.is_demo_mode(req.sheet_url)

    if is_demo:
        # Simulated realism: 2-second realistic analysis delay
        await asyncio.sleep(2.0)
        items = sheets_service.fetch_feedback_items(role=req.role)
        return llm_service.generate_role_digest(items, req.role, is_demo_mode=True)

    # Live Online Sheet Mode / Custom Dataset: Real Gemini 2.5 Flash API execution
    items = sheets_service.fetch_feedback_items(sheet_url=req.sheet_url, role=req.role)
    if not items:
        raise HTTPException(status_code=400, detail="No feedback records found to synthesize.")

    return llm_service.generate_role_digest(items, req.role, is_demo_mode=False)
