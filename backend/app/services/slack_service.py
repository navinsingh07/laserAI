from typing import Dict, Any, List, Tuple
import httpx
from ..core.config import settings
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

    async def send_digest(self, destination: str, digest: RoleDigest) -> Tuple[bool, str]:
        """
        Dispatches the formatted digest to Slack.
        Supports:
          1. Incoming Webhook URL (https://hooks.slack.com/services/...)
          2. Slack Member ID (e.g. U0CK7UEJC1X), Channel ID, or username via Slack Bot Token.
        """
        if not destination or not destination.strip():
            return False, "No Slack Member ID or Webhook URL provided."

        target = destination.strip()
        blocks = self.format_slack_blocks(digest)
        headline = f"Laser AI — {digest.role.value} Digest"

        # 1. Incoming Webhook URL
        if target.startswith("http://") or target.startswith("https://"):
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.post(target, json={"text": headline, "blocks": blocks})
                    if resp.status_code == 200:
                        return True, "Slack digest delivered to webhook channel successfully."
                    else:
                        return False, f"Slack webhook returned status {resp.status_code}: {resp.text}"
            except Exception as e:
                return False, f"Slack webhook dispatch error: {str(e)}"

        # 2. Slack Bot Token Direct Message (DM by Member ID, Channel ID, or Username)
        bot_token = settings.SLACK_BOT_TOKEN.strip() if settings.SLACK_BOT_TOKEN else ""
        if not bot_token:
            return False, "Slack Bot Token not configured in backend/.env. Please provide a Webhook URL or set SLACK_BOT_TOKEN."

        headers = {
            "Authorization": f"Bearer {bot_token}",
            "Content-Type": "application/json; charset=utf-8"
        }

        clean_target = target.lstrip("@").strip()

        try:
            async with httpx.AsyncClient(timeout=12.0) as client:
                channel_id = None
                # If target is already a channel (starts with C or D), post directly
                if clean_target.startswith("C") or clean_target.startswith("D"):
                    channel_id = clean_target

                # If target starts with U or W (Member ID), open a DM conversation first
                elif clean_target.startswith("U") or clean_target.startswith("W"):
                    r_open = await client.post(
                        "https://slack.com/api/conversations.open",
                        headers=headers,
                        json={"users": clean_target}
                    )
                    open_data = r_open.json()
                    if open_data.get("ok"):
                        channel_id = open_data.get("channel", {}).get("id")
                    else:
                        return False, f"Slack API could not open DM with {clean_target}: {open_data.get('error', 'unknown error')}"

                # Otherwise, attempt to look up username or real name from users.list
                else:
                    r_users = await client.get("https://slack.com/api/users.list", headers=headers)
                    users_data = r_users.json()
                    if users_data.get("ok"):
                        matched_id = None
                        target_lower = clean_target.lower()
                        for m in users_data.get("members", []):
                            if m.get("name", "").lower() == target_lower or m.get("real_name", "").lower() == target_lower:
                                matched_id = m.get("id")
                                break
                        if matched_id:
                            r_open = await client.post(
                                "https://slack.com/api/conversations.open",
                                headers=headers,
                                json={"users": matched_id}
                            )
                            open_data = r_open.json()
                            if open_data.get("ok"):
                                channel_id = open_data.get("channel", {}).get("id")
                            else:
                                return False, f"Slack API could not open DM with user {matched_id}: {open_data.get('error')}"
                        else:
                            # Try directly opening with the target string
                            r_open = await client.post(
                                "https://slack.com/api/conversations.open",
                                headers=headers,
                                json={"users": clean_target}
                            )
                            open_data = r_open.json()
                            if open_data.get("ok"):
                                channel_id = open_data.get("channel", {}).get("id")
                            else:
                                return False, f"Could not find Slack user '{clean_target}'. Please enter a valid Slack Member ID (e.g. U0CK7UEJC1X)."

                if not channel_id:
                    return False, f"Could not resolve Slack channel or user ID for '{clean_target}'."

                # Send message via chat.postMessage
                r_post = await client.post(
                    "https://slack.com/api/chat.postMessage",
                    headers=headers,
                    json={
                        "channel": channel_id,
                        "text": headline,
                        "blocks": blocks
                    }
                )
                post_data = r_post.json()
                if post_data.get("ok"):
                    return True, f"Digest sent to Slack user {clean_target}."
                else:
                    return False, f"Slack chat.postMessage failed: {post_data.get('error', 'unknown error')}"

        except Exception as e:
            return False, f"Slack delivery error: {str(e)}"

slack_service = SlackService()
