import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, ChefHat } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MealSuggestions() {
  const meals = [
    {
      title: "Vegetable Stir Fry with Rice",
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      tags: ["Vegetarian", "Quick", "Healthy"],
      image: "/placeholder.svg?height=150&width=300&text=Stir+Fry",
    },
    {
      title: "Grilled Chicken Salad",
      time: "20 mins",
      servings: 2,
      difficulty: "Easy",
      tags: ["High Protein", "Low Carb"],
      image: "/placeholder.svg?height=150&width=300&text=Chicken+Salad",
    },
    {
      title: "Pasta Primavera",
      time: "30 mins",
      servings: 4,
      difficulty: "Medium",
      tags: ["Vegetarian", "Family"],
      image: "/placeholder.svg?height=150&width=300&text=Pasta",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Meal Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {meals.map((meal, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <img src={meal.image || "/placeholder.svg"} alt={meal.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{meal.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {meal.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {meal.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {meal.servings} servings
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    {meal.difficulty}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

