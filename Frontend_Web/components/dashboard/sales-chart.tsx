"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

const data = [
  { day: "Mon", sales: 32400 },
  { day: "Tue", sales: 41200 },
  { day: "Wed", sales: 28900 },
  { day: "Thu", sales: 51300 },
  { day: "Fri", sales: 46800 },
  { day: "Sat", sales: 62100 },
  { day: "Sun", sales: 38500 },
]

export function SalesChart() {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Weekly Sales Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: 12,
              }}
              formatter={(value: number) => [`KES ${value.toLocaleString()}`, "Sales"]}
            />
            <Bar
              dataKey="sales"
              fill="hsl(var(--foreground))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
