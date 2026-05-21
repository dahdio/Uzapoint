"use client"

import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const dailySales = [
  { date: "Feb 18", sales: 42300, orders: 134 },
  { date: "Feb 19", sales: 38100, orders: 121 },
  { date: "Feb 20", sales: 55200, orders: 178 },
  { date: "Feb 21", sales: 48900, orders: 156 },
  { date: "Feb 22", sales: 61400, orders: 195 },
  { date: "Feb 23", sales: 52700, orders: 167 },
  { date: "Feb 24", sales: 48250, orders: 156 },
]

const categoryData = [
  { name: "Flour", value: 32 },
  { name: "Dairy", value: 24 },
  { name: "Beverages", value: 18 },
  { name: "Cooking Oil", value: 14 },
  { name: "Other", value: 12 },
]

const topProducts = [
  { name: "Unga Jogoo 2kg", units: 245 },
  { name: "Brookside Milk", units: 198 },
  { name: "Kimbo 1kg", units: 167 },
  { name: "Mumias Sugar", units: 145 },
  { name: "Ketepa Tea", units: 132 },
]

const hourlySales = [
  { hour: "6am", sales: 1200 },
  { hour: "8am", sales: 5400 },
  { hour: "10am", sales: 8200 },
  { hour: "12pm", sales: 12300 },
  { hour: "2pm", sales: 7800 },
  { hour: "4pm", sales: 9600 },
  { hour: "6pm", sales: 11200 },
  { hour: "8pm", sales: 4100 },
]

const COLORS = [
  "hsl(var(--foreground))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--border))",
  "hsl(var(--ring))",
  "hsl(var(--input))",
]

const summaryMetrics = [
  { label: "Avg. Order Value", value: "KES 312" },
  { label: "Conversion Rate", value: "78.4%" },
  { label: "Returns", value: "2.1%" },
  { label: "Top Hour", value: "12 - 1 PM" },
]

export default function AnalyticsPage() {
  return (
    <>
      <AppHeader title="Analytics" description="Business performance insights" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {summaryMetrics.map((metric) => (
              <Card key={metric.label} className="border">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="sales" className="w-full">
            <TabsList>
              <TabsTrigger value="sales" className="text-xs">
                Sales Trend
              </TabsTrigger>
              <TabsTrigger value="hourly" className="text-xs">
                Hourly Pattern
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-xs">
                Categories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sales">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Daily Sales & Orders (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={dailySales}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          fontSize: 12,
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="sales"
                        stroke="hsl(var(--foreground))"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "hsl(var(--background))", stroke: "hsl(var(--foreground))", strokeWidth: 2 }}
                        name="Sales (KES)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="orders"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3 }}
                        name="Orders"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hourly">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Sales by Hour (Today)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={hourlySales}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="hour"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          fontSize: 12,
                        }}
                        formatter={(value: number) => [
                          `KES ${value.toLocaleString()}`,
                          "Sales",
                        ]}
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
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">
                      Sales by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                          fontSize={11}
                        >
                          {categoryData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">
                      Top Selling Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={topProducts} layout="vertical">
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                          axisLine={false}
                          width={110}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            fontSize: 12,
                          }}
                          formatter={(value: number) => [
                            `${value} units`,
                            "Sold",
                          ]}
                        />
                        <Bar
                          dataKey="units"
                          fill="hsl(var(--foreground))"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
