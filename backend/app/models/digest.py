from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from .user import UserRole

class FeedbackItem(BaseModel):
    review_id: Optional[str] = None
    date: Optional[str] = None
    user_name: Optional[str] = None
    company_tier: Optional[str] = None
    product_area: Optional[str] = None
    department_tag: Optional[str] = None
    sentiment: Optional[str] = None
    feedback_text: str
    id: Optional[str] = None
    timestamp: Optional[str] = None
    customer_id: Optional[str] = None
    customer_tier: Optional[str] = None
    rating: Optional[int] = 3
    category: Optional[str] = None
    channel: Optional[str] = "Google Sheet"
    urgency: Optional[str] = "Medium"
    role_relevance: float = 1.0

class RoleMetric(BaseModel):
    label: str
    value: str
    change: str
    status: str  # positive, warning, negative
    description: str

class SentimentDataPoint(BaseModel):
    name: str
    value: float
    count: int
    color: str

class SentimentBreakdown(BaseModel):
    overall: str
    positive_pct: float
    neutral_pct: float
    negative_pct: float
    chart_data: List[SentimentDataPoint]

class UrgentBug(BaseModel):
    id: str
    title: str
    severity: str  # Critical, High, Moderate
    affected_cohort: str
    evidence_quote: str
    suggested_action: str

class FeatureRequest(BaseModel):
    id: str
    title: str
    requested_by: str
    business_impact: str
    recommendation: str

class DelegatedHighlight(BaseModel):
    pm_name: str
    section: str
    priority: str
    headline: str
    delegation_note: str

class SampleQuote(BaseModel):
    id: str
    quote: str
    customer_id: str
    customer_tier: str
    rating: int
    channel: str

class RoleDigest(BaseModel):
    role: UserRole
    generated_at: str
    total_feedback_analyzed: int
    role_filtered_count: int
    executive_summary: str
    sentiment: SentimentBreakdown
    metrics: List[RoleMetric]
    urgent_bugs: List[UrgentBug]
    top_feature_requests: List[FeatureRequest]
    delegated_highlights: Optional[List[DelegatedHighlight]] = []
    sample_quotes: List[SampleQuote]
    action_checklist: List[str]
    rendered_email_html: Optional[str] = None
    slack_blocks: Optional[List[Dict[str, Any]]] = None

class GenerateDigestRequest(BaseModel):
    role: UserRole
    sheet_url: Optional[str] = None

class DispatchRequest(BaseModel):
    digest: RoleDigest
    recipient_email: Optional[str] = None
    slack_webhook_url: Optional[str] = None

class DispatchResponse(BaseModel):
    slack_sent: bool
    slack_message: str
    email_sent: bool
    email_message: str
    timestamp: str
