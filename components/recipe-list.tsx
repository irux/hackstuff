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

interface RecipeListProps {
  recipes: Recipe[]
  excludeFirst?: boolean
}

export function RecipeList({ recipes, excludeFirst = true }: RecipeListProps) {
  // If excludeFirst is true, skip the first recipe (it's shown as featured)
  const displayRecipes = excludeFirst ? recipes.slice(1) : recipes

  // Add placeholder images for recipes that don't have images
  const recipesWithImages = displayRecipes.map((recipe, index) => ({
    ...recipe,
    image: recipe.image || `/placeholder.svg?height=192&width=384&text=Recipe+${index + 1}`,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">More Recipe Ideas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipesWithImages.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

