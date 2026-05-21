"use client"

import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, FileText, Calendar } from "lucide-react"
import { useState } from "react"

const reportTypes = [
  {
    id: "daily-sales",
    name: "Daily Sales Report",
    description: "Detailed breakdown of daily transactions",
    lastGenerated: "Today, 9:00 AM",
  },
  {
    id: "inventory",
    name: "Inventory Status Report",
    description: "Current stock levels and low-stock alerts",
    lastGenerated: "Today, 8:30 AM",
  },
  {
    id: "revenue",
    name: "Revenue Summary",
    description: "Revenue analysis by period, category, and product",
    lastGenerated: "Feb 23, 2026",
  },
  {
    id: "profit-loss",
    name: "Profit & Loss Statement",
    description: "Income vs expenses breakdown",
    lastGenerated: "Feb 20, 2026",
  },
  {
    id: "top-products",
    name: "Top Products Report",
    description: "Best and worst performing products",
    lastGenerated: "Feb 22, 2026",
  },
  {
    id: "customer",
    name: "Customer Report",
    description: "Customer purchase patterns and frequency",
    lastGenerated: "Feb 21, 2026",
  },
]

const recentReports = [
  {
    id: "1",
    name: "Daily Sales - Feb 24",
    type: "Sales",
    date: "Feb 24, 2026",
    status: "ready",
    size: "142 KB",
  },
  {
    id: "2",
    name: "Inventory Status - Feb 24",
    type: "Inventory",
    date: "Feb 24, 2026",
    status: "ready",
    size: "89 KB",
  },
  {
    id: "3",
    name: "Weekly Revenue - W8",
    type: "Revenue",
    date: "Feb 23, 2026",
    status: "ready",
    size: "256 KB",
  },
  {
    id: "4",
    name: "Monthly P&L - January",
    type: "Financial",
    date: "Feb 1, 2026",
    status: "ready",
    size: "340 KB",
  },
  {
    id: "5",
    name: "Customer Analysis - Q4",
    type: "Customer",
    date: "Jan 15, 2026",
    status: "ready",
    size: "198 KB",
  },
]

export default function ReportsPage() {
  const [period, setPeriod] = useState("today")

  return (
    <>
      <AppHeader title="Reports" description="Generate and download business reports" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-3">Generate Reports</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {reportTypes.map((report) => (
                <Card key={report.id} className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold flex items-center gap-2">
                      <FileText className="size-3.5" />
                      {report.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[10px] text-muted-foreground mb-3">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        Last: {report.lastGenerated}
                      </span>
                      <Button variant="outline" size="sm" className="text-[10px] h-7">
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-3">Recent Reports</h2>
            <Card className="border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Report Name</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="text-xs hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">
                        Size
                      </TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="text-xs font-medium">
                          {report.name}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">
                          {report.type}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                          {report.date}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                          {report.size}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px]">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <Download className="size-3" />
                            <span className="sr-only">
                              Download {report.name}
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
