"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ExternalLink } from "lucide-react"

export function SupermarketOptions() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)

  const stores = [
    {
      id: "walmart",
      name: "Walmart",
      logo: "/placeholder.svg?height=40&width=120&text=Walmart",
      deliveryTime: "2-3 hours",
      deliveryFee: "$5.99",
    },
    {
      id: "kroger",
      name: "Kroger",
      logo: "/placeholder.svg?height=40&width=120&text=Kroger",
      deliveryTime: "Same day",
      deliveryFee: "$3.99",
    },
    {
      id: "wholeFoods",
      name: "Whole Foods",
      logo: "/placeholder.svg?height=40&width=120&text=Whole+Foods",
      deliveryTime: "1-2 hours",
      deliveryFee: "$4.99",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Get your ingredients delivered from a local supermarket.</p>

        <div className="space-y-3 mb-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedStore === store.id ? "border-green-500 bg-green-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedStore(store.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <img src={store.logo || "/placeholder.svg"} alt={store.name} className="h-8" />
                  </div>
                  <div>
                    <p className="font-medium">{store.name}</p>
                    <p className="text-sm text-gray-500">
                      Delivery: {store.deliveryTime} • {store.deliveryFee}
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  {selectedStore === store.id && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 gap-2" disabled={!selectedStore}>
          <ShoppingCart className="h-4 w-4" />
          Order Ingredients
        </Button>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-gray-500 flex items-center justify-center gap-1 hover:text-green-600">
            View all available stores
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

