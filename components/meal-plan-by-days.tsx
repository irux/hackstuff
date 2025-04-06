import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import Image from "next/image"

interface DayMeal {
  day: string
  meal: string
  recipe_refs: string[]
}

interface MealPlanByDaysProps {
  days: DayMeal[]
  recipes: any[]
}

export function MealPlanByDays({ days, recipes }: MealPlanByDaysProps) {
  // Function to get image for a recipe
  const getRecipeImage = (recipeName: string) => {
    const recipe = recipes.find((r) => r.name === recipeName)
    return recipe?.image || "/placeholder.svg?height=100&width=200&text=" + encodeURIComponent(recipeName)
  }

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center space-x-2">
        <CalendarDays className="h-5 w-5 text-green-600" />
        <CardTitle className="text-xl">Weekly Meal Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="bg-green-50 p-2 font-medium text-green-800">{day.day}</div>
              <div className="p-3">
                <div className="w-full h-24 relative mb-2 rounded overflow-hidden">
                  <Image
                    src={getRecipeImage(day.recipe_refs[0]) || "/placeholder.svg"}
                    alt={day.meal}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{day.meal}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

