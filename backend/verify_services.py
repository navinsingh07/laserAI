import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

from app.services.sheets_service import sheets_service
from app.services.llm_service import llm_service
from app.models.user import UserRole

def main():
    print("Testing Pandas SheetsService...", flush=True)
    df = sheets_service.fetch_dataframe()
    print(f"[OK] Pandas loaded {len(df)} rows. Columns: {list(df.columns)}", flush=True)

    for role in [UserRole.FOUNDER, UserRole.REVIEW_PM, UserRole.SHARING_PM]:
        items = sheets_service.fetch_feedback_items(role=role)
        digest = llm_service.generate_role_digest(items, role)
        print(f"\n--- Role: {role.value} ---", flush=True)
        print(f"Executive Summary: {digest.executive_summary[:80]}...", flush=True)
        print(f"Metrics: {len(digest.metrics)}, Bugs: {len(digest.urgent_bugs)}, Features: {len(digest.top_feature_requests)}", flush=True)
        print(f"Sentiment: {digest.sentiment.overall} ({digest.sentiment.positive_pct}% Pos, {digest.sentiment.negative_pct}% Neg)", flush=True)
        print(f"Email HTML length: {len(digest.rendered_email_html or '')} chars", flush=True)
        print(f"Slack blocks: {len(digest.slack_blocks or [])} blocks", flush=True)

    print("\nALL BACKEND SERVICES TESTED & VERIFIED SUCCESSFULLY!", flush=True)

if __name__ == "__main__":
    main()
