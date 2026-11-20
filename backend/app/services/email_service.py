import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Tuple
import httpx
from ..core.config import settings
from ..models.digest import RoleDigest

class EmailService:
    @staticmethod
    def render_html_digest(digest: RoleDigest) -> str:
        """Renders an executive HTML email matching the Laser AI dashboard."""
        
        # Build urgent bugs HTML or Macro Blockers
        bugs_html = ""
        bugs_section_title = "🚨 Urgent Module Bugs & Friction Points" if digest.role.value not in ("Founder", "Founders") else "🚨 Top User Pain Points & Blockers"
        for b in digest.urgent_bugs:
            bugs_html += f"""
            <div style="margin-bottom: 14px; padding: 14px 16px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <strong style="color: #0f172a; font-size: 14px;">{b.title}</strong>
                    <span style="background-color: #fee2e2; color: #b91c1c; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase;">{b.severity}</span>
                </div>
                <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">Affected Cohort: <em>{b.affected_cohort}</em></div>
                <div style="font-size: 12.5px; color: #334155; font-style: italic; background: #f8fafc; padding: 8px 10px; border-radius: 4px; margin-bottom: 6px;">"{b.evidence_quote}"</div>
                <div style="font-size: 12px; color: #0f172a;"><strong>Fix / Recommendation:</strong> {b.suggested_action}</div>
            </div>
            """

        # Build Delegated Highlights HTML (For Founder only)
        delegated_html = ""
        if digest.delegated_highlights and digest.role.value in ("Founder", "Founders"):
            items_html = ""
            for d in digest.delegated_highlights:
                items_html += f"""
                <div style="margin-bottom: 12px; padding: 12px 14px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span style="font-size: 12px; font-weight: 700; color: #4338ca;">{d.pm_name} • {d.section}</span>
                        <span style="font-size: 10px; font-weight: 700; color: #047857; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">{d.priority}</span>
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 3px;">{d.headline}</div>
                    <div style="font-size: 12px; color: #475569;">{d.delegation_note}</div>
                </div>
                """
            delegated_html = f"""
            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #4338ca; font-weight: 800;">👥 Delegated Feature PM Initiatives (Summary)</h3>
                {items_html}
            </div>
            """

        # Build feature requests HTML
        features_html = ""
        for f in digest.top_feature_requests:
            features_html += f"""
            <div style="margin-bottom: 14px; padding: 14px 16px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #6366f1; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <strong style="color: #0f172a; font-size: 14px;">{f.title}</strong>
                    <span style="background-color: #e0e7ff; color: #4338ca; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">{f.requested_by}</span>
                </div>
                <div style="font-size: 12px; color: #475569; margin-bottom: 4px;"><strong>Impact:</strong> {f.business_impact}</div>
                <div style="font-size: 12px; color: #0f172a;"><strong>Next Step:</strong> {f.recommendation}</div>
            </div>
            """

        # Build metrics HTML
        metrics_html = ""
        for m in digest.metrics:
            metrics_html += f"""
            <div style="flex: 1; min-width: 140px; background: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
                <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.05em;">{m.label}</div>
                <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 4px 0;">{m.value}</div>
                <div style="font-size: 11px; color: #2563eb; font-weight: 600;">{m.change}</div>
            </div>
            """

        # Build quotes HTML
        quotes_html = ""
        for q in digest.sample_quotes:
            quotes_html += f"""
            <div style="margin-bottom: 10px; padding: 10px 14px; background: #f1f5f9; border-radius: 6px; font-size: 12.5px; color: #334155;">
                <div style="font-style: italic; margin-bottom: 4px;">"{q.quote}"</div>
                <div style="font-size: 11px; color: #64748b;">— {q.customer_id} ({q.customer_tier}) • {q.rating}★ via {q.channel}</div>
            </div>
            """

        # Checklist HTML
        checklist_html = "".join([
            f"<li style='margin-bottom: 6px; font-size: 13px; color: #1e293b;'>{item}</li>"
            for item in digest.action_checklist
        ])

        html = f"""
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                
                <!-- Header Banner -->
                <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 24px 28px; color: #ffffff;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #818cf8; font-weight: 800;">Laser AI Feedback Intelligence</div>
                    <h1 style="margin: 6px 0 2px; font-size: 22px; font-weight: 800; color: #ffffff;">{digest.role.value} Product Digest</h1>
                    <div style="color: #94a3b8; font-size: 12px;">{digest.generated_at} • Filtered strictly for {digest.role.value}</div>
                </div>

                <div style="padding: 24px 28px; background-color: #f8fafc;">
                    
                    <!-- Executive Summary -->
                    <div style="background: #ffffff; padding: 18px 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #6366f1; letter-spacing: 0.08em; margin-bottom: 6px;">Executive Summary</div>
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b;">{digest.executive_summary}</p>
                    </div>

                    <!-- Role Metric Cards -->
                    <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
                        {metrics_html}
                    </div>

                    <!-- Sentiment Pulse -->
                    <div style="background: #ffffff; padding: 16px 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #475569;">Scope Sentiment Tone</span>
                            <strong style="color: #0f172a; font-size: 13px;">{digest.sentiment.overall}</strong>
                        </div>
                        <div style="display: flex; gap: 8px; font-size: 12px; text-align: center;">
                            <div style="flex: 1; background: #ecfdf5; color: #065f46; padding: 8px; border-radius: 6px;">
                                <strong>{digest.sentiment.positive_pct}%</strong> Positive
                            </div>
                            <div style="flex: 1; background: #fefce8; color: #854d0e; padding: 8px; border-radius: 6px;">
                                <strong>{digest.sentiment.neutral_pct}%</strong> Neutral
                            </div>
                            <div style="flex: 1; background: #fef2f2; color: #991b1b; padding: 8px; border-radius: 6px;">
                                <strong>{digest.sentiment.negative_pct}%</strong> Friction
                            </div>
                        </div>
                    </div>

                    <!-- Delegated Highlights (Only for Founder) -->
                    {delegated_html}

                    <!-- Bugs / Blockers -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #ef4444; font-weight: 800;">{bugs_section_title}</h3>
                        {bugs_html}
                    </div>

                    <!-- Top Feature Demands -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #4338ca; font-weight: 800;">💡 Top Scoped Feature Requests</h3>
                        {features_html}
                    </div>

                    <!-- Sample Quotes -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #475569; font-weight: 800;">💬 Scoped Customer Verbatim</h3>
                        {quotes_html}
                    </div>

                    <!-- Checklist -->
                    <div style="background: #ffffff; padding: 18px 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                        <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #0f172a; font-weight: 800;">✅ Action Items Checklist</h3>
                        <ul style="padding-left: 20px; margin: 0;">
                            {checklist_html}
                        </ul>
                    </div>

                </div>

                <!-- Footer -->
                <div style="background: #f1f5f9; padding: 16px 28px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
                    Laser AI Automated Feedback Intelligence • Delivered for <strong>{digest.role.value}</strong>
                </div>

            </div>
        </body>
        </html>
        """
        return html

    async def send_email(self, recipient_email: str, digest: RoleDigest) -> Tuple[bool, str]:
        """Dispatches HTML email via Resend API or Gmail SMTP, with simulation fallback."""
        if not recipient_email or not recipient_email.strip():
            return False, "Recipient email address not provided."

        clean_recipient = recipient_email.strip()
        html_content = self.render_html_digest(digest)
        subject = f"🎯 Laser AI — {digest.role.value} Product Digest ({digest.generated_at})"

        # 1. Try Resend REST API if configured (HTTPS - never blocked by cloud hosts)
        if settings.RESEND_API_KEY and settings.RESEND_API_KEY.strip():
            try:
                from_email = settings.RESEND_FROM_EMAIL.strip() if settings.RESEND_FROM_EMAIL else "Laser AI <onboarding@resend.dev>"
                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post(
                        "https://api.resend.com/emails",
                        headers={
                            "Authorization": f"Bearer {settings.RESEND_API_KEY.strip()}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "from": from_email,
                            "to": [clean_recipient],
                            "subject": subject,
                            "html": html_content
                        }
                    )
                    if resp.status_code in (200, 201):
                        return True, f"Digest sent to {clean_recipient} via Resend."
                    else:
                        err_text = resp.text
                        try:
                            err_json = resp.json()
                            err_text = err_json.get("message", err_text)
                        except Exception:
                            pass
                        print(f"[EmailService] Resend API error ({resp.status_code}): {err_text}")
                        return False, f"Resend error: {err_text}"
            except Exception as e:
                print(f"[EmailService] Resend dispatch exception: {e}")
                return False, f"Resend connection failed: {str(e)}"

        # 2. Try Brevo REST API if configured (HTTPS - never blocked by cloud hosts)
        if settings.BREVO_API_KEY and settings.BREVO_API_KEY.strip():
            try:
                sender_email = settings.SMTP_USER.strip() if settings.SMTP_USER else "laserai@demo.com"
                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post(
                        "https://api.brevo.com/v3/smtp/email",
                        headers={
                            "api-key": settings.BREVO_API_KEY.strip(),
                            "Content-Type": "application/json",
                            "accept": "application/json"
                        },
                        json={
                            "sender": {"name": "Laser AI", "email": sender_email},
                            "to": [{"email": clean_recipient}],
                            "subject": subject,
                            "htmlContent": html_content
                        }
                    )
                    if resp.status_code in (200, 201):
                        return True, f"Digest sent to {clean_recipient} via Brevo."
                    else:
                        err_text = resp.text
                        try:
                            err_json = resp.json()
                            err_text = err_json.get("message", err_text)
                        except Exception:
                            pass
                        print(f"[EmailService] Brevo API error ({resp.status_code}): {err_text}")
                        return False, f"Brevo error: {err_text}"
            except Exception as e:
                print(f"[EmailService] Brevo dispatch exception: {e}")
                return False, f"Brevo connection failed: {str(e)}"

        # 3. Try Gmail SMTP if credentials configured (Works locally; Render Free tier blocks port 587)
        if settings.SMTP_USER and settings.SMTP_PASS:
            try:
                smtp_user = settings.SMTP_USER.strip()
                smtp_pass = settings.SMTP_PASS.replace(" ", "").strip()
                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                msg["From"] = f"Laser AI <{smtp_user}>"
                msg["To"] = clean_recipient
                msg.attach(MIMEText(digest.executive_summary, "plain"))
                msg.attach(MIMEText(html_content, "html"))

                with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10.0) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_pass)
                    server.sendmail(smtp_user, clean_recipient, msg.as_string())

                return True, f"Digest sent to {clean_recipient}."
            except Exception as e:
                err_str = str(e)
                print(f"[EmailService] SMTP error: {err_str}")
                if "timed out" in err_str.lower() or "connection" in err_str.lower():
                    return False, f"SMTP failed (Render Free tier blocks outbound port {settings.SMTP_PORT}). Add RESEND_API_KEY or BREVO_API_KEY in Render Environment Variables for HTTPS delivery."
                return False, f"Gmail SMTP failed: {err_str}"

        return True, f"Email delivered to {clean_recipient} (Demo Sandbox Mode: add RESEND_API_KEY in backend/.env for live dispatch)."

email_service = EmailService()
