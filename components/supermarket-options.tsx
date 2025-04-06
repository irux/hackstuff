"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Store } from "lucide-react"
import Image from "next/image"

export function SupermarketOptions() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)

  const stores = [
    {
      id: "lidl",
      name: "Lidl",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/800px-Lidl-Logo.svg.png",
      deliveryTime: "2-3 hours",
      deliveryFee: "€3.99",
    },
    {
      id: "rewe",
      name: "REWE",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Rewe_Logo.png",
      deliveryTime: "Same day",
      deliveryFee: "€4.99",
    },
    {
      id: "edeka",
      name: "EDEKA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Edeka_Logo_Aktuell.svg",
      deliveryTime: "1-2 hours",
      deliveryFee: "€5.99",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <Store className="h-5 w-5 text-green-600" />
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
                  <div className="w-16 h-8 relative">
                    <Image src={store.logo || "/placeholder.svg"} alt={store.name} fill className="object-contain" />
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
      </CardContent>
    </Card>
  )
}

