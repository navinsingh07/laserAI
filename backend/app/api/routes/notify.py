from datetime import datetime
from fastapi import APIRouter
from ...models.digest import DispatchRequest, DispatchResponse
from ...services.slack_service import slack_service
from ...services.email_service import email_service

router = APIRouter(prefix="/notify", tags=["Notification Dispatcher"])

@router.post("/dispatch", response_model=DispatchResponse)
async def dispatch_digest(req: DispatchRequest):
    """Fires the real email and/or Slack message immediately."""
    slack_sent = False
    slack_msg = "Slack Webhook URL not provided."
    email_sent = False
    email_msg = "Recipient email address not provided."

    if req.slack_webhook_url:
        slack_sent, slack_msg = await slack_service.send_digest(req.slack_webhook_url, req.digest)

    if req.recipient_email:
        email_sent, email_msg = await email_service.send_email(req.recipient_email, req.digest)

    return DispatchResponse(
        slack_sent=slack_sent,
        slack_message=slack_msg,
        email_sent=email_sent,
        email_message=email_msg,
        timestamp=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    )
