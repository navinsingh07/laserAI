from typing import Dict, Any, List, Tuple
import httpx
from ..models.digest import RoleDigest

class SlackService:
    @staticmethod
    def format_slack_blocks(digest: RoleDigest) -> List[Dict[str, Any]]:
        """Converts RoleDigest into rich Slack Block Kit blocks matching the dashboard."""
        role_emojis = {
            "Founders": "👑",
            "Founder": "👑",
            "PMs": "📊",
            "Review Section PM": "⭐",
            "Sharing Section PM": "🔗",
            "Engineers": "⚙️",
            "Sales": "💼"
        }
        emoji = role_emojis.get(digest.role.value, "🎯")

        blocks: List[Dict[str, Any]] = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f"{emoji} Laser AI — {digest.role.value} Digest",
                    "emoji": True
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": f"📅 *Generated:* {digest.generated_at} | 📊 *Scope:* {digest.role.value} Only | 🎯 *Sentiment:* {digest.sentiment.overall}"
                    }
                ]
            },
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*Executive Intelligence Summary:*\n{digest.executive_summary}"
                }
            }
        ]

        # Delegated PM Summary Highlights (For Founder only)
        if digest.delegated_highlights and digest.role.value in ("Founder", "Founders"):
            blocks.extend([
                {"type": "divider"},
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*👥 Delegated Feature PM Initiatives (Summary):*"
                    }
                }
            ])
            for d in digest.delegated_highlights:
                blocks.append({
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"• *{d.pm_name}* ({d.section}) — `[{d.priority}]`\n*{d.headline}*\n👉 _{d.delegation_note}_"
                    }
                })

        # Urgent bugs / Revenue Blockers
        bug_header = "*🚨 Top User Pain Points & Blockers:*" if digest.role.value == "Founder" else "*🚨 Urgent Scoped Module Bugs:*"
        blocks.extend([
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": bug_header
                }
            }
        ])
        for bug in digest.urgent_bugs[:2]:
            blocks.append({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"• *[{bug.severity}] {bug.title}*\n_Cohort:_ {bug.affected_cohort}\n_Evidence:_ \"{bug.evidence_quote}\"\n👉 *Action:* {bug.suggested_action}"
                }
            })

        # Feature requests
        blocks.extend([
            {"type": "divider"},
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*💡 Scoped Feature Demands:*"
                }
            }
        ])
        for feat in digest.top_feature_requests[:2]:
            blocks.append({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"• *{feat.title}* ({feat.requested_by})\n_Impact:_ {feat.business_impact}\n_Next Step:_ {feat.recommendation}"
                }
            })

        # Sample customer quotes
        if digest.sample_quotes:
            quote_lines = "\n\n".join([
                f"> \"{q.quote}\"\n> — `{q.customer_id}` ({q.rating}★ via {q.channel})"
                for q in digest.sample_quotes[:2]
            ])
            blocks.extend([
                {"type": "divider"},
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"*Voice of Customer Verbatim:*\n{quote_lines}"
                    }
                }
            ])

        # Action checklist
        if digest.action_checklist:
            checklist = "\n".join([f"• [ ] {item}" for item in digest.action_checklist[:3]])
            blocks.extend([
                {"type": "divider"},
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"*Action Items Checklist:*\n{checklist}"
                    }
                }
            ])

        blocks.append({
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": f"⚡ Strictly Scoped via Laser AI for {digest.role.value}"
                }
            ]
        })

        return blocks

    async def send_digest(self, webhook_url: str, digest: RoleDigest) -> Tuple[bool, str]:
        """Dispatches the formatted digest to Slack via Incoming Webhook."""
        if not webhook_url:
            return False, "No Slack Webhook URL configured."

        blocks = self.format_slack_blocks(digest)
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(webhook_url, json={"blocks": blocks})
                if resp.status_code == 200:
                    return True, "Slack message delivered to webhook channel successfully."
                else:
                    return False, f"Slack webhook returned status {resp.status_code}: {resp.text}"
        except Exception as e:
            return False, f"Slack dispatch error: {str(e)}"

slack_service = SlackService()
