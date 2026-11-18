from fastapi import APIRouter
from ...models.user import UserProfile, OnboardingRequest, UserRole

router = APIRouter(prefix="/auth", tags=["Demo Authentication & Onboarding"])

# Active demo session
active_user = UserProfile(
    id="usr_demo_google",
    name="Alex Morgan",
    email="alex.founder@laserai.demo",
    role=UserRole.FOUNDER,
    authenticated=False
)

@router.get("/me", response_model=UserProfile)
async def get_current_user():
    """Returns active demo user session."""
    return active_user

@router.post("/mock-login", response_model=UserProfile)
async def mock_google_login():
    """1-click bypass demo login simulating 'Continue with Google'."""
    global active_user
    active_user.authenticated = True
    return active_user

@router.post("/onboarding", response_model=UserProfile)
async def complete_onboarding(req: OnboardingRequest):
    """Captures onboarding preferences (name, email, role, frequency, webhook)."""
    global active_user
    active_user.name = req.name
    active_user.email = req.email
    active_user.role = req.role
    active_user.digest_frequency = req.digest_frequency
    active_user.slack_webhook_url = req.slack_webhook_url or ""
    active_user.authenticated = True
    return active_user

@router.put("/role", response_model=UserProfile)
async def switch_role(role: UserRole):
    """Top-bar role switcher for easy demo testing."""
    global active_user
    active_user.role = role
    return active_user
