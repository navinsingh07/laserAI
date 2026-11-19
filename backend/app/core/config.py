import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

class Settings:
    PROJECT_NAME: str = "Laser AI API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api"

    # Gemini API
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    # Source Data Configuration
    GOOGLE_SHEET_URL: str = os.getenv("GOOGLE_SHEET_URL", "")
    SAMPLE_CSV_PATH: str = str(BASE_DIR / "data" / "sample_feedback.csv")

    # Email Dispatch (Gmail SMTP or Resend)
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASS: str = os.getenv("SMTP_PASS", "")
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    RESEND_FROM_EMAIL: str = os.getenv("RESEND_FROM_EMAIL", "Laser AI <onboarding@resend.dev>")

    # Slack Configuration
    DEFAULT_SLACK_WEBHOOK: str = os.getenv("DEFAULT_SLACK_WEBHOOK", "")
    SLACK_BOT_TOKEN: str = os.getenv("SLACK_BOT_TOKEN", "")

settings = Settings()
