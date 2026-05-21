"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, LayoutGrid, List } from "lucide-react"
import { useState } from "react"

export interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  sku: string
}

const products: Product[] = [
  { id: "1", name: "Unga Jogoo 2kg", price: 180, category: "Flour", stock: 45, sku: "FL-001" },
  { id: "2", name: "Kimbo 1kg", price: 320, category: "Cooking Oil", stock: 32, sku: "CO-001" },
  { id: "3", name: "Brookside Milk 500ml", price: 65, category: "Dairy", stock: 120, sku: "DA-001" },
  { id: "4", name: "Mumias Sugar 1kg", price: 150, category: "Sugar", stock: 58, sku: "SG-001" },
  { id: "5", name: "Ketepa Tea 100g", price: 95, category: "Beverages", stock: 78, sku: "BV-001" },
  { id: "6", name: "Royco Mchuzi Mix", price: 10, category: "Spices", stock: 200, sku: "SP-001" },
  { id: "7", name: "Omo Detergent 1kg", price: 220, category: "Household", stock: 40, sku: "HH-001" },
  { id: "8", name: "Bread (White) 400g", price: 60, category: "Bakery", stock: 25, sku: "BK-001" },
  { id: "9", name: "Eggs (Tray of 30)", price: 450, category: "Dairy", stock: 15, sku: "DA-002" },
  { id: "10", name: "Tusker Cider 500ml", price: 200, category: "Beverages", stock: 60, sku: "BV-002" },
  { id: "11", name: "Blueband 500g", price: 180, category: "Cooking Oil", stock: 42, sku: "CO-002" },
  { id: "12", name: "Maize Flour 1kg", price: 120, category: "Flour", stock: 88, sku: "FL-002" },
]

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

interface ProductGridProps {
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="icon"
          className="size-9 shrink-0"
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid className="size-4" />
          <span className="sr-only">Grid view</span>
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="icon"
          className="size-9 shrink-0"
          onClick={() => setViewMode("list")}
        >
          <List className="size-4" />
          <span className="sr-only">List view</span>
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            className="text-xs shrink-0"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer border hover:border-foreground transition-colors"
              onClick={() => onAddToCart(product)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-1">
                  <p className="text-xs font-semibold leading-tight">
                    {product.name}
                  </p>
                  {product.stock <= 20 && (
                    <Badge variant="secondary" className="text-[9px] shrink-0">
                      Low
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-bold mt-2">
                  KES {product.price.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {product.category} &middot; {product.stock} in stock
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:border-foreground transition-colors"
              onClick={() => onAddToCart(product)}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-semibold">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {product.sku} &middot; {product.stock} in stock
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold">
                KES {product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
