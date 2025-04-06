from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class VideoAnalysisBase(BaseModel):
    """Base model for video analysis data"""

    filename: str
    content_type: str
    prompt: Optional[str] = None


class VideoAnalysisCreate(VideoAnalysisBase):
    """Model for creating a video analysis"""

    analysis_text: str


class VideoAnalysisResponse(VideoAnalysisBase):
    """Model for returning a video analysis"""

    id: int
    analysis_text: str
    created_at: datetime

    class Config:
        from_attributes = (
            True  # Enables ORM mode (renamed from orm_mode in Pydantic v2)
        )


class VideoAnalysisList(BaseModel):
    """Model for returning a list of video analyses"""

    items: list[VideoAnalysisResponse]
    count: int


# Meal planning models
class Ingredient(BaseModel):
    name: str
    quantity: float
    unit: str


class Recipe(BaseModel):
    name: str
    ingredients: List[Ingredient]
    instructions: List[str]


class ShoppingList(BaseModel):
    items: List[Ingredient]


class DayMeal(BaseModel):
    day: str  # Monday, Tuesday, etc.
    meal: Optional[str]
    recipe_refs: List[str]


class MealPlan(BaseModel):
    shopping_list: ShoppingList
    recipes: List[Recipe]
    days: List[DayMeal]
