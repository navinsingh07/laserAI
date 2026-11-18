import io
import re
from typing import List, Optional
import httpx
import pandas as pd
from ..core.config import settings
from ..models.digest import FeedbackItem
from ..models.user import UserRole

class SheetsService:
    def __init__(self):
        self.sample_csv_path = settings.SAMPLE_CSV_PATH

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
        """Loads customer feedback using pandas from Google Sheets URL or local CSV."""
        target_url = self._convert_google_sheet_url(sheet_url or settings.GOOGLE_SHEET_URL)
        
        if target_url:
            try:
                with httpx.Client(timeout=10.0) as client:
                    resp = client.get(target_url, follow_redirects=True)
                    if resp.status_code == 200 and ("text/csv" in resp.headers.get("content-type", "") or "timestamp" in resp.text):
                        return pd.read_csv(io.StringIO(resp.text))
            except Exception as e:
                print(f"[SheetsService] Warning: Could not fetch live Google Sheet ({e}). Using local sample.")

        return pd.read_csv(self.sample_csv_path)

    def fetch_feedback_items(self, sheet_url: Optional[str] = None, role: Optional[UserRole] = None) -> List[FeedbackItem]:
        """Returns typed feedback rows scored and strictly filtered for the specified role."""
        df = self.fetch_dataframe(sheet_url)
        return self.score_and_convert(df, role)

    def score_and_convert(self, df: pd.DataFrame, role: Optional[UserRole] = None) -> List[FeedbackItem]:
        """Loads and strictly filters FeedbackItems from the 150-row master dataset based on role visibility rules."""
        items: List[FeedbackItem] = []

        for _, row in df.iterrows():
            feedback_text = str(row.get("feedback_text", ""))
            review_id = str(row.get("review_id", row.get("id", f"REV-{len(items)+1:03d}")))
            date_val = str(row.get("date", row.get("timestamp", "")))
            user_name = str(row.get("user_name", "Anonymous User"))
            company_tier = str(row.get("company_tier", row.get("customer_tier", "Enterprise")))
            product_area = str(row.get("product_area", row.get("category", "General")))
            dept_tag = str(row.get("department_tag", "General"))
            sentiment = str(row.get("sentiment", "Neutral"))
            rating = int(row.get("rating", 3))
            channel = str(row.get("channel", "Google Sheet"))
            urgency = str(row.get("urgency", "Medium"))
            customer_id = str(row.get("customer_id", f"cust_{user_name.lower().replace(' ', '_')}"))

            # Calculate relevance
            relevance = 0.5
            if role in [UserRole.FOUNDER, UserRole.FOUNDERS]:
                # Founders see company-wide trends
                relevance = 0.95 if sentiment == "Negative" or company_tier == "Enterprise" else 0.8
            elif role == UserRole.PMS:
                # PMs see all reviews with product/UX focus
                relevance = 0.95 if dept_tag == "Product/UX" or product_area in ["UI/UX", "Onboarding", "Team Collaboration"] else 0.75
            elif role == UserRole.ENGINEERS:
                relevance = 0.98 if dept_tag == "Engineering" else 0.2
            elif role == UserRole.SALES:
                relevance = 0.98 if dept_tag == "Sales" else 0.2

            item = FeedbackItem(
                review_id=review_id,
                date=date_val,
                user_name=user_name,
                company_tier=company_tier,
                product_area=product_area,
                department_tag=dept_tag,
                sentiment=sentiment,
                feedback_text=feedback_text,
                id=review_id,
                timestamp=date_val,
                customer_id=customer_id,
                customer_tier=company_tier,
                rating=rating,
                category=product_area,
                channel=channel,
                urgency=urgency,
                role_relevance=round(relevance, 2)
            )

            # Role-Based Review Visibility & Filtering Logic:
            # 1. Founder: Can see ALL reviews across the entire product.
            # 2. PMs: Can see ALL reviews across the product.
            # 3. Engineers: Can see ONLY engineering-related reviews (hide sales, pricing, non-technical).
            # 4. Sales: Can see ONLY sales-related reviews (hide technical bug reports).
            if role:
                if role == UserRole.ENGINEERS:
                    if dept_tag != "Engineering" and product_area not in ["Performance/Bugs", "Integrations"]:
                        continue
                elif role == UserRole.SALES:
                    if dept_tag != "Sales" and product_area not in ["Security/SSO", "Pricing/Plans"]:
                        continue

            items.append(item)

        if role:
            items.sort(key=lambda x: (x.role_relevance, x.urgency == "Critical"), reverse=True)

        return items

    def get_role_filtered_items(self, items: List[FeedbackItem], role: UserRole) -> List[FeedbackItem]:
        if role in (UserRole.FOUNDER, UserRole.PMS):
            return items
        elif role == UserRole.ENGINEERS:
            return [it for it in items if (it.department_tag == "Engineering" or it.product_area in ["Performance/Bugs", "Integrations"])]
        elif role == UserRole.SALES:
            return [it for it in items if (it.department_tag == "Sales" or it.product_area in ["Security/SSO", "Pricing/Plans"])]
        return items

sheets_service = SheetsService()
