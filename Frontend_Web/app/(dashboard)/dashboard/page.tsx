import { AppHeader } from "@/components/app-header"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <>
      <AppHeader title="Dashboard" description="Overview of your business performance" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col gap-6">
          <QuickActions />
          <MetricCards />
          <div className="grid gap-6 lg:grid-cols-2">
            <SalesChart />
            <RevenueChart />
          </div>
          <RecentSales />
        </div>
      </div>
    </>
  )
}
