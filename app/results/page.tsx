"use client"

import { ShoppingList } from "@/components/shopping-list"
import { SupermarketOptions } from "@/components/supermarket-options"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FeaturedRecipe } from "@/components/featured-recipe"
import { RecipeList } from "@/components/recipe-list"
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

interface AnalysisResult {
  shopping_list: {
    items: ShoppingItem[]
  }
  recipes: Recipe[]
}

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          recipes: result.recipes.map((recipe: Recipe, index: number) => ({
            ...recipe,
            image:
              recipe.image ||
              (index === 0
                ? "/images/pexels-photo-1640771.jpeg"
                : `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(recipe.name)}`),
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
            <h1 className="text-xl font-bold text-gray-800">MealGenius</h1>
          </div>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=96&width=96&text=Video+Thumbnail"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your Video Analysis Results</h2>
              <p className="text-gray-600">
                Based on your uploaded cooking video, we've generated the following recipe ideas and shopping list.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Recipe */}
        {data.recipes.length > 0 && <FeaturedRecipe recipe={data.recipes[0]} />}

        {/* Shopping List (left) and Supermarket Options (right) */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ShoppingList items={data.shopping_list.items} />
          <SupermarketOptions />
        </div>

        {/* Recipe List */}
        {data.recipes.length > 1 && <RecipeList recipes={data.recipes} />}
      </main>

      <footer className="bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">© 2025 MealGenius. All rights reserved.</p>
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

