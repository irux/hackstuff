import { ShoppingList } from "@/components/shopping-list"
import { SupermarketOptions } from "@/components/supermarket-options"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FeaturedRecipe } from "@/components/featured-recipe"
import { RecipeList } from "@/components/recipe-list"

// Sample data based on the provided schema
const sampleData = {
  shopping_list: {
    items: [
      { name: "milk", quantity: 1, unit: "liter" },
      { name: "butter", quantity: 250, unit: "grams" },
      { name: "lemon", quantity: 2, unit: "pieces" },
      { name: "mayonnaise", quantity: 250, unit: "grams" },
      { name: "mustard", quantity: 100, unit: "grams" },
      { name: "fresh parsley", quantity: 1, unit: "bunch" },
    ],
  },
  recipes: [
    {
      name: "Cheddar & Spinach Scrambled Eggs",
      ingredients: [
        { name: "eggs", quantity: 4, unit: "pieces" },
        { name: "spinach", quantity: 50, unit: "grams" },
        { name: "cheddar", quantity: 50, unit: "grams" },
        { name: "milk", quantity: 0.25, unit: "liters" },
        { name: "butter", quantity: 20, unit: "grams" },
      ],
      instructions: [
        "Whisk eggs with milk, salt, and pepper.",
        "Melt butter in a pan over medium heat.",
        "Add spinach and cook until wilted.",
        "Pour in eggs and gently scramble.",
        "Add cheddar at the end and let melt before serving.",
      ],
      image: "/images/pexels-photo-1640771.jpeg",
    },
    {
      name: "Chicken Caesar Wrap",
      ingredients: [
        { name: "chicken breast", quantity: 150, unit: "grams" },
        { name: "lettuce", quantity: 40, unit: "grams" },
        { name: "bacon", quantity: 2, unit: "slices" },
        { name: "cheddar", quantity: 30, unit: "grams" },
        { name: "tortilla wrap", quantity: 1, unit: "piece" },
        { name: "mayonnaise", quantity: 1, unit: "tablespoon" },
        { name: "mustard", quantity: 1, unit: "teaspoon" },
        { name: "lemon", quantity: 0.5, unit: "piece" },
      ],
      instructions: [
        "Cook chicken and bacon until crispy.",
        "Mix mayo, mustard, and lemon juice for dressing.",
        "Fill tortilla with sliced chicken, bacon, lettuce, cheddar, and dressing.",
        "Roll up and serve.",
      ],
      image: "/placeholder.svg?height=192&width=384&text=Chicken+Caesar+Wrap",
    },
    {
      name: "Creamy Chicken & Spinach Pasta",
      ingredients: [
        { name: "chicken breast", quantity: 200, unit: "grams" },
        { name: "spinach", quantity: 50, unit: "grams" },
        { name: "pasta", quantity: 150, unit: "grams" },
        { name: "onion", quantity: 0.5, unit: "piece" },
        { name: "garlic", quantity: 2, unit: "cloves" },
        { name: "cheddar", quantity: 30, unit: "grams" },
        { name: "butter", quantity: 20, unit: "grams" },
        { name: "milk", quantity: 0.3, unit: "liters" },
      ],
      instructions: [
        "Cook pasta.",
        "Sauté garlic, onion, and chicken in butter.",
        "Add spinach until wilted.",
        "Add milk and cheese, stir until creamy.",
        "Combine with pasta and serve.",
      ],
      image: "/placeholder.svg?height=192&width=384&text=Creamy+Pasta",
    },
    {
      name: "Tomato Garlic Pasta with Parmesan",
      ingredients: [
        { name: "pasta", quantity: 150, unit: "grams" },
        { name: "garlic", quantity: 3, unit: "cloves" },
        { name: "tomato paste", quantity: 2, unit: "tablespoons" },
        { name: "parmesan", quantity: 30, unit: "grams" },
        { name: "olive oil", quantity: 1, unit: "tablespoon" },
      ],
      instructions: [
        "Cook pasta.",
        "Sauté garlic in olive oil, add tomato paste.",
        "Add a splash of pasta water, stir into sauce.",
        "Toss with pasta and serve with parmesan.",
      ],
      image: "/placeholder.svg?height=192&width=384&text=Tomato+Pasta",
    },
    {
      name: "Bacon & Egg Breakfast Roll",
      ingredients: [
        { name: "eggs", quantity: 2, unit: "pieces" },
        { name: "bacon", quantity: 2, unit: "slices" },
        { name: "bread roll", quantity: 1, unit: "piece" },
        { name: "butter", quantity: 10, unit: "grams" },
      ],
      instructions: [
        "Fry bacon until crispy.",
        "Scramble or fry eggs.",
        "Toast bread roll with butter.",
        "Assemble roll with bacon and egg.",
      ],
      image: "/placeholder.svg?height=192&width=384&text=Breakfast+Roll",
    },
    {
      name: "Mushroom & Onion Omelette",
      ingredients: [
        { name: "eggs", quantity: 3, unit: "pieces" },
        { name: "onion", quantity: 0.5, unit: "piece" },
        { name: "champignons", quantity: 80, unit: "grams" },
        { name: "butter", quantity: 15, unit: "grams" },
        { name: "parsley", quantity: 1, unit: "tablespoon" },
      ],
      instructions: [
        "Sauté mushrooms and onions in butter.",
        "Whisk eggs and pour into pan.",
        "Cook until set, fold and garnish with parsley.",
      ],
      image: "/placeholder.svg?height=192&width=384&text=Mushroom+Omelette",
    },
    {
      name: "Cheddar & Onion Stuffed Quesadilla",
      ingredients: [
        { name: "cheddar", quantity: 50, unit: "grams" },
        { name: "onion", quantity: 0.5, unit: "piece" },
        { name: "tortilla wrap", quantity: 1, unit: "piece" },
        { name: "butter", quantity: 10, unit: "grams" },
      ],
      instructions: [
        "Sauté onion in butter.",
        "Place cheddar and onion on one half of tortilla.",
        "Fold and cook in pan until crispy and melted inside.",
      ],
      image: "/placeholder.svg?height=192&width=384&text=Quesadilla",
    },
  ],
}

export default function ResultsPage() {
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
        <FeaturedRecipe recipe={sampleData.recipes[0]} />

        {/* Shopping List (left) and Supermarket Options (right) */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ShoppingList items={sampleData.shopping_list.items} />
          <SupermarketOptions />
        </div>

        {/* Recipe List */}
        <RecipeList recipes={sampleData.recipes} />
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

