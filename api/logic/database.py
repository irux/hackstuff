from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("POSTGRES_URL_NO_SSL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create synchronous engine instead of async
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class VideoAnalysis(Base):
    __tablename__ = "video_analyses"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    prompt = Column(Text, nullable=True)
    analysis_text = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<VideoAnalysis {self.id}: {self.filename}>"


class OperationStatus(Base):
    __tablename__ = "operation_status"

    id = Column(Integer, primary_key=True, index=True)
    operation_type = Column(String(50), nullable=False)
    is_done = Column(String(5), default="false")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<OperationStatus {self.id}: {self.operation_type} - {self.is_done}>"


def get_db():
    """Dependency for getting DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize the database with tables"""
    Base.metadata.create_all(bind=engine)
