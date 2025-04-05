import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RecipeCard } from "./recipe-card"

// Define types based on the schema
interface Ingredient {
  name: string
  quantity: number
  unit: string
}

interface Recipe {
  name: string
  ingredients: Ingredient[]
  instructions: string[]
  image?: string
}

interface FeaturedRecipeProps {
  recipe: Recipe
}

export function FeaturedRecipe({ recipe }: FeaturedRecipeProps) {
  // Ensure the recipe has the featured image
  const recipeWithImage = {
    ...recipe,
    image: recipe.image || "/images/pexels-photo-1640771.jpeg",
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Today's Featured Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <RecipeCard recipe={recipeWithImage} featured={true} />
      </CardContent>
    </Card>
  )
}

