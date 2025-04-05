from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Handle PostgreSQL connection strings that start with postgres:// instead of postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create async engine
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

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


async def get_db():
    """Dependency for getting async DB session"""
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    """Initialize the database with tables"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
