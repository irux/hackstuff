"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ShoppingList() {
  const initialItems = [
    { name: "Bell peppers (red and green)", category: "Vegetables", quantity: "2", checked: false },
    { name: "Broccoli", category: "Vegetables", quantity: "1 head", checked: false },
    { name: "Carrots", category: "Vegetables", quantity: "3", checked: false },
    { name: "Onion", category: "Vegetables", quantity: "1 large", checked: false },
    { name: "Garlic", category: "Vegetables", quantity: "4 cloves", checked: false },
    { name: "Chicken breast", category: "Meat", quantity: "500g", checked: false },
    { name: "Soy sauce", category: "Condiments", quantity: "3 tbsp", checked: false },
    { name: "Olive oil", category: "Oils", quantity: "2 tbsp", checked: false },
    { name: "Rice", category: "Grains", quantity: "2 cups", checked: false },
    { name: "Pasta", category: "Grains", quantity: "500g", checked: false },
    { name: "Mixed salad greens", category: "Vegetables", quantity: "200g", checked: false },
  ]

  const [items, setItems] = useState(initialItems)

  const toggleItem = (index: number) => {
    const newItems = [...items]
    newItems[index].checked = !newItems[index].checked
    setItems(newItems)
  }

  // Group items by category
  const groupedItems: Record<string, typeof items> = {}
  items.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = []
    }
    groupedItems[item.category].push(item)
  })

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Shopping List</CardTitle>
        <div className="text-sm text-gray-500">
          {items.filter((item) => item.checked).length} of {items.length} items checked
        </div>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
            <ul className="space-y-2">
              {categoryItems.map((item, index) => {
                const originalIndex = items.findIndex((i) => i === item)
                return (
                  <li
                    key={index}
                    className={`flex items-center justify-between p-2 rounded hover:bg-gray-50 ${
                      item.checked ? "text-gray-400 line-through" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleItem(originalIndex)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          item.checked ? "bg-green-500 text-white" : "border border-gray-300"
                        }`}
                      >
                        {item.checked && <Check className="h-3 w-3" />}
                      </button>
                      <span>{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.quantity}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
          <Button variant="outline" className="gap-1">
            <Minus className="h-4 w-4" />
            Clear Checked
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

