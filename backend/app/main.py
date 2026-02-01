"""
FastAPI Application Entry Point
AI-Powered Public Complaint & RTI Generator
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.config import settings

# Create FastAPI app
app = FastAPI(
    title="RTI & Complaint Generator API",
    description="Backend API for AI-Powered Public Complaint & RTI Generator",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}


# TODO: Import and include routers
# from app.api import infer, draft, authority, download
# app.include_router(infer.router, prefix="/api", tags=["inference"])
# app.include_router(draft.router, prefix="/api", tags=["draft"])
# app.include_router(authority.router, prefix="/api", tags=["authority"])
# app.include_router(download.router, prefix="/api", tags=["download"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.BACKEND_PORT)
