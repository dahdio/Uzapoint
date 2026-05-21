"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentSales = [
  {
    id: "INV-001",
    customer: "Jane Wanjiku",
    items: 3,
    amount: "KES 2,450",
    status: "completed",
    time: "2 min ago",
  },
  {
    id: "INV-002",
    customer: "Peter Ochieng",
    items: 1,
    amount: "KES 850",
    status: "completed",
    time: "15 min ago",
  },
  {
    id: "INV-003",
    customer: "Mary Akinyi",
    items: 5,
    amount: "KES 4,200",
    status: "pending",
    time: "32 min ago",
  },
  {
    id: "INV-004",
    customer: "David Kiprop",
    items: 2,
    amount: "KES 1,600",
    status: "completed",
    time: "1 hr ago",
  },
  {
    id: "INV-005",
    customer: "Sarah Muthoni",
    items: 4,
    amount: "KES 3,100",
    status: "completed",
    time: "1 hr ago",
  },
]

export function RecentSales() {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Invoice</TableHead>
              <TableHead className="text-xs">Customer</TableHead>
              <TableHead className="text-xs text-right">Amount</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">
                Status
              </TableHead>
              <TableHead className="text-xs hidden md:table-cell text-right">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="text-xs font-medium">{sale.id}</TableCell>
                <TableCell className="text-xs">{sale.customer}</TableCell>
                <TableCell className="text-xs font-semibold text-right">
                  {sale.amount}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      sale.status === "completed" ? "default" : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden md:table-cell text-right">
                  {sale.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
