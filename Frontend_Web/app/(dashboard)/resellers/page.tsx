"use client"

import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Users, TrendingUp, MapPin } from "lucide-react"

const agents = [
  {
    id: "1",
    name: "Joseph Mwangi",
    location: "Nairobi CBD",
    status: "active",
    sales: "KES 245,000",
    commission: "KES 12,250",
    customers: 45,
  },
  {
    id: "2",
    name: "Alice Wambui",
    location: "Westlands",
    status: "active",
    sales: "KES 198,000",
    commission: "KES 9,900",
    customers: 38,
  },
  {
    id: "3",
    name: "Brian Otieno",
    location: "Mombasa",
    status: "active",
    sales: "KES 312,000",
    commission: "KES 15,600",
    customers: 62,
  },
  {
    id: "4",
    name: "Diana Chebet",
    location: "Kisumu",
    status: "inactive",
    sales: "KES 87,000",
    commission: "KES 4,350",
    customers: 21,
  },
  {
    id: "5",
    name: "Eric Njoroge",
    location: "Nakuru",
    status: "active",
    sales: "KES 156,000",
    commission: "KES 7,800",
    customers: 33,
  },
]

const summaryCards = [
  { title: "Total Agents", value: "5", icon: Users },
  { title: "Active Agents", value: "4", icon: Users },
  { title: "Total Sales (Agents)", value: "KES 998K", icon: TrendingUp },
  { title: "Locations", value: "5", icon: MapPin },
]

export default function ResellersPage() {
  return (
    <>
      <AppHeader
        title="Resellers / Agents"
        description="Manage your sales agents and resellers"
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Button size="sm" className="text-xs">
              <Plus className="size-3.5 mr-1.5" />
              Add Agent
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
              <Card key={card.title} className="border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Agent Name</TableHead>
                    <TableHead className="text-xs hidden sm:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs text-right">
                      Total Sales
                    </TableHead>
                    <TableHead className="text-xs hidden md:table-cell text-right">
                      Commission
                    </TableHead>
                    <TableHead className="text-xs hidden lg:table-cell text-right">
                      Customers
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="text-xs font-medium">
                        {agent.name}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">
                        {agent.location}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            agent.status === "active" ? "default" : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-right">
                        {agent.sales}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden md:table-cell text-right">
                        {agent.commission}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden lg:table-cell text-right">
                        {agent.customers}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
