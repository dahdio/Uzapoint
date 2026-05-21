"use client"

import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Smartphone,
  Banknote,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react"

const paymentSummary = [
  {
    title: "Total Payments Today",
    value: "KES 48,250",
    change: "+12.5%",
    icon: TrendingUp,
    trend: "up" as const,
  },
  {
    title: "M-Pesa",
    value: "KES 31,200",
    change: "64.7%",
    icon: Smartphone,
    trend: "up" as const,
  },
  {
    title: "Cash",
    value: "KES 14,850",
    change: "30.8%",
    icon: Banknote,
    trend: "neutral" as const,
  },
  {
    title: "Card",
    value: "KES 2,200",
    change: "4.5%",
    icon: CreditCard,
    trend: "neutral" as const,
  },
]

const transactions = [
  {
    id: "TXN-001",
    customer: "Jane Wanjiku",
    method: "M-Pesa",
    amount: "KES 2,450",
    status: "completed",
    reference: "QK7..89F",
    time: "10:32 AM",
  },
  {
    id: "TXN-002",
    customer: "Peter Ochieng",
    method: "Cash",
    amount: "KES 850",
    status: "completed",
    reference: "-",
    time: "10:28 AM",
  },
  {
    id: "TXN-003",
    customer: "Mary Akinyi",
    method: "M-Pesa",
    amount: "KES 4,200",
    status: "pending",
    reference: "RL3..12D",
    time: "10:15 AM",
  },
  {
    id: "TXN-004",
    customer: "David Kiprop",
    method: "Card",
    amount: "KES 1,600",
    status: "completed",
    reference: "****4521",
    time: "9:58 AM",
  },
  {
    id: "TXN-005",
    customer: "Sarah Muthoni",
    method: "M-Pesa",
    amount: "KES 3,100",
    status: "completed",
    reference: "NK8..34G",
    time: "9:45 AM",
  },
  {
    id: "TXN-006",
    customer: "James Kamau",
    method: "Cash",
    amount: "KES 780",
    status: "completed",
    reference: "-",
    time: "9:30 AM",
  },
  {
    id: "TXN-007",
    customer: "Grace Njeri",
    method: "M-Pesa",
    amount: "KES 5,600",
    status: "failed",
    reference: "TM2..98H",
    time: "9:12 AM",
  },
  {
    id: "TXN-008",
    customer: "Paul Otieno",
    method: "M-Pesa",
    amount: "KES 1,200",
    status: "completed",
    reference: "WP5..67J",
    time: "8:55 AM",
  },
]

function TransactionTable({
  data,
}: {
  data: typeof transactions
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Transaction</TableHead>
          <TableHead className="text-xs hidden sm:table-cell">
            Customer
          </TableHead>
          <TableHead className="text-xs">Method</TableHead>
          <TableHead className="text-xs text-right">Amount</TableHead>
          <TableHead className="text-xs hidden md:table-cell">
            Reference
          </TableHead>
          <TableHead className="text-xs">Status</TableHead>
          <TableHead className="text-xs hidden lg:table-cell text-right">
            Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((txn) => (
          <TableRow key={txn.id}>
            <TableCell className="text-xs font-medium">{txn.id}</TableCell>
            <TableCell className="text-xs hidden sm:table-cell">
              {txn.customer}
            </TableCell>
            <TableCell className="text-xs">
              <div className="flex items-center gap-1.5">
                {txn.method === "M-Pesa" && (
                  <Smartphone className="size-3 text-muted-foreground" />
                )}
                {txn.method === "Cash" && (
                  <Banknote className="size-3 text-muted-foreground" />
                )}
                {txn.method === "Card" && (
                  <CreditCard className="size-3 text-muted-foreground" />
                )}
                {txn.method}
              </div>
            </TableCell>
            <TableCell className="text-xs font-semibold text-right">
              {txn.amount}
            </TableCell>
            <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
              {txn.reference}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  txn.status === "completed"
                    ? "default"
                    : txn.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
                className="text-[10px]"
              >
                {txn.status}
              </Badge>
            </TableCell>
            <TableCell className="text-xs text-muted-foreground hidden lg:table-cell text-right">
              {txn.time}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function PaymentsPage() {
  return (
    <>
      <AppHeader title="Payments" description="Track transactions and payment methods" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {paymentSummary.map((item) => (
              <Card key={item.title} className="border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                  <item.icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs mt-1 flex items-center gap-0.5 text-muted-foreground">
                    {item.trend === "up" ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {item.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="mpesa" className="text-xs">
                M-Pesa
              </TabsTrigger>
              <TabsTrigger value="cash" className="text-xs">
                Cash
              </TabsTrigger>
              <TabsTrigger value="card" className="text-xs">
                Card
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="border">
                <CardContent className="p-0">
                  <TransactionTable data={transactions} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mpesa">
              <Card className="border">
                <CardContent className="p-0">
                  <TransactionTable
                    data={transactions.filter((t) => t.method === "M-Pesa")}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cash">
              <Card className="border">
                <CardContent className="p-0">
                  <TransactionTable
                    data={transactions.filter((t) => t.method === "Cash")}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="card">
              <Card className="border">
                <CardContent className="p-0">
                  <TransactionTable
                    data={transactions.filter((t) => t.method === "Card")}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
