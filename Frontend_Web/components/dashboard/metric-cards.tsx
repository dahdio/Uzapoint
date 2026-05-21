"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  Users,
} from "lucide-react"

const metrics = [
  {
    title: "Sales Today",
    value: "KES 48,250",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Orders Today",
    value: "156",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Total Products",
    value: "1,248",
    change: "+3 new",
    changeType: "neutral" as const,
    icon: Package,
  },
  {
    title: "Revenue (MTD)",
    value: "KES 1.2M",
    change: "+18.3%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "Needs attention",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+5.1%",
    changeType: "positive" as const,
    icon: Users,
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p
              className={`text-xs mt-1 ${
                metric.changeType === "positive"
                  ? "text-foreground"
                  : metric.changeType === "negative"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
