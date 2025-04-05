"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, ChefHat, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TodaysMeal() {
  const [expanded, setExpanded] = useState(false)

  const todaysMeals = [
    {
      title: "Avocado Toast with Eggs",
      time: "15 mins",
      servings: 2,
      difficulty: "Easy",
      tags: ["Breakfast", "High Protein"],
      image: "/pexels-photo-1640771.jpeg?height=150&width=300&text=Avocado+Toast",
      description:
        "Start your day with creamy avocado spread on whole grain toast, topped with perfectly poached eggs.",
    },
    {
      title: "Vegetable Stir Fry with Rice",
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      tags: ["Lunch", "Vegetarian"],
      image: "/pexels-photo-1640771.jpeg?height=150&width=300&text=Stir+Fry",
      description: "A colorful mix of fresh vegetables stir-fried with aromatic spices and served over steamed rice.",
    },
    {
      title: "Baked Salmon with Roasted Vegetables",
      time: "35 mins",
      servings: 2,
      difficulty: "Medium",
      tags: ["Dinner", "High Protein"],
      image: "/pexels-photo-1640771.jpeg?height=150&width=300&text=Salmon",
      description:
        "Tender salmon fillets baked to perfection alongside seasonal vegetables roasted with herbs and olive oil.",
    },
  ]

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Today's Meals</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="flex items-center gap-1">
          {expanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {todaysMeals.slice(0, expanded ? 3 : 1).map((meal, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={meal.image || "/pexels-photo-1640771.jpeg"}
                    alt={meal.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-4 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg mb-2">{meal.title}</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{meal.tags[0]}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{meal.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {meal.tags.slice(1).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

