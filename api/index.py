from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
import os
import tempfile
import base64
from google import genai
from google.genai import types
from dotenv import load_dotenv
from typing import Optional
import shutil
import json
from sqlalchemy.orm import Session
from sqlalchemy import select, desc

# Import database models
from .logic.database import get_db, VideoAnalysis, OperationStatus, init_db

# Import Pydantic models
from .logic.models import MealPlan

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", None)

load_dotenv()


app = FastAPI(title="Vercel FastAPI")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables on startup
@app.on_event("startup")
def startup_db_client():
    init_db()

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI on Vercel!"}


@app.get("/api/py/hello")
async def hello():
    return {"message": "Hello World"}


@app.post("/analyze-video", response_model=MealPlan)
async def analyze_video(
    video: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")

    if not video.content_type or not video.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")

    # Set status to "false" at the beginning of processing
    status = db.query(OperationStatus).filter(OperationStatus.operation_type == "video_analysis").first()
    
    if status:
        status.is_done = "false"
    else:
        status = OperationStatus(operation_type="video_analysis", is_done="false")
        db.add(status)
    
    db.commit()

    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(
        delete=False, suffix=os.path.splitext(video.filename)[1]
    ) as temp_video:
        shutil.copyfileobj(video.file, temp_video)
        temp_video_path = temp_video.name
        

   
    # Initialize Gemini client
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    # Read the video file and encode it
    with open(temp_video_path, "rb") as f:
        video_bytes = f.read()
        video_base64 = base64.b64encode(video_bytes).decode("utf-8")
    
    # Define the output structure - now in the prompt
    prompt = """
    Analyze this video showing food items and create a meal plan.
    
    Based on the food items visible in the video, generate:
    1. Recipes with detailed ingredients and instructions for the meal plans. Meal plans should be for the whole week. Monday to Sunday.
    2. A complete shopping list with all required ingredients for the meal plans if you don't have the ingredients in your kitchen. Which are not in the video.
    
    """
    
    # Create content with video data
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
                types.Part(
                    inline_data=types.Blob(
                        mime_type=video.content_type,
                        data=video_bytes
                    )
                ),
            ],
        ),
    ]
    
    # Generate content with temperature=0 and JSON response type
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=contents,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0,
            response_schema=MealPlan
        )
    )

        
    # Check if analysis already exists
    existing_analysis = db.query(VideoAnalysis).order_by(desc(VideoAnalysis.created_at)).first()
    
    # If analysis exists, delete it
    if existing_analysis:
        db.delete(existing_analysis)
        db.commit()
    
    # Create new analysis
    analysis = VideoAnalysis(
        filename=video.filename,
        content_type=video.content_type,
        prompt=prompt,
        analysis_text=response.parsed.model_dump_json(),
    )
    
    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    if os.path.exists(temp_video_path):
        os.unlink(temp_video_path)
    
    # Update status to "true" when processing is complete
    status.is_done = "true"
    db.commit()
    
    return response.parsed



@app.get("/is-done")
def is_done(db: Session = Depends(get_db)):
    # Query the operation status table to check if video analysis is done
    status = db.query(OperationStatus).filter(OperationStatus.operation_type == "video_analysis").first()

    if not status:
        # If no status exists, return false
        return {"is_done": "false"}

    return {"is_done": status.is_done}


@app.get("/analysis", response_model=MealPlan)
def get_latest_analysis(db: Session = Depends(get_db)):
    """Get the most recent video analysis"""
    analysis = db.query(VideoAnalysis).order_by(desc(VideoAnalysis.created_at)).first()

    if not analysis:
        raise HTTPException(status_code=404, detail="No analysis found")

    # Return the analysis_text directly which contains the meal plan
    return analysis.analysis_text


@app.post("/set-status/{status}")
def set_status(status: str, db: Session = Depends(get_db)):
    """Manually set the operation status (for testing)"""
    if status not in ["true", "false"]:
        raise HTTPException(status_code=400, detail="Status must be 'true' or 'false'")
    
    operation_status = db.query(OperationStatus).filter(OperationStatus.operation_type == "video_analysis").first()
    
    if operation_status:
        operation_status.is_done = status
    else:
        operation_status = OperationStatus(operation_type="video_analysis", is_done=status)
        db.add(operation_status)
    
    db.commit()
    return Response(status_code=200)
