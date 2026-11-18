from fastapi import APIRouter
from .routes import auth, feedback, digest, notify

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(feedback.router)
api_router.include_router(digest.router)
api_router.include_router(notify.router)
