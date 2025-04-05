"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define types based on the schema
interface ShoppingItem {
  name: string
  quantity: number
  unit: string
  checked?: boolean
}

interface ShoppingListProps {
  items?: ShoppingItem[]
}

export function ShoppingList({ items }: ShoppingListProps) {
  // Use the provided items or fallback to sample data
  const initialItems: ShoppingItem[] = items || [
    { name: "milk", quantity: 1, unit: "liter", checked: false },
    { name: "butter", quantity: 250, unit: "grams", checked: false },
    { name: "lemon", quantity: 2, unit: "pieces", checked: false },
    { name: "mayonnaise", quantity: 250, unit: "grams", checked: false },
    { name: "mustard", quantity: 100, unit: "grams", checked: false },
    { name: "fresh parsley", quantity: 1, unit: "bunch", checked: false },
    { name: "eggs", quantity: 9, unit: "pieces", checked: false },
    { name: "spinach", quantity: 100, unit: "grams", checked: false },
    { name: "cheddar", quantity: 160, unit: "grams", checked: false },
    { name: "chicken breast", quantity: 350, unit: "grams", checked: false },
    { name: "lettuce", quantity: 40, unit: "grams", checked: false },
    { name: "bacon", quantity: 4, unit: "slices", checked: false },
    { name: "tortilla wrap", quantity: 2, unit: "pieces", checked: false },
    { name: "pasta", quantity: 300, unit: "grams", checked: false },
    { name: "onion", quantity: 2, unit: "pieces", checked: false },
    { name: "garlic", quantity: 5, unit: "cloves", checked: false },
    { name: "tomato paste", quantity: 2, unit: "tablespoons", checked: false },
    { name: "parmesan", quantity: 30, unit: "grams", checked: false },
    { name: "olive oil", quantity: 1, unit: "tablespoon", checked: false },
    { name: "bread roll", quantity: 1, unit: "piece", checked: false },
    { name: "champignons", quantity: 80, unit: "grams", checked: false },
  ]

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(
    initialItems.map((item) => ({ ...item, checked: false })),
  )

  const toggleItem = (index: number) => {
    const newItems = [...shoppingItems]
    newItems[index].checked = !newItems[index].checked
    setShoppingItems(newItems)
  }

  // Group items by category (we'll use the first letter as a simple grouping)
  const groupedItems: Record<string, ShoppingItem[]> = {}
  shoppingItems.forEach((item) => {
    const firstLetter = item.name.charAt(0).toUpperCase()
    if (!groupedItems[firstLetter]) {
      groupedItems[firstLetter] = []
    }
    groupedItems[firstLetter].push(item)
  })

  // Sort the keys alphabetically
  const sortedKeys = Object.keys(groupedItems).sort()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Shopping List</CardTitle>
        <div className="text-sm text-gray-500">
          {shoppingItems.filter((item) => item.checked).length} of {shoppingItems.length} items checked
        </div>
      </CardHeader>
      <CardContent>
        {sortedKeys.map((key) => (
          <div key={key} className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">{key}</h3>
            <ul className="space-y-2">
              {groupedItems[key].map((item, index) => {
                const originalIndex = shoppingItems.findIndex((i) => i === item)
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
                      <span className="capitalize">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.quantity} {item.unit}
                    </span>
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

