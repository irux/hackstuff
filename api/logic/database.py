import os
from datetime import datetime

from dotenv import load_dotenv
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.orm import sessionmaker as sync_sessionmaker

load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("POSTGRES_URL_NO_SSL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Fix the dialect prefix - SQLAlchemy requires postgresql:// not postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create synchronous engine instead of async, explicitly using psycopg2
engine = create_engine(
    DATABASE_URL,
    echo=True,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Synchronous fallback for Scrapy integration
SyncSessionLocal = sync_sessionmaker(bind=engine)


def get_session():
    return SyncSessionLocal()


Base = declarative_base()


class VideoAnalysis(Base):
    __tablename__ = "video_analyses"

    id = Column(String(64), primary_key=True, index=True)  # SHA-256 hash (64 characters)
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    prompt = Column(Text, nullable=True)
    analysis_text = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<VideoAnalysis {self.id}: {self.filename}>"


class OperationStatus(Base):
    __tablename__ = "operation_status"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    operation_type = Column(String(50), nullable=False)
    is_done = Column(String(5), default="false")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<OperationStatus {self.id}: {self.operation_type} - {self.is_done}>"


class FoodItemDB(Base):
    __tablename__ = "food_items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    source_url = Column(String)
    food_name = Column(String)
    food_item_description = Column(String)
    price = Column(String)
    quantity = Column(String)

    def __repr__(self):
        return f"<FoodItem {self.id}: {self.food_name}>"

    def as_dict(self):
        return {
            "id": self.id,
            "source_url": self.source_url,
            "food_name": self.food_name,
            "food_item_description": self.food_item_description,
            "price": self.price,
            "quantity": self.quantity
        }


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
