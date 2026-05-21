"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingBag,
  Utensils,
  Pill,
  Wrench,
  Laptop,
  Shirt,
  Flower2,
  GraduationCap,
  Car,
  Store,
  ArrowRight,
} from "lucide-react"

const categories = [
  {
    id: "retail",
    label: "Retail / General Shop",
    description: "Supermarkets, mini-marts, convenience stores",
    icon: ShoppingBag,
  },
  {
    id: "food",
    label: "Food & Beverage",
    description: "Restaurants, cafes, food vendors, bars",
    icon: Utensils,
  },
  {
    id: "pharmacy",
    label: "Pharmacy / Health",
    description: "Pharmacies, clinics, health & wellness stores",
    icon: Pill,
  },
  {
    id: "electronics",
    label: "Electronics & Tech",
    description: "Phone shops, computer stores, accessories",
    icon: Laptop,
  },
  {
    id: "fashion",
    label: "Fashion & Apparel",
    description: "Clothing, shoes, accessories, tailoring",
    icon: Shirt,
  },
  {
    id: "services",
    label: "Services",
    description: "Salons, repair shops, laundry, agencies",
    icon: Wrench,
  },
  {
    id: "beauty",
    label: "Beauty & Cosmetics",
    description: "Beauty stores, cosmetics, skincare products",
    icon: Flower2,
  },
  {
    id: "education",
    label: "Education & Stationery",
    description: "Bookshops, school supplies, training centers",
    icon: GraduationCap,
  },
  {
    id: "automotive",
    label: "Automotive",
    description: "Spare parts, car wash, garages, fuel stations",
    icon: Car,
  },
  {
    id: "other",
    label: "Other Business",
    description: "Any other type of business not listed above",
    icon: Store,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleContinue() {
    if (!selected) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Progress indicator */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background font-bold text-sm">
              U
            </div>
            <span className="text-lg font-bold tracking-tight">Uzapoint</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold">
                1
              </span>
              <span className="hidden sm:inline">Account</span>
            </div>
            <div className="h-px w-6 bg-border" />
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <span className="flex size-5 items-center justify-center rounded-full border-2 border-foreground text-[10px] font-bold">
                2
              </span>
              <span className="hidden sm:inline">Business Category</span>
            </div>
            <div className="h-px w-6 bg-border" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                3
              </span>
              <span className="hidden sm:inline">Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-12 lg:py-16">
        <div className="mx-auto w-full max-w-3xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What type of business do you run?
            </h1>
            <p className="mt-2 text-muted-foreground">
              This helps us customize your Uzapoint experience. You can change
              this later in settings.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => {
              const isSelected = selected === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelected(cat.id)}
                  className="text-left"
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "border-foreground ring-1 ring-foreground bg-muted/50"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isSelected
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <cat.icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{cat.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              disabled={!selected || isLoading}
              onClick={handleContinue}
              className="min-w-48"
            >
              {isLoading ? (
                "Setting up..."
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
