import base64
import hashlib
import json
import logging
import os
import shutil
import tempfile

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from sqlalchemy import desc
from sqlalchemy.orm import Session

from .crawler import router as crawler_router
# Import database models
from .logic.database import get_db, VideoAnalysis, OperationStatus, init_db
# Import Pydantic models
from .logic.models import MealPlan, MealPlanUpdate

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", None)

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("meal_planner_api")

app = FastAPI(title="Vercel FastAPI")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(crawler_router, prefix="/crawler", tags=["crawler"])


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


@app.post("/api/py/update-meal-plan")
async def update_meal_plan(
        meal_plan: MealPlanUpdate,
        db: Session = Depends(get_db),
):
    """
    Update an existing meal plan in the most recent video analysis
    """
    logger.info(f"Received update request for meal plan")

    try:
        # Log the incoming meal plan data
        logger.info(f"Meal plan update request received with data: {meal_plan.dict(exclude_none=True)}")

        # Get the most recent analysis
        meal_plan_obj = MealPlan.model_validate_json(meal_plan.meal_plan)
        logger.info("Successfully validated meal plan data")

        latest_analysis = db.query(VideoAnalysis).order_by(desc(VideoAnalysis.created_at)).first()

        if not latest_analysis:
            logger.warning("No existing meal plan found to update")
            raise HTTPException(status_code=404, detail="No meal plan found to update")

        logger.info(f"Found existing analysis to update: id={latest_analysis.id}, filename={latest_analysis.filename}")

        # Log meal plan structure before update
        logger.info(f"Original meal plan structure: {latest_analysis.analysis_text[:100]}...")

        # Update the analysis_text with the new meal plan
        new_meal_plan_json = meal_plan_obj.model_dump_json()
        latest_analysis.analysis_text = new_meal_plan_json
        logger.info(f"Updated meal plan structure: {new_meal_plan_json[:100]}...")

        db.commit()
        logger.info("Successfully committed meal plan update to database")

        return {"message": "Meal plan updated successfully"}
    except Exception as e:
        error_message = f"Error updating meal plan: {str(e)}"
        logger.error(error_message)

        # Log full traceback
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")

        raise HTTPException(
            status_code=500,
            detail={
                "message": "Failed to update meal plan",
                "error": str(e),
                "type": str(type(e).__name__)
            }
        )


@app.post("/api/py/analyze-video", response_model=MealPlan)
async def analyze_video(
        video: UploadFile = File(...),
        db: Session = Depends(get_db),
):
    temp_video_path = None
    try:
        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail="Gemini API key not configured")

        if not video.content_type or not video.content_type.startswith("video/"):
            raise HTTPException(status_code=400, detail="File must be a video")

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(
                delete=False, suffix=os.path.splitext(video.filename)[1]
        ) as temp_video:
            shutil.copyfileobj(video.file, temp_video)
            temp_video_path = temp_video.name

        # Calculate SHA-256 hash of the file
        sha256_hash = hashlib.sha256()
        with open(temp_video_path, "rb") as f:
            # Read and update hash in chunks to handle large files
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        file_hash = sha256_hash.hexdigest()

        # Initialize Gemini client
        client = genai.Client(api_key=GEMINI_API_KEY)

        # Read the video file and encode it
        with open(temp_video_path, "rb") as f:
            video_bytes = f.read()
            video_base64 = base64.b64encode(video_bytes).decode("utf-8")

        # Define the output structure - now in the prompt
        prompt = """
        Analyze this video showing food items and create a simple meal plan.
        
        Based on the food items visible in the video, generate:
        1. ONE meal per day for each day of the week (Monday to Sunday)
        2. For each meal, provide a simple recipe with ingredients list and basic instructions
        3. A shopping list with any additional ingredients needed that weren't shown in the video
        
        Keep everything simple and straightforward.
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

        # Get the meal plan data
        meal_plan_data = response.parsed.model_dump()

        # Check if analysis with this hash already exists
        existing_analysis = db.query(VideoAnalysis).filter(VideoAnalysis.id == file_hash).first()

        # If analysis exists, delete it
        if existing_analysis:
            db.delete(existing_analysis)
            db.commit()

        # Create new analysis using file hash as ID
        analysis = VideoAnalysis(
            id=file_hash,
            filename=video.filename,
            content_type=video.content_type,
            prompt=prompt,
            analysis_text=json.dumps(meal_plan_data),
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        if os.path.exists(temp_video_path):
            os.unlink(temp_video_path)

        # Convert back to MealPlan object
        return MealPlan.model_validate(meal_plan_data)

    except Exception as e:
        error_message = f"Error in analyze_video: {str(e)}"
        print(f"ERROR: {error_message}")
        import traceback
        print(traceback.format_exc())

        if os.path.exists(temp_video_path):
            os.unlink(temp_video_path)

        # Return detailed error response
        raise HTTPException(
            status_code=500,
            detail={
                "message": "Failed to analyze video",
                "error": str(e),
                "type": str(type(e).__name__)
            }
        )


@app.get("/api/py/is-done")
def is_done(db: Session = Depends(get_db)):
    # Query the operation status table to check if video analysis is done
    status = db.query(OperationStatus).filter(OperationStatus.operation_type == "video_analysis").first()

    if not status:
        # If no status exists, return false
        return {"is_done": "false"}

    return {"is_done": status.is_done}


@app.get("/api/py/analysis", response_model=MealPlan)
def get_latest_analysis(db: Session = Depends(get_db)):
    """Get the most recent video analysis"""
    analysis = db.query(VideoAnalysis).order_by(desc(VideoAnalysis.created_at)).first()

    if not analysis:
        raise HTTPException(status_code=404, detail="No analysis found")

    # Parse the JSON string from the database
    try:
        # Return as MealPlan object
        return MealPlan.model_validate(json.loads(analysis.analysis_text))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error parsing meal plan data: {str(e)}"
        )


@app.post("/api/py/set-status/{status}")
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("index:app", host="0.0.0.0", port=8000)
