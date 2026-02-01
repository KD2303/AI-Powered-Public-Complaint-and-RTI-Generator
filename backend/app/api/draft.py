"""
Draft Generation API Router
Creates document drafts from user input
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class DraftRequest(BaseModel):
    applicant_name: str
    applicant_address: str
    applicant_state: str
    applicant_phone: Optional[str] = None
    applicant_email: Optional[str] = None
    issue_description: str
    document_type: str  # "rti" or "complaint"
    language: str = "english"
    tone: str = "neutral"


class DraftResponse(BaseModel):
    draft_text: str
    document_type: str
    language: str
    metadata: dict


@router.post("/draft", response_model=DraftResponse)
async def generate_draft(request: DraftRequest):
    """
    Generate a document draft based on user input and document type.
    Uses templates and fills in extracted/provided data.
    """
    # TODO: Implement draft assembly
    return DraftResponse(
        draft_text="[Draft will be generated here]",
        document_type=request.document_type,
        language=request.language,
        metadata={"generated_at": "2026-02-01"}
    )
