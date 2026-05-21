"use client"

import { Button } from "@/components/ui/button"
import { Plus, ShoppingCart, FileText } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm">
        <Link href="/pos">
          <ShoppingCart className="size-4 mr-1.5" />
          Add Sale
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href="/inventory">
          <Plus className="size-4 mr-1.5" />
          Add Product
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href="/reports">
          <FileText className="size-4 mr-1.5" />
          Generate Report
        </Link>
      </Button>
    </div>
  )
}
