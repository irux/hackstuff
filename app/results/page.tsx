import { MealSuggestions } from "@/components/meal-suggestions"
import { ShoppingList } from "@/components/shopping-list"
import { SupermarketOptions } from "@/components/supermarket-options"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
            <h1 className="text-xl font-bold text-gray-800">EcoDish</h1>
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
                Based on your uploaded cooking video, we've generated the following meal ideas and shopping list.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <MealSuggestions />
          <div>
            <ShoppingList />
            <SupermarketOptions />
          </div>
        </div>
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

