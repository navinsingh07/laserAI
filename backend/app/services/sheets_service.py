import io
import re
from typing import List, Optional, Dict, Any
import httpx
import pandas as pd
from ..core.config import settings
from ..models.digest import FeedbackItem
from ..models.user import UserRole

class SheetsService:
    def __init__(self):
        self.sample_csv_path = settings.SAMPLE_CSV_PATH
        self.active_custom_df: Optional[pd.DataFrame] = None
        self.active_custom_filename: Optional[str] = None

    @staticmethod
    def _convert_google_sheet_url(url: str) -> str:
        """Converts standard Google Sheets URL to a direct CSV export URL."""
        if not url:
            return ""
        match = re.search(r"/spreadsheets/d/([a-zA-Z0-9-_]+)", url)
        if match:
            sheet_id = match.group(1)
            return f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
        return url

    def fetch_dataframe(self, sheet_url: Optional[str] = None) -> pd.DataFrame:
        """Loads customer feedback using pandas from active uploaded file, Google Sheets URL or local CSV."""
        # 1. Custom uploaded file takes highest priority if present
        if self.active_custom_df is not None and not self.active_custom_df.empty:
            return self.active_custom_df

        # 2. Live Google Sheet URL
        target_url = self._convert_google_sheet_url(sheet_url or settings.GOOGLE_SHEET_URL)
        if target_url:
            try:
                with httpx.Client(timeout=10.0) as client:
                    resp = client.get(target_url, follow_redirects=True)
                    if resp.status_code == 200 and ("text/csv" in resp.headers.get("content-type", "") or "timestamp" in resp.text):
                        return pd.read_csv(io.StringIO(resp.text))
            except Exception as e:
                print(f"[SheetsService] Warning: Could not fetch live Google Sheet ({e}). Using local sample.")

        # 3. Default local fallback CSV
        return pd.read_csv(self.sample_csv_path)

    def load_from_upload(self, file_bytes: bytes, filename: str) -> Dict[str, Any]:
        """Parses an uploaded CSV or Excel file (.xlsx, .xls), normalizes columns, and stores as active dataset."""
        lower_name = filename.lower()
        if lower_name.endswith((".xlsx", ".xls")):
            raw_df = pd.read_excel(io.BytesIO(file_bytes))
        else:
            try:
                raw_df = pd.read_csv(io.BytesIO(file_bytes), encoding="utf-8")
            except Exception:
                raw_df = pd.read_csv(io.BytesIO(file_bytes), encoding="latin-1")

        normalized_df = self._normalize_dataframe(raw_df)
        self.active_custom_df = normalized_df
        self.active_custom_filename = filename

        return {
            "total_rows": len(normalized_df),
            "filename": filename,
            "columns": list(normalized_df.columns)
        }

    def reset_custom_dataset(self) -> Dict[str, Any]:
        """Resets back to the default 150-row Google Sheet dataset."""
        self.active_custom_df = None
        self.active_custom_filename = None
        return {
            "status": "reset",
            "filename": "Connected Google Sheet",
            "total_rows": 150
        }

    def get_dataset_info(self) -> Dict[str, Any]:
        """Returns metadata about the active dataset."""
        if self.active_custom_df is not None:
            return {
                "is_custom": True,
                "filename": self.active_custom_filename or "Uploaded Dataset",
                "total_rows": len(self.active_custom_df)
            }
        return {
            "is_custom": False,
            "filename": "Connected Google Sheet",
            "total_rows": 150
        }

    def _normalize_dataframe(self, raw_df: pd.DataFrame) -> pd.DataFrame:
        """Intelligently identifies and maps feedback columns from arbitrary CSV/Excel sheets."""
        if raw_df.empty:
            return pd.DataFrame(columns=["review_id", "date", "user_name", "company_tier", "feedback_text"])

        cols_lower = {str(c).lower().strip(): c for c in raw_df.columns}

        # 1. Feedback text candidates
        feedback_keys = [
            "feedback_text", "feedback", "review", "review_text", "customer_feedback",
            "customer_comment", "comment", "comments", "user_feedback", "text", "body",
            "content", "message", "description", "issue", "notes", "complaint", "details"
        ]
        feedback_col = next((cols_lower[k] for k in feedback_keys if k in cols_lower), None)
        
        # If no explicit header matched, pick the column with highest average string length
        if not feedback_col:
            str_cols = [c for c in raw_df.columns if raw_df[c].dtype == object]
            if str_cols:
                feedback_col = max(str_cols, key=lambda c: raw_df[c].astype(str).str.len().mean())
            else:
                feedback_col = raw_df.columns[0]

        # 2. User name candidates
        user_keys = [
            "user_name", "username", "name", "customer_name", "customer", "author",
            "client", "user", "submitter", "full_name", "contact", "reporter"
        ]
        user_col = next((cols_lower[k] for k in user_keys if k in cols_lower), None)

        # 3. Company tier / plan candidates
        tier_keys = [
            "company_tier", "tier", "plan", "subscription", "account_tier", "segment",
            "type", "tier_level", "company", "account", "org"
        ]
        tier_col = next((cols_lower[k] for k in tier_keys if k in cols_lower), None)

        # 4. Date candidates
        date_keys = [
            "date", "timestamp", "created_at", "submitted_at", "time", "datetime",
            "created_date", "entry_date"
        ]
        date_col = next((cols_lower[k] for k in date_keys if k in cols_lower), None)

        # 5. Review ID candidates
        id_keys = [
            "review_id", "id", "ticket_id", "issue_id", "case_id", "row_id", "no", "key"
        ]
        id_col = next((cols_lower[k] for k in id_keys if k in cols_lower), None)

        normalized_rows = []
        for idx, row in raw_df.iterrows():
            text_val = str(row[feedback_col]).strip() if feedback_col and pd.notna(row.get(feedback_col)) else ""
            if not text_val or text_val.lower() == "nan":
                continue

            rev_id = str(row[id_col]).strip() if id_col and pd.notna(row.get(id_col)) else f"REV-{idx+1:03d}"
            u_name = str(row[user_col]).strip() if user_col and pd.notna(row.get(user_col)) else f"Customer {idx+1}"
            c_tier = str(row[tier_col]).strip() if tier_col and pd.notna(row.get(tier_col)) else "Enterprise"
            d_val = str(row[date_col]).strip() if date_col and pd.notna(row.get(date_col)) else "2026-11-18"

            normalized_rows.append({
                "review_id": rev_id,
                "date": d_val,
                "user_name": u_name,
                "company_tier": c_tier,
                "feedback_text": text_val
            })

        return pd.DataFrame(normalized_rows)

    def fetch_feedback_items(self, sheet_url: Optional[str] = None, role: Optional[UserRole] = None) -> List[FeedbackItem]:
        """Loads all raw un-tagged customer feedback rows from the active custom sheet, Google Sheet, or local CSV."""
        df = self.fetch_dataframe(sheet_url)
        return self.score_and_convert(df, role)

    def score_and_convert(self, df: pd.DataFrame, role: Optional[UserRole] = None) -> List[FeedbackItem]:
        """Converts DataFrame rows into typed FeedbackItem models."""
        items: List[FeedbackItem] = []

        for idx, row in df.iterrows():
            feedback_text = str(row.get("feedback_text", "")).strip()
            review_id = str(row.get("review_id", f"REV-{idx+1:03d}")).strip()
            date_val = str(row.get("date", "")).strip()
            user_name = str(row.get("user_name", "Anonymous User")).strip()
            company_tier = str(row.get("company_tier", "Enterprise")).strip()

            item = FeedbackItem(
                review_id=review_id,
                date=date_val,
                user_name=user_name,
                company_tier=company_tier,
                feedback_text=feedback_text,
                id=review_id,
                timestamp=date_val,
                customer_id=f"cust_{user_name.lower().replace(' ', '_')}",
                customer_tier=company_tier,
                role_relevance=1.0
            )
            items.append(item)

        return items

    def get_role_filtered_items(self, items: List[FeedbackItem], role: UserRole) -> List[FeedbackItem]:
        """Returns all items; dynamic role filtering is delegated directly to the Gemini LLM engine."""
        return items

sheets_service = SheetsService()
