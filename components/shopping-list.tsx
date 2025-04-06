"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, Minus, ShoppingBasket } from "lucide-react"
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
  // Use the provided items or fallback to empty array
  const initialItems: ShoppingItem[] = items || []

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(
    initialItems.map((item) => ({ ...item, checked: false })),
  )

  const toggleItem = (index: number) => {
    const newItems = [...shoppingItems]
    newItems[index].checked = !newItems[index].checked
    setShoppingItems(newItems)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <ShoppingBasket className="h-5 w-5 text-green-600" />
        <CardTitle className="text-xl">Shopping List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {shoppingItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 rounded hover:bg-gray-50 ${
                item.checked ? "text-gray-400 line-through" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleItem(index)}
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
          ))}
        </ul>

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

