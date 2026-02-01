"""
Application Configuration
Loads settings from environment variables
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment"""
    
    # Server
    BACKEND_PORT: int = 8000
    DEBUG: bool = True
    
    # NLP
    SPACY_MODEL: str = "en_core_web_sm"
    CONFIDENCE_THRESHOLD: float = 0.7
    
    # Frontend
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
