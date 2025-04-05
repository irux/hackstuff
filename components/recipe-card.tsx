"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

interface RecipeCardProps {
  recipe: Recipe
  featured?: boolean
}

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(featured)

  return (
    <Card className={`overflow-hidden ${featured ? "mb-6" : ""}`}>
      <div className="relative">
        <div className="w-full h-48 relative overflow-hidden">
          {recipe.image ? (
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <CardHeader className="text-white pb-2 pt-16 w-full">
            <div className="flex justify-between items-center">
              <CardTitle className={featured ? "text-xl" : "text-lg"}>{recipe.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
        </div>
      </div>
      <CardContent className="pt-3">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock className="h-3 w-3 mr-1" />
          {recipe.instructions.length * 5} mins
        </div>

        {expanded && (
          <>
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">Ingredients:</h4>
              <ul className="space-y-1 text-sm">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="capitalize">{ingredient.name}</span>
                    <span className="text-gray-500">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Instructions:</h4>
              <ol className="space-y-1 text-sm list-decimal list-inside">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        {!expanded && <p className="text-sm text-gray-500">Click to see ingredients and instructions</p>}
      </CardContent>
    </Card>
  )
}

