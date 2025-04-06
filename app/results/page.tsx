"use client"

import { ShoppingList } from "@/components/shopping-list"
import { SupermarketOptions } from "@/components/supermarket-options"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Video } from "lucide-react"
import Link from "next/link"
import { FeaturedRecipe } from "@/components/featured-recipe"
import { RecipeList } from "@/components/recipe-list"
import { MealPlanByDays } from "@/components/meal-plan-by-days"
import { useEffect, useState } from "react"

// Define types based on your schema
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

interface ShoppingItem {
  name: string
  quantity: number
  unit: string
}

interface DayMeal {
  day: string
  meal: string
  recipe_refs: string[]
}

interface AnalysisResult {
  shopping_list: {
    items: ShoppingItem[]
  }
  recipes: Recipe[]
  days: DayMeal[]
}

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Define the list of default images
  const defaultImages = [
    "https://goodcheapeats.com/wp-content/uploads/2015/03/asian-veg-rice-salad-for-meal-prep.jpg",
    "https://ecolunchboxes.com/cdn/shop/articles/Bowls_Photo_2_1200x.jpg?v=1586981990",
    "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FSeries%2F2019-11-Power-Hour-Gluten-Free%2F2019-10-14_Kitchn87418_Power-Hour-Gluten-Free",
    "https://cdn.pixabay.com/photo/2017/09/09/12/09/india-2731817_640.jpg",
    "https://static.toiimg.com/photo/msid-71673666,width-96,height-65.cms",
  ]

  // Function to get a random image from the default images
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * defaultImages.length)
    return defaultImages[randomIndex]
  }

  useEffect(() => {
    async function fetchAnalysisResults() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/py/analysis")

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()

        // Process the data to ensure all recipes have images
        const processedData = {
          ...result,
          recipes: result.recipes.map((recipe: Recipe) => ({
            ...recipe,
            // If recipe doesn't have an image, use a random one from our list
            image: recipe.image || getRandomImage(),
          })),
        }

        setData(processedData)
      } catch (err) {
        console.error("Failed to fetch analysis results:", err)
        setError("Failed to load meal plan. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysisResults()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading your meal plan...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error || "Failed to load meal plan data."}</p>
          <Button asChild>
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <path d="M15 11h.01" />
              <path d="M11 15h.01" />
              <path d="M16 16h.01" />
              <path d="M2 16l20 6-6-20A20 20 0 0 0 2 16" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">EcoDish</h1>
          </div>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Smaller Video Analysis Results block with icon */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Video className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Your Video Analysis Results</h2>
            <p className="text-sm text-gray-600">We've generated meal ideas based on your uploaded cooking video.</p>
          </div>
        </div>

        {/* Meal Plan By Days */}
        <MealPlanByDays days={data.days} recipes={data.recipes} />

        {/* Featured Recipe */}
        {data.recipes.length > 0 && <FeaturedRecipe recipe={data.recipes[0]} />}

        {/* Shopping List */}
        <div className="mb-8">
          <ShoppingList items={data.shopping_list.items} />
        </div>

        {/* Recipe List */}
        {data.recipes.length > 1 && (
          <div className="mb-8">
            <RecipeList recipes={data.recipes} />
          </div>
        )}

        {/* Supermarket Options (moved to bottom) */}
        <SupermarketOptions />
      </main>

      <footer className="bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">© 2025 EcoDish. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-green-600">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

