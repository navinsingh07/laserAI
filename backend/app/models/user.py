from enum import Enum
from typing import Optional
from pydantic import BaseModel

class UserRole(str, Enum):
    FOUNDER = "Founder"
    PMS = "PMs"
    ENGINEERS = "Engineers"
    SALES = "Sales"
    # Backwards compatibility
    FOUNDERS = "Founders"

class DigestFrequency(str, Enum):
    DAILY = "Daily"
    WEEKLY = "Weekly"
    INSTANT = "Instant Demo"

class UserProfile(BaseModel):
    id: str = "usr_demo_google"
    name: str = "Alex Morgan"
    email: str = "alex.founder@laserai.demo"
    role: UserRole = UserRole.FOUNDER
    digest_frequency: DigestFrequency = DigestFrequency.DAILY
    slack_webhook_url: Optional[str] = ""
    avatar_url: str = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    authenticated: bool = False

class OnboardingRequest(BaseModel):
    name: str
    email: str
    role: UserRole
    digest_frequency: DigestFrequency = DigestFrequency.DAILY
    slack_webhook_url: Optional[str] = None
