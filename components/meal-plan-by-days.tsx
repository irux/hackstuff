import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "lucide-react"

export function MealPlanByDays() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const mealPlan = {
    Monday: {
      breakfast: {
        title: "Avocado Toast with Eggs",
        time: "15 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Avocado+Toast",
      },
      lunch: {
        title: "Vegetable Stir Fry with Rice",
        time: "25 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Stir+Fry",
      },
      dinner: {
        title: "Baked Salmon with Roasted Vegetables",
        time: "35 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Salmon",
      },
    },
    Tuesday: {
      breakfast: {
        title: "Greek Yogurt with Berries and Granola",
        time: "5 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Yogurt",
      },
      lunch: {
        title: "Grilled Chicken Salad",
        time: "20 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Chicken+Salad",
      },
      dinner: {
        title: "Pasta Primavera",
        time: "30 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Pasta",
      },
    },
    Wednesday: {
      breakfast: {
        title: "Smoothie Bowl",
        time: "10 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Smoothie",
      },
      lunch: {
        title: "Quinoa Bowl with Roasted Vegetables",
        time: "25 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Quinoa",
      },
      dinner: {
        title: "Vegetable Curry with Rice",
        time: "40 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Curry",
      },
    },
    Thursday: {
      breakfast: {
        title: "Oatmeal with Fruit and Nuts",
        time: "10 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Oatmeal",
      },
      lunch: {
        title: "Mediterranean Wrap",
        time: "15 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Wrap",
      },
      dinner: {
        title: "Grilled Fish Tacos",
        time: "25 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Tacos",
      },
    },
    Friday: {
      breakfast: {
        title: "Breakfast Burrito",
        time: "20 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Burrito",
      },
      lunch: {
        title: "Lentil Soup with Crusty Bread",
        time: "30 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Soup",
      },
      dinner: {
        title: "Homemade Pizza",
        time: "45 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Pizza",
      },
    },
    Saturday: {
      breakfast: {
        title: "Pancakes with Maple Syrup",
        time: "25 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Pancakes",
      },
      lunch: {
        title: "Caprese Sandwich",
        time: "10 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Sandwich",
      },
      dinner: {
        title: "Grilled Steak with Roasted Potatoes",
        time: "40 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Steak",
      },
    },
    Sunday: {
      breakfast: {
        title: "French Toast with Berries",
        time: "20 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=French+Toast",
      },
      lunch: {
        title: "Brunch Frittata",
        time: "30 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Frittata",
      },
      dinner: {
        title: "Roast Chicken with Vegetables",
        time: "60 mins",
        image: "/pexels-photo-1640771.jpeg?height=100&width=200&text=Roast+Chicken",
      },
    },
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Weekly Meal Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Monday">
          <TabsList className="grid grid-cols-7 mb-4">
            {weekdays.map((day) => (
              <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                {day.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>

          {weekdays.map((day) => (
            <TabsContent key={day} value={day} className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-2">BREAKFAST</h3>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={mealPlan[day as keyof typeof mealPlan].breakfast.image || "/pexels-photo-1640771.jpeg"}
                      alt={mealPlan[day as keyof typeof mealPlan].breakfast.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{mealPlan[day as keyof typeof mealPlan].breakfast.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {mealPlan[day as keyof typeof mealPlan].breakfast.time}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-2">LUNCH</h3>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={mealPlan[day as keyof typeof mealPlan].lunch.image || "/pexels-photo-1640771.jpeg"}
                      alt={mealPlan[day as keyof typeof mealPlan].lunch.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{mealPlan[day as keyof typeof mealPlan].lunch.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {mealPlan[day as keyof typeof mealPlan].lunch.time}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-2">DINNER</h3>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={mealPlan[day as keyof typeof mealPlan].dinner.image || "/pexels-photo-1640771.jpeg"}
                      alt={mealPlan[day as keyof typeof mealPlan].dinner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{mealPlan[day as keyof typeof mealPlan].dinner.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {mealPlan[day as keyof typeof mealPlan].dinner.time}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

