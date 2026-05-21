// ─── Types ─────────────────────────────────────────────────────────────
export type BusinessCategory =
  | "retail"
  | "food"
  | "pharmacy"
  | "electronics"
  | "fashion"
  | "services"
  | "beauty"
  | "education"
  | "automotive"
  | "other"

export type SaleMode = "retail" | "wholesale"

export interface ProductItem {
  id: string
  name: string
  price: number
  wholesalePrice: number
  wholesaleMinQty: number
  wholesaleUnit: string
  category: string
  stock: number
  sku: string
  variant: string
  cost: number
}

export interface DashboardMetric {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
}

export interface WeeklySalesEntry {
  day: string
  sales: number
}

export interface MonthlyRevenueEntry {
  month: string
  revenue: number
}

export interface RecentSaleEntry {
  id: string
  customer: string
  items: number
  amount: string
  status: "completed" | "pending"
  time: string
}

export interface DailySalesEntry {
  date: string
  sales: number
  orders: number
}

export interface CategoryBreakdown {
  name: string
  value: number
}

export interface TopProduct {
  name: string
  units: number
}

export interface HourlySalesEntry {
  hour: string
  sales: number
}

export interface AnalyticsSummary {
  label: string
  value: string
}

export interface Transaction {
  id: string
  customer: string
  method: "M-Pesa" | "Cash" | "Card"
  amount: string
  status: "completed" | "pending" | "failed"
  reference: string
  time: string
}

export interface PaymentSummaryItem {
  title: string
  value: string
  change: string
  trend: "up" | "neutral"
}

export interface ReportType {
  id: string
  name: string
  description: string
  lastGenerated: string
}

export interface BusinessCategoryData {
  label: string
  productCategories: string[]
  products: ProductItem[]
  dashboardMetrics: DashboardMetric[]
  weeklySales: WeeklySalesEntry[]
  monthlyRevenue: MonthlyRevenueEntry[]
  recentSales: RecentSaleEntry[]
  dailySales: DailySalesEntry[]
  categoryBreakdown: CategoryBreakdown[]
  topProducts: TopProduct[]
  hourlySales: HourlySalesEntry[]
  analyticsSummary: AnalyticsSummary[]
  transactions: Transaction[]
  paymentSummary: PaymentSummaryItem[]
  reportTypes: ReportType[]
}

// ─── Helpers ───────────────────────────────────────────────────────────
const hours: HourlySalesEntry[] = [
  { hour: "6am", sales: 0 },
  { hour: "8am", sales: 0 },
  { hour: "10am", sales: 0 },
  { hour: "12pm", sales: 0 },
  { hour: "2pm", sales: 0 },
  { hour: "4pm", sales: 0 },
  { hour: "6pm", sales: 0 },
  { hour: "8pm", sales: 0 },
]

function makeHourly(peaks: number[]): HourlySalesEntry[] {
  return hours.map((h, i) => ({ ...h, sales: peaks[i] ?? 0 }))
}

// ─── RETAIL ────────────────────────────────────────────────────────────
const retail: BusinessCategoryData = {
  label: "Retail / General Shop",
  productCategories: ["Flour", "Cooking Oil", "Dairy", "Sugar", "Beverages", "Spices", "Household", "Bakery"],
  products: [
    { id: "r1", name: "Unga Jogoo 2kg", price: 180, wholesalePrice: 155, wholesaleMinQty: 10, wholesaleUnit: "Bale (10pcs)", category: "Flour", stock: 45, sku: "FL-001", variant: "2kg", cost: 150 },
    { id: "r2", name: "Kimbo 1kg", price: 320, wholesalePrice: 285, wholesaleMinQty: 12, wholesaleUnit: "Carton (12pcs)", category: "Cooking Oil", stock: 32, sku: "CO-001", variant: "1kg", cost: 280 },
    { id: "r3", name: "Brookside Milk 500ml", price: 65, wholesalePrice: 55, wholesaleMinQty: 24, wholesaleUnit: "Crate (24pcs)", category: "Dairy", stock: 120, sku: "DA-001", variant: "500ml", cost: 52 },
    { id: "r4", name: "Mumias Sugar 1kg", price: 150, wholesalePrice: 130, wholesaleMinQty: 20, wholesaleUnit: "Bale (20pcs)", category: "Sugar", stock: 58, sku: "SG-001", variant: "1kg", cost: 125 },
    { id: "r5", name: "Ketepa Tea 100g", price: 95, wholesalePrice: 80, wholesaleMinQty: 24, wholesaleUnit: "Carton (24pcs)", category: "Beverages", stock: 78, sku: "BV-001", variant: "100g", cost: 72 },
    { id: "r6", name: "Royco Mchuzi Mix", price: 10, wholesalePrice: 8, wholesaleMinQty: 100, wholesaleUnit: "Box (100pcs)", category: "Spices", stock: 200, sku: "SP-001", variant: "Single", cost: 7 },
    { id: "r7", name: "Omo Detergent 1kg", price: 220, wholesalePrice: 190, wholesaleMinQty: 12, wholesaleUnit: "Carton (12pcs)", category: "Household", stock: 40, sku: "HH-001", variant: "1kg", cost: 185 },
    { id: "r8", name: "Bread (White) 400g", price: 60, wholesalePrice: 52, wholesaleMinQty: 20, wholesaleUnit: "Crate (20pcs)", category: "Bakery", stock: 25, sku: "BK-001", variant: "400g", cost: 48 },
    { id: "r9", name: "Eggs (Tray of 30)", price: 450, wholesalePrice: 400, wholesaleMinQty: 5, wholesaleUnit: "5 Trays", category: "Dairy", stock: 15, sku: "DA-002", variant: "Tray", cost: 380 },
    { id: "r10", name: "Tusker Cider 500ml", price: 200, wholesalePrice: 170, wholesaleMinQty: 24, wholesaleUnit: "Crate (24pcs)", category: "Beverages", stock: 60, sku: "BV-002", variant: "500ml", cost: 160 },
    { id: "r11", name: "Blueband 500g", price: 180, wholesalePrice: 155, wholesaleMinQty: 24, wholesaleUnit: "Carton (24pcs)", category: "Cooking Oil", stock: 42, sku: "CO-002", variant: "500g", cost: 148 },
    { id: "r12", name: "Maize Flour 1kg", price: 120, wholesalePrice: 100, wholesaleMinQty: 20, wholesaleUnit: "Bale (20pcs)", category: "Flour", stock: 5, sku: "FL-002", variant: "1kg", cost: 95 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 48,250", change: "+12.5%", changeType: "positive" },
    { title: "Orders Today", value: "156", change: "+8.2%", changeType: "positive" },
    { title: "Total Products", value: "1,248", change: "+3 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 1.2M", change: "+18.3%", changeType: "positive" },
    { title: "Low Stock Items", value: "23", change: "Needs attention", changeType: "negative" },
    { title: "Active Customers", value: "892", change: "+5.1%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 32400 }, { day: "Tue", sales: 41200 }, { day: "Wed", sales: 28900 },
    { day: "Thu", sales: 51300 }, { day: "Fri", sales: 46800 }, { day: "Sat", sales: 62100 }, { day: "Sun", sales: 38500 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 820000 }, { month: "Feb", revenue: 940000 }, { month: "Mar", revenue: 1050000 },
    { month: "Apr", revenue: 890000 }, { month: "May", revenue: 1120000 }, { month: "Jun", revenue: 1200000 },
  ],
  recentSales: [
    { id: "INV-001", customer: "Jane Wanjiku", items: 3, amount: "KES 2,450", status: "completed", time: "2 min ago" },
    { id: "INV-002", customer: "Peter Ochieng", items: 1, amount: "KES 850", status: "completed", time: "15 min ago" },
    { id: "INV-003", customer: "Mary Akinyi", items: 5, amount: "KES 4,200", status: "pending", time: "32 min ago" },
    { id: "INV-004", customer: "David Kiprop", items: 2, amount: "KES 1,600", status: "completed", time: "1 hr ago" },
    { id: "INV-005", customer: "Sarah Muthoni", items: 4, amount: "KES 3,100", status: "completed", time: "1 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 42300, orders: 134 }, { date: "Feb 19", sales: 38100, orders: 121 },
    { date: "Feb 20", sales: 55200, orders: 178 }, { date: "Feb 21", sales: 48900, orders: 156 },
    { date: "Feb 22", sales: 61400, orders: 195 }, { date: "Feb 23", sales: 52700, orders: 167 },
    { date: "Feb 24", sales: 48250, orders: 156 },
  ],
  categoryBreakdown: [
    { name: "Flour", value: 32 }, { name: "Dairy", value: 24 }, { name: "Beverages", value: 18 },
    { name: "Cooking Oil", value: 14 }, { name: "Other", value: 12 },
  ],
  topProducts: [
    { name: "Unga Jogoo 2kg", units: 245 }, { name: "Brookside Milk", units: 198 },
    { name: "Kimbo 1kg", units: 167 }, { name: "Mumias Sugar", units: 145 }, { name: "Ketepa Tea", units: 132 },
  ],
  hourlySales: makeHourly([1200, 5400, 8200, 12300, 7800, 9600, 11200, 4100]),
  analyticsSummary: [
    { label: "Avg. Order Value", value: "KES 312" }, { label: "Conversion Rate", value: "78.4%" },
    { label: "Returns", value: "2.1%" }, { label: "Top Hour", value: "12 - 1 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Jane Wanjiku", method: "M-Pesa", amount: "KES 2,450", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "Peter Ochieng", method: "Cash", amount: "KES 850", status: "completed", reference: "-", time: "10:28 AM" },
    { id: "TXN-003", customer: "Mary Akinyi", method: "M-Pesa", amount: "KES 4,200", status: "pending", reference: "RL3..12D", time: "10:15 AM" },
    { id: "TXN-004", customer: "David Kiprop", method: "Card", amount: "KES 1,600", status: "completed", reference: "****4521", time: "9:58 AM" },
    { id: "TXN-005", customer: "Sarah Muthoni", method: "M-Pesa", amount: "KES 3,100", status: "completed", reference: "NK8..34G", time: "9:45 AM" },
    { id: "TXN-006", customer: "James Kamau", method: "Cash", amount: "KES 780", status: "completed", reference: "-", time: "9:30 AM" },
    { id: "TXN-007", customer: "Grace Njeri", method: "M-Pesa", amount: "KES 5,600", status: "failed", reference: "TM2..98H", time: "9:12 AM" },
    { id: "TXN-008", customer: "Paul Otieno", method: "M-Pesa", amount: "KES 1,200", status: "completed", reference: "WP5..67J", time: "8:55 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 48,250", change: "+12.5%", trend: "up" },
    { title: "M-Pesa", value: "KES 31,200", change: "64.7%", trend: "up" },
    { title: "Cash", value: "KES 14,850", change: "30.8%", trend: "neutral" },
    { title: "Card", value: "KES 2,200", change: "4.5%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Detailed breakdown of daily transactions", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Inventory Status Report", description: "Current stock levels and low-stock alerts", lastGenerated: "Today, 8:30 AM" },
    { id: "revenue", name: "Revenue Summary", description: "Revenue analysis by period, category, and product", lastGenerated: "Feb 23, 2026" },
    { id: "profit-loss", name: "Profit & Loss Statement", description: "Income vs expenses breakdown", lastGenerated: "Feb 20, 2026" },
    { id: "top-products", name: "Top Products Report", description: "Best and worst performing products", lastGenerated: "Feb 22, 2026" },
    { id: "customer", name: "Customer Report", description: "Customer purchase patterns and frequency", lastGenerated: "Feb 21, 2026" },
  ],
}

// ─── FOOD & BEVERAGE ───────────────────────────────────────────────────
const food: BusinessCategoryData = {
  label: "Food & Beverage",
  productCategories: ["Main Course", "Appetizer", "Beverages", "Desserts", "Snacks", "Breakfast"],
  products: [
    { id: "f1", name: "Nyama Choma (500g)", price: 650, wholesalePrice: 550, wholesaleMinQty: 10, wholesaleUnit: "10 Portions", category: "Main Course", stock: 30, sku: "MC-001", variant: "500g", cost: 420 },
    { id: "f2", name: "Pilau Rice (Plate)", price: 350, wholesalePrice: 280, wholesaleMinQty: 20, wholesaleUnit: "20 Plates", category: "Main Course", stock: 50, sku: "MC-002", variant: "Full Plate", cost: 180 },
    { id: "f3", name: "Ugali & Sukuma", price: 200, wholesalePrice: 160, wholesaleMinQty: 20, wholesaleUnit: "20 Plates", category: "Main Course", stock: 80, sku: "MC-003", variant: "Full Plate", cost: 90 },
    { id: "f4", name: "Chapati (Single)", price: 30, wholesalePrice: 22, wholesaleMinQty: 50, wholesaleUnit: "50 Pieces", category: "Snacks", stock: 200, sku: "SN-001", variant: "Single", cost: 15 },
    { id: "f5", name: "Samosa (Beef)", price: 50, wholesalePrice: 35, wholesaleMinQty: 50, wholesaleUnit: "50 Pieces", category: "Appetizer", stock: 120, sku: "AP-001", variant: "Single", cost: 25 },
    { id: "f6", name: "Fresh Juice (Glass)", price: 150, wholesalePrice: 120, wholesaleMinQty: 20, wholesaleUnit: "20 Glasses", category: "Beverages", stock: 60, sku: "BV-001", variant: "300ml", cost: 60 },
    { id: "f7", name: "Tusker Lager", price: 250, wholesalePrice: 200, wholesaleMinQty: 24, wholesaleUnit: "Crate (24)", category: "Beverages", stock: 96, sku: "BV-002", variant: "500ml", cost: 160 },
    { id: "f8", name: "Mandazi (Pair)", price: 40, wholesalePrice: 30, wholesaleMinQty: 50, wholesaleUnit: "50 Pairs", category: "Breakfast", stock: 150, sku: "BF-001", variant: "2 pcs", cost: 18 },
    { id: "f9", name: "Chicken Tikka", price: 450, wholesalePrice: 380, wholesaleMinQty: 10, wholesaleUnit: "10 Portions", category: "Main Course", stock: 25, sku: "MC-004", variant: "Quarter", cost: 280 },
    { id: "f10", name: "Fruit Salad", price: 200, wholesalePrice: 160, wholesaleMinQty: 15, wholesaleUnit: "15 Bowls", category: "Desserts", stock: 40, sku: "DS-001", variant: "Bowl", cost: 80 },
    { id: "f11", name: "Masala Tea", price: 50, wholesalePrice: 40, wholesaleMinQty: 30, wholesaleUnit: "30 Cups", category: "Beverages", stock: 100, sku: "BV-003", variant: "Cup", cost: 15 },
    { id: "f12", name: "Chips (Regular)", price: 180, wholesalePrice: 150, wholesaleMinQty: 20, wholesaleUnit: "20 Plates", category: "Snacks", stock: 70, sku: "SN-002", variant: "Regular", cost: 80 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 67,400", change: "+15.2%", changeType: "positive" },
    { title: "Orders Today", value: "218", change: "+11.4%", changeType: "positive" },
    { title: "Menu Items", value: "84", change: "+2 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 1.8M", change: "+22.1%", changeType: "positive" },
    { title: "Low Stock Items", value: "8", change: "Needs attention", changeType: "negative" },
    { title: "Tables Served", value: "142", change: "+9.3%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 45200 }, { day: "Tue", sales: 52100 }, { day: "Wed", sales: 38700 },
    { day: "Thu", sales: 61400 }, { day: "Fri", sales: 78200 }, { day: "Sat", sales: 92300 }, { day: "Sun", sales: 67400 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 1200000 }, { month: "Feb", revenue: 1380000 }, { month: "Mar", revenue: 1520000 },
    { month: "Apr", revenue: 1310000 }, { month: "May", revenue: 1640000 }, { month: "Jun", revenue: 1800000 },
  ],
  recentSales: [
    { id: "ORD-001", customer: "Table 5", items: 4, amount: "KES 2,850", status: "completed", time: "5 min ago" },
    { id: "ORD-002", customer: "Takeaway - John", items: 2, amount: "KES 1,300", status: "completed", time: "12 min ago" },
    { id: "ORD-003", customer: "Table 12", items: 6, amount: "KES 4,500", status: "pending", time: "20 min ago" },
    { id: "ORD-004", customer: "Table 3", items: 3, amount: "KES 1,950", status: "completed", time: "35 min ago" },
    { id: "ORD-005", customer: "Delivery - Anne", items: 2, amount: "KES 1,200", status: "completed", time: "1 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 58300, orders: 195 }, { date: "Feb 19", sales: 52100, orders: 174 },
    { date: "Feb 20", sales: 71200, orders: 238 }, { date: "Feb 21", sales: 64900, orders: 217 },
    { date: "Feb 22", sales: 82400, orders: 275 }, { date: "Feb 23", sales: 76700, orders: 256 },
    { date: "Feb 24", sales: 67400, orders: 218 },
  ],
  categoryBreakdown: [
    { name: "Main Course", value: 42 }, { name: "Beverages", value: 25 }, { name: "Snacks", value: 15 },
    { name: "Appetizer", value: 10 }, { name: "Desserts", value: 8 },
  ],
  topProducts: [
    { name: "Nyama Choma", units: 180 }, { name: "Pilau Rice", units: 165 },
    { name: "Ugali & Sukuma", units: 210 }, { name: "Fresh Juice", units: 142 }, { name: "Tusker Lager", units: 198 },
  ],
  hourlySales: makeHourly([800, 4200, 6800, 18500, 9200, 7400, 14800, 5700]),
  analyticsSummary: [
    { label: "Avg. Order Value", value: "KES 485" }, { label: "Table Turnover", value: "3.2x" },
    { label: "Food Waste", value: "4.8%" }, { label: "Peak Hour", value: "12 - 1 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Table 5", method: "M-Pesa", amount: "KES 2,850", status: "completed", reference: "QK7..89F", time: "11:32 AM" },
    { id: "TXN-002", customer: "Takeaway - John", method: "Cash", amount: "KES 1,300", status: "completed", reference: "-", time: "11:20 AM" },
    { id: "TXN-003", customer: "Table 12", method: "M-Pesa", amount: "KES 4,500", status: "pending", reference: "RL3..12D", time: "11:10 AM" },
    { id: "TXN-004", customer: "Table 3", method: "Card", amount: "KES 1,950", status: "completed", reference: "****8821", time: "10:50 AM" },
    { id: "TXN-005", customer: "Delivery - Anne", method: "M-Pesa", amount: "KES 1,200", status: "completed", reference: "NK8..34G", time: "10:30 AM" },
    { id: "TXN-006", customer: "Table 8", method: "Cash", amount: "KES 3,400", status: "completed", reference: "-", time: "10:15 AM" },
    { id: "TXN-007", customer: "Table 1", method: "M-Pesa", amount: "KES 5,200", status: "completed", reference: "TM2..98H", time: "10:00 AM" },
    { id: "TXN-008", customer: "Takeaway - Peter", method: "Cash", amount: "KES 750", status: "completed", reference: "-", time: "9:45 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 67,400", change: "+15.2%", trend: "up" },
    { title: "M-Pesa", value: "KES 42,100", change: "62.5%", trend: "up" },
    { title: "Cash", value: "KES 20,800", change: "30.9%", trend: "neutral" },
    { title: "Card", value: "KES 4,500", change: "6.6%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Breakdown of orders by table, takeaway, delivery", lastGenerated: "Today, 9:00 AM" },
    { id: "menu-performance", name: "Menu Performance", description: "Best and worst selling menu items", lastGenerated: "Today, 8:30 AM" },
    { id: "food-cost", name: "Food Cost Report", description: "Cost of goods vs revenue by category", lastGenerated: "Feb 23, 2026" },
    { id: "waste", name: "Food Waste Report", description: "Wastage tracking and reduction insights", lastGenerated: "Feb 22, 2026" },
    { id: "revenue", name: "Revenue Summary", description: "Revenue trends, peak hours, and periods", lastGenerated: "Feb 20, 2026" },
    { id: "customer", name: "Customer Traffic Report", description: "Dine-in vs takeaway vs delivery patterns", lastGenerated: "Feb 21, 2026" },
  ],
}

// ─── PHARMACY / HEALTH ─────────────────────────────────────────────────
const pharmacy: BusinessCategoryData = {
  label: "Pharmacy / Health",
  productCategories: ["Painkillers", "Antibiotics", "Vitamins", "First Aid", "Supplements", "Personal Care"],
  products: [
    { id: "p1", name: "Panadol Extra (10s)", price: 150, wholesalePrice: 120, wholesaleMinQty: 50, wholesaleUnit: "Box (50 strips)", category: "Painkillers", stock: 200, sku: "PK-001", variant: "Strip of 10", cost: 95 },
    { id: "p2", name: "Amoxicillin 500mg", price: 350, wholesalePrice: 280, wholesaleMinQty: 30, wholesaleUnit: "Box (30 packs)", category: "Antibiotics", stock: 80, sku: "AB-001", variant: "Pack of 21", cost: 220 },
    { id: "p3", name: "Vitamin C 1000mg", price: 450, wholesalePrice: 380, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Vitamins", stock: 60, sku: "VT-001", variant: "Bottle (30 tabs)", cost: 300 },
    { id: "p4", name: "Bandage Roll 5cm", price: 120, wholesalePrice: 95, wholesaleMinQty: 50, wholesaleUnit: "Box (50 rolls)", category: "First Aid", stock: 150, sku: "FA-001", variant: "5cm x 4m", cost: 70 },
    { id: "p5", name: "Cough Syrup 100ml", price: 280, wholesalePrice: 230, wholesaleMinQty: 24, wholesaleUnit: "Box (24)", category: "Painkillers", stock: 45, sku: "PK-002", variant: "100ml bottle", cost: 180 },
    { id: "p6", name: "Cetrizine 10mg", price: 80, wholesalePrice: 60, wholesaleMinQty: 100, wholesaleUnit: "Box (100 strips)", category: "Painkillers", stock: 300, sku: "PK-003", variant: "Strip of 10", cost: 40 },
    { id: "p7", name: "Multivitamins (60)", price: 650, wholesalePrice: 540, wholesaleMinQty: 12, wholesaleUnit: "Carton (12)", category: "Supplements", stock: 35, sku: "SP-001", variant: "Bottle (60 caps)", cost: 420 },
    { id: "p8", name: "Antiseptic Cream 25g", price: 180, wholesalePrice: 150, wholesaleMinQty: 36, wholesaleUnit: "Box (36)", category: "First Aid", stock: 90, sku: "FA-002", variant: "25g tube", cost: 110 },
    { id: "p9", name: "Ibuprofen 400mg", price: 120, wholesalePrice: 95, wholesaleMinQty: 50, wholesaleUnit: "Box (50 strips)", category: "Painkillers", stock: 180, sku: "PK-004", variant: "Strip of 10", cost: 65 },
    { id: "p10", name: "Omega-3 Fish Oil", price: 850, wholesalePrice: 720, wholesaleMinQty: 12, wholesaleUnit: "Carton (12)", category: "Supplements", stock: 28, sku: "SP-002", variant: "Bottle (60)", cost: 560 },
    { id: "p11", name: "Cotton Wool 100g", price: 95, wholesalePrice: 75, wholesaleMinQty: 48, wholesaleUnit: "Bale (48)", category: "First Aid", stock: 120, sku: "FA-003", variant: "100g", cost: 55 },
    { id: "p12", name: "Hand Sanitizer 500ml", price: 320, wholesalePrice: 260, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Personal Care", stock: 65, sku: "PC-001", variant: "500ml", cost: 190 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 52,800", change: "+9.8%", changeType: "positive" },
    { title: "Prescriptions", value: "87", change: "+6.4%", changeType: "positive" },
    { title: "Total Products", value: "2,340", change: "+12 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 1.4M", change: "+14.7%", changeType: "positive" },
    { title: "Expiring Soon", value: "15", change: "Within 30 days", changeType: "negative" },
    { title: "Active Patients", value: "634", change: "+3.8%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 48200 }, { day: "Tue", sales: 44100 }, { day: "Wed", sales: 52800 },
    { day: "Thu", sales: 46300 }, { day: "Fri", sales: 55200 }, { day: "Sat", sales: 61400 }, { day: "Sun", sales: 35700 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 980000 }, { month: "Feb", revenue: 1080000 }, { month: "Mar", revenue: 1200000 },
    { month: "Apr", revenue: 1050000 }, { month: "May", revenue: 1320000 }, { month: "Jun", revenue: 1400000 },
  ],
  recentSales: [
    { id: "RX-001", customer: "Alice Nyambura", items: 3, amount: "KES 1,580", status: "completed", time: "5 min ago" },
    { id: "RX-002", customer: "John Mwangi", items: 1, amount: "KES 350", status: "completed", time: "18 min ago" },
    { id: "RX-003", customer: "Grace Atieno", items: 4, amount: "KES 2,200", status: "completed", time: "25 min ago" },
    { id: "RX-004", customer: "Michael Odhiambo", items: 2, amount: "KES 930", status: "pending", time: "40 min ago" },
    { id: "RX-005", customer: "Esther Wambui", items: 1, amount: "KES 650", status: "completed", time: "1 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 45800, orders: 92 }, { date: "Feb 19", sales: 42100, orders: 85 },
    { date: "Feb 20", sales: 56200, orders: 112 }, { date: "Feb 21", sales: 49400, orders: 98 },
    { date: "Feb 22", sales: 58700, orders: 118 }, { date: "Feb 23", sales: 54200, orders: 108 },
    { date: "Feb 24", sales: 52800, orders: 87 },
  ],
  categoryBreakdown: [
    { name: "Painkillers", value: 28 }, { name: "Antibiotics", value: 22 }, { name: "Vitamins", value: 20 },
    { name: "First Aid", value: 18 }, { name: "Supplements", value: 12 },
  ],
  topProducts: [
    { name: "Panadol Extra", units: 320 }, { name: "Amoxicillin", units: 145 },
    { name: "Cough Syrup", units: 128 }, { name: "Cetrizine", units: 210 }, { name: "Vitamin C", units: 95 },
  ],
  hourlySales: makeHourly([2100, 6800, 8500, 7200, 9100, 8800, 7200, 3100]),
  analyticsSummary: [
    { label: "Avg. Prescription", value: "KES 580" }, { label: "Repeat Customers", value: "62.3%" },
    { label: "Expired Write-offs", value: "1.2%" }, { label: "Peak Hour", value: "2 - 3 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Alice Nyambura", method: "M-Pesa", amount: "KES 1,580", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "John Mwangi", method: "Cash", amount: "KES 350", status: "completed", reference: "-", time: "10:14 AM" },
    { id: "TXN-003", customer: "Grace Atieno", method: "M-Pesa", amount: "KES 2,200", status: "completed", reference: "RL3..12D", time: "10:07 AM" },
    { id: "TXN-004", customer: "Michael Odhiambo", method: "Cash", amount: "KES 930", status: "pending", reference: "-", time: "9:52 AM" },
    { id: "TXN-005", customer: "Esther Wambui", method: "M-Pesa", amount: "KES 650", status: "completed", reference: "NK8..34G", time: "9:40 AM" },
    { id: "TXN-006", customer: "Robert Kiprotich", method: "Card", amount: "KES 1,800", status: "completed", reference: "****3321", time: "9:25 AM" },
    { id: "TXN-007", customer: "Lucy Chebet", method: "M-Pesa", amount: "KES 480", status: "completed", reference: "TM2..98H", time: "9:10 AM" },
    { id: "TXN-008", customer: "Samuel Njoroge", method: "Cash", amount: "KES 750", status: "completed", reference: "-", time: "8:55 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 52,800", change: "+9.8%", trend: "up" },
    { title: "M-Pesa", value: "KES 35,200", change: "66.7%", trend: "up" },
    { title: "Cash", value: "KES 12,400", change: "23.5%", trend: "neutral" },
    { title: "Card", value: "KES 5,200", change: "9.8%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Dispensing Report", description: "Medicines dispensed with batch and expiry details", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Stock & Expiry Report", description: "Current stock, expiring items, and reorder levels", lastGenerated: "Today, 8:30 AM" },
    { id: "revenue", name: "Revenue Summary", description: "Revenue by medicine category and period", lastGenerated: "Feb 23, 2026" },
    { id: "prescription", name: "Prescription Log", description: "Record of all prescriptions filled", lastGenerated: "Feb 22, 2026" },
    { id: "controlled", name: "Controlled Substances", description: "Tracking of controlled medication dispensing", lastGenerated: "Feb 20, 2026" },
    { id: "supplier", name: "Supplier Report", description: "Supplier orders, lead times, and costs", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── ELECTRONICS ───────────────────────────────────────────────────────
const electronics: BusinessCategoryData = {
  label: "Electronics & Tech",
  productCategories: ["Phones", "Computers", "Accessories", "Components", "Audio", "Networking"],
  products: [
    { id: "e1", name: "Samsung Galaxy A15", price: 18500, wholesalePrice: 16200, wholesaleMinQty: 5, wholesaleUnit: "5 Units", category: "Phones", stock: 12, sku: "PH-001", variant: "128GB", cost: 15000 },
    { id: "e2", name: "iPhone 15 Case", price: 1200, wholesalePrice: 800, wholesaleMinQty: 20, wholesaleUnit: "Box (20)", category: "Accessories", stock: 80, sku: "AC-001", variant: "Clear", cost: 500 },
    { id: "e3", name: "USB-C Cable 1m", price: 350, wholesalePrice: 220, wholesaleMinQty: 50, wholesaleUnit: "Box (50)", category: "Accessories", stock: 150, sku: "AC-002", variant: "1m", cost: 150 },
    { id: "e4", name: "HP Laptop 15-dy", price: 65000, wholesalePrice: 58000, wholesaleMinQty: 3, wholesaleUnit: "3 Units", category: "Computers", stock: 5, sku: "CP-001", variant: "8GB/512GB", cost: 52000 },
    { id: "e5", name: "Wireless Earbuds", price: 2500, wholesalePrice: 1800, wholesaleMinQty: 20, wholesaleUnit: "Box (20)", category: "Audio", stock: 45, sku: "AU-001", variant: "Black", cost: 1200 },
    { id: "e6", name: "Screen Protector", price: 500, wholesalePrice: 280, wholesaleMinQty: 50, wholesaleUnit: "Pack (50)", category: "Accessories", stock: 200, sku: "AC-003", variant: "Universal", cost: 150 },
    { id: "e7", name: "Power Bank 10000mAh", price: 2800, wholesalePrice: 2200, wholesaleMinQty: 15, wholesaleUnit: "Box (15)", category: "Accessories", stock: 35, sku: "AC-004", variant: "10000mAh", cost: 1800 },
    { id: "e8", name: "TP-Link Router", price: 4500, wholesalePrice: 3800, wholesaleMinQty: 10, wholesaleUnit: "Box (10)", category: "Networking", stock: 18, sku: "NW-001", variant: "AC1200", cost: 3200 },
    { id: "e9", name: "Keyboard (Wireless)", price: 3200, wholesalePrice: 2600, wholesaleMinQty: 10, wholesaleUnit: "Box (10)", category: "Components", stock: 22, sku: "CM-001", variant: "Wireless", cost: 2100 },
    { id: "e10", name: "Tecno Spark 20", price: 14500, wholesalePrice: 12800, wholesaleMinQty: 5, wholesaleUnit: "5 Units", category: "Phones", stock: 15, sku: "PH-002", variant: "64GB", cost: 11000 },
    { id: "e11", name: "HDMI Cable 2m", price: 650, wholesalePrice: 450, wholesaleMinQty: 30, wholesaleUnit: "Box (30)", category: "Accessories", stock: 60, sku: "AC-005", variant: "2m", cost: 300 },
    { id: "e12", name: "Bluetooth Speaker", price: 3800, wholesalePrice: 3000, wholesaleMinQty: 12, wholesaleUnit: "Carton (12)", category: "Audio", stock: 20, sku: "AU-002", variant: "Portable", cost: 2400 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 185,200", change: "+18.4%", changeType: "positive" },
    { title: "Units Sold", value: "42", change: "+10.5%", changeType: "positive" },
    { title: "Total Products", value: "856", change: "+8 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 4.2M", change: "+25.1%", changeType: "positive" },
    { title: "Low Stock Items", value: "12", change: "Needs reorder", changeType: "negative" },
    { title: "Warranty Claims", value: "3", change: "This week", changeType: "neutral" },
  ],
  weeklySales: [
    { day: "Mon", sales: 142000 }, { day: "Tue", sales: 168000 }, { day: "Wed", sales: 125000 },
    { day: "Thu", sales: 195000 }, { day: "Fri", sales: 220000 }, { day: "Sat", sales: 285000 }, { day: "Sun", sales: 185200 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 3200000 }, { month: "Feb", revenue: 3600000 }, { month: "Mar", revenue: 4100000 },
    { month: "Apr", revenue: 3500000 }, { month: "May", revenue: 4500000 }, { month: "Jun", revenue: 4200000 },
  ],
  recentSales: [
    { id: "EL-001", customer: "Kevin Omondi", items: 1, amount: "KES 18,500", status: "completed", time: "10 min ago" },
    { id: "EL-002", customer: "Faith Wangari", items: 3, amount: "KES 4,050", status: "completed", time: "25 min ago" },
    { id: "EL-003", customer: "Dennis Maina", items: 1, amount: "KES 65,000", status: "pending", time: "45 min ago" },
    { id: "EL-004", customer: "Mercy Njoki", items: 2, amount: "KES 5,300", status: "completed", time: "1 hr ago" },
    { id: "EL-005", customer: "George Kipchoge", items: 1, amount: "KES 14,500", status: "completed", time: "1 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 156000, orders: 38 }, { date: "Feb 19", sales: 142000, orders: 32 },
    { date: "Feb 20", sales: 198000, orders: 45 }, { date: "Feb 21", sales: 175000, orders: 40 },
    { date: "Feb 22", sales: 225000, orders: 52 }, { date: "Feb 23", sales: 210000, orders: 48 },
    { date: "Feb 24", sales: 185200, orders: 42 },
  ],
  categoryBreakdown: [
    { name: "Phones", value: 45 }, { name: "Accessories", value: 25 }, { name: "Computers", value: 15 },
    { name: "Audio", value: 10 }, { name: "Other", value: 5 },
  ],
  topProducts: [
    { name: "Samsung Galaxy A15", units: 28 }, { name: "USB-C Cable", units: 85 },
    { name: "Screen Protector", units: 120 }, { name: "Tecno Spark 20", units: 22 }, { name: "Wireless Earbuds", units: 35 },
  ],
  hourlySales: makeHourly([2400, 12000, 28000, 22000, 35000, 42000, 32000, 12800]),
  analyticsSummary: [
    { label: "Avg. Order Value", value: "KES 4,410" }, { label: "Warranty Rate", value: "2.4%" },
    { label: "Returns", value: "1.8%" }, { label: "Peak Hour", value: "4 - 5 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Kevin Omondi", method: "M-Pesa", amount: "KES 18,500", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "Faith Wangari", method: "Cash", amount: "KES 4,050", status: "completed", reference: "-", time: "10:07 AM" },
    { id: "TXN-003", customer: "Dennis Maina", method: "Card", amount: "KES 65,000", status: "pending", reference: "****6612", time: "9:45 AM" },
    { id: "TXN-004", customer: "Mercy Njoki", method: "M-Pesa", amount: "KES 5,300", status: "completed", reference: "RL3..12D", time: "9:30 AM" },
    { id: "TXN-005", customer: "George Kipchoge", method: "M-Pesa", amount: "KES 14,500", status: "completed", reference: "NK8..34G", time: "9:15 AM" },
    { id: "TXN-006", customer: "Ann Achieng", method: "Cash", amount: "KES 3,200", status: "completed", reference: "-", time: "9:00 AM" },
    { id: "TXN-007", customer: "Brian Mutua", method: "Card", amount: "KES 68,500", status: "completed", reference: "****2248", time: "8:45 AM" },
    { id: "TXN-008", customer: "Caroline Wanjiru", method: "M-Pesa", amount: "KES 2,500", status: "completed", reference: "WP5..67J", time: "8:30 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 185,200", change: "+18.4%", trend: "up" },
    { title: "M-Pesa", value: "KES 85,400", change: "46.1%", trend: "up" },
    { title: "Cash", value: "KES 42,300", change: "22.8%", trend: "neutral" },
    { title: "Card", value: "KES 57,500", change: "31.1%", trend: "up" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Units sold by category with serial numbers", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Stock Report", description: "Current stock with reorder levels and supplier info", lastGenerated: "Today, 8:30 AM" },
    { id: "warranty", name: "Warranty Tracker", description: "Active warranties, claims, and expiry dates", lastGenerated: "Feb 23, 2026" },
    { id: "profit", name: "Profit Analysis", description: "Margins by product category and brand", lastGenerated: "Feb 22, 2026" },
    { id: "supplier", name: "Supplier Performance", description: "Delivery times, pricing, and quality metrics", lastGenerated: "Feb 20, 2026" },
    { id: "trending", name: "Trending Products", description: "Market demand and fast-moving stock analysis", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── FASHION ───────────────────────────────────────────────────────────
const fashion: BusinessCategoryData = {
  label: "Fashion & Apparel",
  productCategories: ["Men's Wear", "Women's Wear", "Kids Wear", "Shoes", "Bags", "Accessories"],
  products: [
    { id: "fa1", name: "Men's Casual Shirt", price: 1800, wholesalePrice: 1200, wholesaleMinQty: 12, wholesaleUnit: "Dozen (12)", category: "Men's Wear", stock: 45, sku: "MW-001", variant: "L / Blue", cost: 900 },
    { id: "fa2", name: "Women's Maxi Dress", price: 2500, wholesalePrice: 1800, wholesaleMinQty: 10, wholesaleUnit: "Pack (10)", category: "Women's Wear", stock: 30, sku: "WW-001", variant: "M / Floral", cost: 1400 },
    { id: "fa3", name: "Kids School Uniform", price: 1200, wholesalePrice: 850, wholesaleMinQty: 20, wholesaleUnit: "Pack (20)", category: "Kids Wear", stock: 60, sku: "KW-001", variant: "Size 30", cost: 600 },
    { id: "fa4", name: "Men's Canvas Shoes", price: 3500, wholesalePrice: 2800, wholesaleMinQty: 6, wholesaleUnit: "Half-dozen (6)", category: "Shoes", stock: 24, sku: "SH-001", variant: "42 / White", cost: 2200 },
    { id: "fa5", name: "Ladies Handbag", price: 2800, wholesalePrice: 2100, wholesaleMinQty: 10, wholesaleUnit: "Pack (10)", category: "Bags", stock: 18, sku: "BG-001", variant: "Brown", cost: 1500 },
    { id: "fa6", name: "Fashion Sunglasses", price: 800, wholesalePrice: 500, wholesaleMinQty: 24, wholesaleUnit: "Box (24)", category: "Accessories", stock: 96, sku: "AC-001", variant: "Unisex", cost: 300 },
    { id: "fa7", name: "Women's Blouse", price: 1500, wholesalePrice: 1050, wholesaleMinQty: 12, wholesaleUnit: "Dozen (12)", category: "Women's Wear", stock: 36, sku: "WW-002", variant: "S / White", cost: 750 },
    { id: "fa8", name: "Men's Jeans", price: 2200, wholesalePrice: 1600, wholesaleMinQty: 10, wholesaleUnit: "Pack (10)", category: "Men's Wear", stock: 40, sku: "MW-002", variant: "32 / Blue", cost: 1100 },
    { id: "fa9", name: "Kids T-Shirt", price: 600, wholesalePrice: 400, wholesaleMinQty: 24, wholesaleUnit: "Box (24)", category: "Kids Wear", stock: 72, sku: "KW-002", variant: "8yr / Multi", cost: 250 },
    { id: "fa10", name: "Belt (Leather)", price: 950, wholesalePrice: 650, wholesaleMinQty: 20, wholesaleUnit: "Pack (20)", category: "Accessories", stock: 50, sku: "AC-002", variant: "Black", cost: 400 },
    { id: "fa11", name: "Ladies Sandals", price: 1800, wholesalePrice: 1300, wholesaleMinQty: 12, wholesaleUnit: "Dozen (12)", category: "Shoes", stock: 28, sku: "SH-002", variant: "38 / Tan", cost: 900 },
    { id: "fa12", name: "Backpack (School)", price: 1500, wholesalePrice: 1100, wholesaleMinQty: 15, wholesaleUnit: "Pack (15)", category: "Bags", stock: 35, sku: "BG-002", variant: "Large", cost: 750 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 78,500", change: "+14.2%", changeType: "positive" },
    { title: "Items Sold", value: "95", change: "+12.7%", changeType: "positive" },
    { title: "Total Products", value: "1,560", change: "+15 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 2.1M", change: "+20.8%", changeType: "positive" },
    { title: "Low Stock Items", value: "18", change: "Needs restock", changeType: "negative" },
    { title: "Active Customers", value: "456", change: "+7.2%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 52000 }, { day: "Tue", sales: 48000 }, { day: "Wed", sales: 61000 },
    { day: "Thu", sales: 58000 }, { day: "Fri", sales: 82000 }, { day: "Sat", sales: 105000 }, { day: "Sun", sales: 78500 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 1500000 }, { month: "Feb", revenue: 1680000 }, { month: "Mar", revenue: 1920000 },
    { month: "Apr", revenue: 1650000 }, { month: "May", revenue: 2050000 }, { month: "Jun", revenue: 2100000 },
  ],
  recentSales: [
    { id: "FSH-001", customer: "Diana Mumbi", items: 3, amount: "KES 6,100", status: "completed", time: "8 min ago" },
    { id: "FSH-002", customer: "Brian Otieno", items: 1, amount: "KES 3,500", status: "completed", time: "22 min ago" },
    { id: "FSH-003", customer: "Cynthia Wanjiku", items: 4, amount: "KES 8,200", status: "pending", time: "40 min ago" },
    { id: "FSH-004", customer: "Patrick Kimani", items: 2, amount: "KES 4,000", status: "completed", time: "1 hr ago" },
    { id: "FSH-005", customer: "Lydia Chebet", items: 5, amount: "KES 7,800", status: "completed", time: "1 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 62000, orders: 72 }, { date: "Feb 19", sales: 55000, orders: 65 },
    { date: "Feb 20", sales: 78000, orders: 92 }, { date: "Feb 21", sales: 71000, orders: 84 },
    { date: "Feb 22", sales: 95000, orders: 112 }, { date: "Feb 23", sales: 88000, orders: 105 },
    { date: "Feb 24", sales: 78500, orders: 95 },
  ],
  categoryBreakdown: [
    { name: "Women's Wear", value: 32 }, { name: "Men's Wear", value: 28 }, { name: "Shoes", value: 18 },
    { name: "Kids Wear", value: 12 }, { name: "Accessories", value: 10 },
  ],
  topProducts: [
    { name: "Men's Casual Shirt", units: 85 }, { name: "Women's Maxi Dress", units: 62 },
    { name: "Kids School Uniform", units: 95 }, { name: "Fashion Sunglasses", units: 120 }, { name: "Men's Jeans", units: 72 },
  ],
  hourlySales: makeHourly([1800, 5200, 9800, 12400, 8600, 14200, 18500, 8000]),
  analyticsSummary: [
    { label: "Avg. Order Value", value: "KES 826" }, { label: "Return Rate", value: "5.2%" },
    { label: "Top Size", value: "Medium" }, { label: "Peak Hour", value: "6 - 7 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Diana Mumbi", method: "M-Pesa", amount: "KES 6,100", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "Brian Otieno", method: "Cash", amount: "KES 3,500", status: "completed", reference: "-", time: "10:10 AM" },
    { id: "TXN-003", customer: "Cynthia Wanjiku", method: "M-Pesa", amount: "KES 8,200", status: "pending", reference: "RL3..12D", time: "9:52 AM" },
    { id: "TXN-004", customer: "Patrick Kimani", method: "Card", amount: "KES 4,000", status: "completed", reference: "****5521", time: "9:30 AM" },
    { id: "TXN-005", customer: "Lydia Chebet", method: "M-Pesa", amount: "KES 7,800", status: "completed", reference: "NK8..34G", time: "9:15 AM" },
    { id: "TXN-006", customer: "Victor Wanyama", method: "Cash", amount: "KES 2,200", status: "completed", reference: "-", time: "9:00 AM" },
    { id: "TXN-007", customer: "Nancy Auma", method: "M-Pesa", amount: "KES 5,600", status: "completed", reference: "TM2..98H", time: "8:45 AM" },
    { id: "TXN-008", customer: "Tom Odinga", method: "Cash", amount: "KES 1,800", status: "completed", reference: "-", time: "8:30 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 78,500", change: "+14.2%", trend: "up" },
    { title: "M-Pesa", value: "KES 48,200", change: "61.4%", trend: "up" },
    { title: "Cash", value: "KES 22,100", change: "28.2%", trend: "neutral" },
    { title: "Card", value: "KES 8,200", change: "10.4%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Items sold by size, color, and category", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Inventory Report", description: "Stock by size/color variant with reorder alerts", lastGenerated: "Today, 8:30 AM" },
    { id: "seasonal", name: "Seasonal Trend Report", description: "Trending styles and seasonal demand forecast", lastGenerated: "Feb 23, 2026" },
    { id: "returns", name: "Returns & Exchanges", description: "Return reasons and exchange patterns", lastGenerated: "Feb 22, 2026" },
    { id: "profit", name: "Margin Analysis", description: "Profit margins by brand and category", lastGenerated: "Feb 20, 2026" },
    { id: "customer", name: "Customer Preferences", description: "Size distribution and style preferences", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── SERVICES ──────────────────────────────────────────────────────────
const services: BusinessCategoryData = {
  label: "Services",
  productCategories: ["Haircut", "Repair", "Laundry", "Consultation", "Cleaning", "Training"],
  products: [
    { id: "s1", name: "Men's Haircut", price: 300, wholesalePrice: 250, wholesaleMinQty: 10, wholesaleUnit: "10 Sessions", category: "Haircut", stock: 999, sku: "HC-001", variant: "Standard", cost: 50 },
    { id: "s2", name: "Women's Hair Styling", price: 1500, wholesalePrice: 1200, wholesaleMinQty: 5, wholesaleUnit: "5 Sessions", category: "Haircut", stock: 999, sku: "HC-002", variant: "Full Style", cost: 200 },
    { id: "s3", name: "Phone Screen Repair", price: 2500, wholesalePrice: 2000, wholesaleMinQty: 5, wholesaleUnit: "5 Jobs", category: "Repair", stock: 999, sku: "RP-001", variant: "Standard", cost: 1200 },
    { id: "s4", name: "Suit Dry Cleaning", price: 500, wholesalePrice: 400, wholesaleMinQty: 20, wholesaleUnit: "20 Pieces", category: "Laundry", stock: 999, sku: "LN-001", variant: "2-Piece", cost: 150 },
    { id: "s5", name: "Legal Consultation (1hr)", price: 5000, wholesalePrice: 4000, wholesaleMinQty: 3, wholesaleUnit: "3 Sessions", category: "Consultation", stock: 999, sku: "CN-001", variant: "1 Hour", cost: 500 },
    { id: "s6", name: "House Cleaning", price: 3000, wholesalePrice: 2500, wholesaleMinQty: 5, wholesaleUnit: "5 Sessions", category: "Cleaning", stock: 999, sku: "CL-001", variant: "3-Bedroom", cost: 800 },
    { id: "s7", name: "Laptop Repair", price: 3500, wholesalePrice: 3000, wholesaleMinQty: 3, wholesaleUnit: "3 Jobs", category: "Repair", stock: 999, sku: "RP-002", variant: "Diagnosis + Fix", cost: 1500 },
    { id: "s8", name: "Car Wash (Full)", price: 800, wholesalePrice: 650, wholesaleMinQty: 10, wholesaleUnit: "10 Washes", category: "Cleaning", stock: 999, sku: "CL-002", variant: "Interior + Exterior", cost: 200 },
    { id: "s9", name: "Computer Training", price: 2000, wholesalePrice: 1600, wholesaleMinQty: 5, wholesaleUnit: "5 Students", category: "Training", stock: 999, sku: "TR-001", variant: "Per Session", cost: 300 },
    { id: "s10", name: "Shirt Ironing", price: 100, wholesalePrice: 80, wholesaleMinQty: 50, wholesaleUnit: "50 Pieces", category: "Laundry", stock: 999, sku: "LN-002", variant: "Single", cost: 20 },
    { id: "s11", name: "Plumbing Service", price: 2500, wholesalePrice: 2000, wholesaleMinQty: 3, wholesaleUnit: "3 Jobs", category: "Repair", stock: 999, sku: "RP-003", variant: "Standard Job", cost: 800 },
    { id: "s12", name: "Tax Filing Assistance", price: 3000, wholesalePrice: 2500, wholesaleMinQty: 5, wholesaleUnit: "5 Filings", category: "Consultation", stock: 999, sku: "CN-002", variant: "Individual", cost: 500 },
  ],
  dashboardMetrics: [
    { title: "Revenue Today", value: "KES 42,600", change: "+10.8%", changeType: "positive" },
    { title: "Jobs Completed", value: "34", change: "+5.2%", changeType: "positive" },
    { title: "Services Offered", value: "48", change: "+2 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 980K", change: "+16.5%", changeType: "positive" },
    { title: "Pending Jobs", value: "8", change: "In queue", changeType: "negative" },
    { title: "Repeat Clients", value: "312", change: "+8.4%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 38200 }, { day: "Tue", sales: 42100 }, { day: "Wed", sales: 35700 },
    { day: "Thu", sales: 44600 }, { day: "Fri", sales: 52300 }, { day: "Sat", sales: 68500 }, { day: "Sun", sales: 42600 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 720000 }, { month: "Feb", revenue: 810000 }, { month: "Mar", revenue: 890000 },
    { month: "Apr", revenue: 780000 }, { month: "May", revenue: 940000 }, { month: "Jun", revenue: 980000 },
  ],
  recentSales: [
    { id: "JOB-001", customer: "James Kariuki", items: 1, amount: "KES 2,500", status: "completed", time: "15 min ago" },
    { id: "JOB-002", customer: "Susan Wambui", items: 1, amount: "KES 1,500", status: "completed", time: "30 min ago" },
    { id: "JOB-003", customer: "Robert Ochieng", items: 1, amount: "KES 5,000", status: "pending", time: "45 min ago" },
    { id: "JOB-004", customer: "Elizabeth Nyambura", items: 2, amount: "KES 600", status: "completed", time: "1 hr ago" },
    { id: "JOB-005", customer: "Charles Mwangi", items: 1, amount: "KES 3,000", status: "completed", time: "2 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 35200, orders: 28 }, { date: "Feb 19", sales: 38400, orders: 31 },
    { date: "Feb 20", sales: 42800, orders: 35 }, { date: "Feb 21", sales: 39600, orders: 32 },
    { date: "Feb 22", sales: 48200, orders: 39 }, { date: "Feb 23", sales: 55400, orders: 45 },
    { date: "Feb 24", sales: 42600, orders: 34 },
  ],
  categoryBreakdown: [
    { name: "Repair", value: 30 }, { name: "Haircut", value: 25 }, { name: "Laundry", value: 20 },
    { name: "Consultation", value: 15 }, { name: "Cleaning", value: 10 },
  ],
  topProducts: [
    { name: "Men's Haircut", units: 85 }, { name: "Phone Screen Repair", units: 22 },
    { name: "Suit Dry Cleaning", units: 45 }, { name: "Car Wash", units: 38 }, { name: "Shirt Ironing", units: 120 },
  ],
  hourlySales: makeHourly([1200, 5800, 8200, 6400, 7800, 9200, 3600, 400]),
  analyticsSummary: [
    { label: "Avg. Job Value", value: "KES 1,253" }, { label: "Repeat Rate", value: "68.5%" },
    { label: "Cancellations", value: "3.2%" }, { label: "Peak Hour", value: "4 - 5 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "James Kariuki", method: "M-Pesa", amount: "KES 2,500", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "Susan Wambui", method: "Cash", amount: "KES 1,500", status: "completed", reference: "-", time: "10:02 AM" },
    { id: "TXN-003", customer: "Robert Ochieng", method: "M-Pesa", amount: "KES 5,000", status: "pending", reference: "RL3..12D", time: "9:47 AM" },
    { id: "TXN-004", customer: "Elizabeth Nyambura", method: "Cash", amount: "KES 600", status: "completed", reference: "-", time: "9:30 AM" },
    { id: "TXN-005", customer: "Charles Mwangi", method: "M-Pesa", amount: "KES 3,000", status: "completed", reference: "NK8..34G", time: "8:30 AM" },
    { id: "TXN-006", customer: "Helen Achieng", method: "Cash", amount: "KES 800", status: "completed", reference: "-", time: "8:15 AM" },
    { id: "TXN-007", customer: "David Mutua", method: "M-Pesa", amount: "KES 3,500", status: "completed", reference: "TM2..98H", time: "8:00 AM" },
    { id: "TXN-008", customer: "Joyce Wanjiru", method: "Cash", amount: "KES 300", status: "completed", reference: "-", time: "7:45 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 42,600", change: "+10.8%", trend: "up" },
    { title: "M-Pesa", value: "KES 28,400", change: "66.7%", trend: "up" },
    { title: "Cash", value: "KES 14,200", change: "33.3%", trend: "neutral" },
    { title: "Card", value: "KES 0", change: "0%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-jobs", name: "Daily Jobs Report", description: "Completed and pending service jobs", lastGenerated: "Today, 9:00 AM" },
    { id: "revenue", name: "Revenue by Service", description: "Revenue breakdown by service type", lastGenerated: "Today, 8:30 AM" },
    { id: "staff", name: "Staff Performance", description: "Jobs completed per staff member", lastGenerated: "Feb 23, 2026" },
    { id: "customer", name: "Client Retention Report", description: "Repeat customer analysis and frequency", lastGenerated: "Feb 22, 2026" },
    { id: "scheduling", name: "Scheduling Report", description: "Appointment utilization and gaps", lastGenerated: "Feb 20, 2026" },
    { id: "expense", name: "Expense Report", description: "Materials and overhead costs per service", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── BEAUTY & COSMETICS ────────────────────────────────────────────────
const beauty: BusinessCategoryData = {
  label: "Beauty & Cosmetics",
  productCategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Nail Care", "Body Care"],
  products: [
    { id: "b1", name: "Nivea Body Lotion 400ml", price: 650, wholesalePrice: 520, wholesaleMinQty: 12, wholesaleUnit: "Carton (12)", category: "Body Care", stock: 48, sku: "BC-001", variant: "400ml", cost: 420 },
    { id: "b2", name: "MAC Lipstick", price: 2800, wholesalePrice: 2200, wholesaleMinQty: 6, wholesaleUnit: "Box (6)", category: "Makeup", stock: 24, sku: "MK-001", variant: "Ruby Woo", cost: 1800 },
    { id: "b3", name: "Dark & Lovely Relaxer", price: 450, wholesalePrice: 350, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Hair Care", stock: 60, sku: "HC-001", variant: "Regular", cost: 280 },
    { id: "b4", name: "Sunscreen SPF 50", price: 1200, wholesalePrice: 950, wholesaleMinQty: 12, wholesaleUnit: "Box (12)", category: "Skincare", stock: 36, sku: "SK-001", variant: "50ml", cost: 720 },
    { id: "b5", name: "Nail Polish Set", price: 800, wholesalePrice: 600, wholesaleMinQty: 20, wholesaleUnit: "Pack (20)", category: "Nail Care", stock: 40, sku: "NC-001", variant: "6 Colors", cost: 380 },
    { id: "b6", name: "Perfume (Designer)", price: 4500, wholesalePrice: 3600, wholesaleMinQty: 6, wholesaleUnit: "Box (6)", category: "Fragrances", stock: 15, sku: "FR-001", variant: "100ml", cost: 2800 },
    { id: "b7", name: "Foundation (Matte)", price: 1800, wholesalePrice: 1400, wholesaleMinQty: 10, wholesaleUnit: "Box (10)", category: "Makeup", stock: 30, sku: "MK-002", variant: "Medium", cost: 1100 },
    { id: "b8", name: "Shea Butter (Raw) 500g", price: 500, wholesalePrice: 380, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Body Care", stock: 72, sku: "BC-002", variant: "500g", cost: 250 },
    { id: "b9", name: "Hair Oil (Coconut)", price: 350, wholesalePrice: 260, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Hair Care", stock: 80, sku: "HC-002", variant: "200ml", cost: 180 },
    { id: "b10", name: "Face Wash (Gel)", price: 680, wholesalePrice: 520, wholesaleMinQty: 12, wholesaleUnit: "Box (12)", category: "Skincare", stock: 42, sku: "SK-002", variant: "150ml", cost: 380 },
    { id: "b11", name: "Mascara (Waterproof)", price: 1500, wholesalePrice: 1150, wholesaleMinQty: 12, wholesaleUnit: "Box (12)", category: "Makeup", stock: 28, sku: "MK-003", variant: "Black", cost: 850 },
    { id: "b12", name: "Body Mist 250ml", price: 900, wholesalePrice: 700, wholesaleMinQty: 12, wholesaleUnit: "Box (12)", category: "Fragrances", stock: 50, sku: "FR-002", variant: "250ml", cost: 480 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 56,200", change: "+11.3%", changeType: "positive" },
    { title: "Items Sold", value: "128", change: "+9.6%", changeType: "positive" },
    { title: "Total Products", value: "1,820", change: "+20 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 1.5M", change: "+19.4%", changeType: "positive" },
    { title: "Low Stock Items", value: "14", change: "Needs restock", changeType: "negative" },
    { title: "Loyal Customers", value: "385", change: "+6.8%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 42000 }, { day: "Tue", sales: 38500 }, { day: "Wed", sales: 48200 },
    { day: "Thu", sales: 52400 }, { day: "Fri", sales: 65800 }, { day: "Sat", sales: 78200 }, { day: "Sun", sales: 56200 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 1100000 }, { month: "Feb", revenue: 1250000 }, { month: "Mar", revenue: 1380000 },
    { month: "Apr", revenue: 1200000 }, { month: "May", revenue: 1450000 }, { month: "Jun", revenue: 1500000 },
  ],
  recentSales: [
    { id: "BT-001", customer: "Mercy Wanjiru", items: 4, amount: "KES 5,750", status: "completed", time: "5 min ago" },
    { id: "BT-002", customer: "Agnes Nyakio", items: 2, amount: "KES 2,100", status: "completed", time: "20 min ago" },
    { id: "BT-003", customer: "Winnie Auma", items: 6, amount: "KES 8,400", status: "pending", time: "35 min ago" },
    { id: "BT-004", customer: "Rose Muthoni", items: 1, amount: "KES 4,500", status: "completed", time: "50 min ago" },
    { id: "BT-005", customer: "Gloria Chebet", items: 3, amount: "KES 3,200", status: "completed", time: "1 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 48000, orders: 110 }, { date: "Feb 19", sales: 44200, orders: 98 },
    { date: "Feb 20", sales: 56800, orders: 128 }, { date: "Feb 21", sales: 52400, orders: 118 },
    { date: "Feb 22", sales: 68500, orders: 155 }, { date: "Feb 23", sales: 62200, orders: 142 },
    { date: "Feb 24", sales: 56200, orders: 128 },
  ],
  categoryBreakdown: [
    { name: "Skincare", value: 28 }, { name: "Makeup", value: 26 }, { name: "Hair Care", value: 20 },
    { name: "Body Care", value: 14 }, { name: "Fragrances", value: 12 },
  ],
  topProducts: [
    { name: "Nivea Body Lotion", units: 95 }, { name: "Dark & Lovely", units: 72 },
    { name: "MAC Lipstick", units: 38 }, { name: "Hair Oil", units: 88 }, { name: "Body Mist", units: 65 },
  ],
  hourlySales: makeHourly([1200, 4800, 8200, 9600, 7400, 11800, 9200, 4000]),
  analyticsSummary: [
    { label: "Avg. Basket Size", value: "KES 439" }, { label: "Repeat Buyers", value: "58.2%" },
    { label: "Returns", value: "1.5%" }, { label: "Peak Hour", value: "4 - 5 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Mercy Wanjiru", method: "M-Pesa", amount: "KES 5,750", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "Agnes Nyakio", method: "Cash", amount: "KES 2,100", status: "completed", reference: "-", time: "10:12 AM" },
    { id: "TXN-003", customer: "Winnie Auma", method: "M-Pesa", amount: "KES 8,400", status: "pending", reference: "RL3..12D", time: "9:57 AM" },
    { id: "TXN-004", customer: "Rose Muthoni", method: "Card", amount: "KES 4,500", status: "completed", reference: "****7721", time: "9:42 AM" },
    { id: "TXN-005", customer: "Gloria Chebet", method: "M-Pesa", amount: "KES 3,200", status: "completed", reference: "NK8..34G", time: "9:30 AM" },
    { id: "TXN-006", customer: "Janet Onyango", method: "Cash", amount: "KES 1,550", status: "completed", reference: "-", time: "9:15 AM" },
    { id: "TXN-007", customer: "Pauline Kamau", method: "M-Pesa", amount: "KES 6,200", status: "completed", reference: "TM2..98H", time: "9:00 AM" },
    { id: "TXN-008", customer: "Linda Njeri", method: "Cash", amount: "KES 900", status: "completed", reference: "-", time: "8:45 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 56,200", change: "+11.3%", trend: "up" },
    { title: "M-Pesa", value: "KES 36,800", change: "65.5%", trend: "up" },
    { title: "Cash", value: "KES 14,200", change: "25.3%", trend: "neutral" },
    { title: "Card", value: "KES 5,200", change: "9.2%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Product sales by brand and category", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Stock & Expiry Report", description: "Shelf-life tracking and reorder alerts", lastGenerated: "Today, 8:30 AM" },
    { id: "brand", name: "Brand Performance", description: "Sales by brand with margin analysis", lastGenerated: "Feb 23, 2026" },
    { id: "trending", name: "Trending Products", description: "Fast-moving and seasonal beauty trends", lastGenerated: "Feb 22, 2026" },
    { id: "customer", name: "Customer Preferences", description: "Purchase patterns by skin type and age", lastGenerated: "Feb 20, 2026" },
    { id: "promo", name: "Promotions Report", description: "Discount and promotion effectiveness", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── EDUCATION & STATIONERY ────────────────────────────────────────────
const education: BusinessCategoryData = {
  label: "Education & Stationery",
  productCategories: ["Books", "Writing", "Art Supplies", "School Bags", "Printing", "Office Supplies"],
  products: [
    { id: "ed1", name: "Exercise Book 96pg", price: 45, wholesalePrice: 35, wholesaleMinQty: 100, wholesaleUnit: "Box (100)", category: "Writing", stock: 500, sku: "WR-001", variant: "A4 Ruled", cost: 25 },
    { id: "ed2", name: "BIC Pen (Blue)", price: 25, wholesalePrice: 18, wholesaleMinQty: 50, wholesaleUnit: "Box (50)", category: "Writing", stock: 800, sku: "WR-002", variant: "Blue", cost: 12 },
    { id: "ed3", name: "KCPE Revision Book", price: 350, wholesalePrice: 280, wholesaleMinQty: 20, wholesaleUnit: "Pack (20)", category: "Books", stock: 120, sku: "BK-001", variant: "2026 Edition", cost: 200 },
    { id: "ed4", name: "Geometry Set", price: 250, wholesalePrice: 180, wholesaleMinQty: 24, wholesaleUnit: "Box (24)", category: "Art Supplies", stock: 60, sku: "AS-001", variant: "Full Set", cost: 120 },
    { id: "ed5", name: "School Bag (Large)", price: 1800, wholesalePrice: 1300, wholesaleMinQty: 10, wholesaleUnit: "Pack (10)", category: "School Bags", stock: 35, sku: "SB-001", variant: "Large", cost: 950 },
    { id: "ed6", name: "Color Pencils (24)", price: 180, wholesalePrice: 130, wholesaleMinQty: 24, wholesaleUnit: "Box (24 sets)", category: "Art Supplies", stock: 80, sku: "AS-002", variant: "24 Colors", cost: 90 },
    { id: "ed7", name: "A4 Printing Paper (Ream)", price: 550, wholesalePrice: 450, wholesaleMinQty: 10, wholesaleUnit: "Box (10 reams)", category: "Printing", stock: 40, sku: "PR-001", variant: "500 Sheets", cost: 380 },
    { id: "ed8", name: "Scientific Calculator", price: 1500, wholesalePrice: 1200, wholesaleMinQty: 10, wholesaleUnit: "Box (10)", category: "Office Supplies", stock: 25, sku: "OF-001", variant: "Casio fx-82", cost: 900 },
    { id: "ed9", name: "Stapler", price: 350, wholesalePrice: 260, wholesaleMinQty: 12, wholesaleUnit: "Box (12)", category: "Office Supplies", stock: 45, sku: "OF-002", variant: "Standard", cost: 180 },
    { id: "ed10", name: "Crayon Set (12)", price: 120, wholesalePrice: 85, wholesaleMinQty: 48, wholesaleUnit: "Carton (48)", category: "Art Supplies", stock: 96, sku: "AS-003", variant: "12 Colors", cost: 55 },
    { id: "ed11", name: "Novel - River Between", price: 400, wholesalePrice: 320, wholesaleMinQty: 20, wholesaleUnit: "Pack (20)", category: "Books", stock: 50, sku: "BK-002", variant: "Paperback", cost: 250 },
    { id: "ed12", name: "Manila Paper (10)", price: 150, wholesalePrice: 110, wholesaleMinQty: 20, wholesaleUnit: "Pack (20)", category: "Art Supplies", stock: 60, sku: "AS-004", variant: "Assorted", cost: 70 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 32,400", change: "+8.2%", changeType: "positive" },
    { title: "Items Sold", value: "342", change: "+15.1%", changeType: "positive" },
    { title: "Total Products", value: "1,120", change: "+5 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 820K", change: "+12.3%", changeType: "positive" },
    { title: "Low Stock Items", value: "10", change: "Needs reorder", changeType: "negative" },
    { title: "Active Students", value: "245", change: "+4.2%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 28500 }, { day: "Tue", sales: 32400 }, { day: "Wed", sales: 25800 },
    { day: "Thu", sales: 30200 }, { day: "Fri", sales: 35600 }, { day: "Sat", sales: 42100 }, { day: "Sun", sales: 18200 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 920000 }, { month: "Feb", revenue: 680000 }, { month: "Mar", revenue: 580000 },
    { month: "Apr", revenue: 620000 }, { month: "May", revenue: 750000 }, { month: "Jun", revenue: 820000 },
  ],
  recentSales: [
    { id: "EDU-001", customer: "Waweru Academy", items: 50, amount: "KES 2,250", status: "completed", time: "10 min ago" },
    { id: "EDU-002", customer: "Monica Wanjala", items: 8, amount: "KES 3,560", status: "completed", time: "25 min ago" },
    { id: "EDU-003", customer: "St. Mary's School", items: 100, amount: "KES 4,500", status: "pending", time: "40 min ago" },
    { id: "EDU-004", customer: "Daniel Kiptoo", items: 3, amount: "KES 2,150", status: "completed", time: "1 hr ago" },
    { id: "EDU-005", customer: "Bright Future Academy", items: 200, amount: "KES 9,000", status: "completed", time: "2 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 28500, orders: 45 }, { date: "Feb 19", sales: 32400, orders: 52 },
    { date: "Feb 20", sales: 25800, orders: 42 }, { date: "Feb 21", sales: 30200, orders: 48 },
    { date: "Feb 22", sales: 35600, orders: 55 }, { date: "Feb 23", sales: 42100, orders: 65 },
    { date: "Feb 24", sales: 32400, orders: 52 },
  ],
  categoryBreakdown: [
    { name: "Writing", value: 35 }, { name: "Books", value: 25 }, { name: "Art Supplies", value: 20 },
    { name: "Office", value: 12 }, { name: "School Bags", value: 8 },
  ],
  topProducts: [
    { name: "Exercise Book 96pg", units: 500 }, { name: "BIC Pen (Blue)", units: 420 },
    { name: "Color Pencils", units: 85 }, { name: "A4 Paper", units: 60 }, { name: "KCPE Revision", units: 45 },
  ],
  hourlySales: makeHourly([2800, 6200, 5400, 4800, 7200, 3600, 2000, 0]),
  analyticsSummary: [
    { label: "Avg. Order Value", value: "KES 95" }, { label: "School Orders", value: "32%" },
    { label: "Returns", value: "0.8%" }, { label: "Peak Hour", value: "8 - 9 AM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Waweru Academy", method: "M-Pesa", amount: "KES 2,250", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "Monica Wanjala", method: "Cash", amount: "KES 3,560", status: "completed", reference: "-", time: "10:07 AM" },
    { id: "TXN-003", customer: "St. Mary's School", method: "M-Pesa", amount: "KES 4,500", status: "pending", reference: "RL3..12D", time: "9:52 AM" },
    { id: "TXN-004", customer: "Daniel Kiptoo", method: "Cash", amount: "KES 2,150", status: "completed", reference: "-", time: "9:30 AM" },
    { id: "TXN-005", customer: "Bright Future Academy", method: "M-Pesa", amount: "KES 9,000", status: "completed", reference: "NK8..34G", time: "8:30 AM" },
    { id: "TXN-006", customer: "Lydia Chelimo", method: "Cash", amount: "KES 475", status: "completed", reference: "-", time: "8:15 AM" },
    { id: "TXN-007", customer: "Greenfield Primary", method: "M-Pesa", amount: "KES 12,500", status: "completed", reference: "TM2..98H", time: "8:00 AM" },
    { id: "TXN-008", customer: "Edwin Macharia", method: "Cash", amount: "KES 350", status: "completed", reference: "-", time: "7:45 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 32,400", change: "+8.2%", trend: "up" },
    { title: "M-Pesa", value: "KES 22,800", change: "70.4%", trend: "up" },
    { title: "Cash", value: "KES 9,600", change: "29.6%", trend: "neutral" },
    { title: "Card", value: "KES 0", change: "0%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Items sold by category and customer type", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Stock Level Report", description: "Current stock and reorder point alerts", lastGenerated: "Today, 8:30 AM" },
    { id: "seasonal", name: "Seasonal Demand", description: "Back-to-school and exam season projections", lastGenerated: "Feb 23, 2026" },
    { id: "school-orders", name: "School Orders", description: "Bulk orders from schools and institutions", lastGenerated: "Feb 22, 2026" },
    { id: "supplier", name: "Supplier Report", description: "Publisher and supplier order tracking", lastGenerated: "Feb 20, 2026" },
    { id: "revenue", name: "Revenue Summary", description: "Revenue trends by period and category", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── AUTOMOTIVE ────────────────────────────────────────────────────────
const automotive: BusinessCategoryData = {
  label: "Automotive",
  productCategories: ["Engine Parts", "Electrical", "Tires", "Fluids", "Body Parts", "Filters"],
  products: [
    { id: "au1", name: "Brake Pads (Front)", price: 3500, wholesalePrice: 2800, wholesaleMinQty: 10, wholesaleUnit: "Set (10 pairs)", category: "Engine Parts", stock: 24, sku: "EP-001", variant: "Toyota", cost: 2200 },
    { id: "au2", name: "Engine Oil 5W-30 4L", price: 2800, wholesalePrice: 2300, wholesaleMinQty: 12, wholesaleUnit: "Carton (12)", category: "Fluids", stock: 36, sku: "FL-001", variant: "4 Liters", cost: 1800 },
    { id: "au3", name: "Car Battery 60AH", price: 12000, wholesalePrice: 10200, wholesaleMinQty: 5, wholesaleUnit: "5 Units", category: "Electrical", stock: 10, sku: "EL-001", variant: "60AH", cost: 8500 },
    { id: "au4", name: "Tire 195/65R15", price: 6500, wholesalePrice: 5500, wholesaleMinQty: 4, wholesaleUnit: "Set (4)", category: "Tires", stock: 16, sku: "TR-001", variant: "195/65R15", cost: 4800 },
    { id: "au5", name: "Air Filter (Universal)", price: 800, wholesalePrice: 600, wholesaleMinQty: 20, wholesaleUnit: "Box (20)", category: "Filters", stock: 50, sku: "FI-001", variant: "Universal", cost: 400 },
    { id: "au6", name: "Headlight Bulb H4", price: 350, wholesalePrice: 250, wholesaleMinQty: 50, wholesaleUnit: "Box (50)", category: "Electrical", stock: 80, sku: "EL-002", variant: "H4 12V", cost: 150 },
    { id: "au7", name: "Coolant 1L (Green)", price: 450, wholesalePrice: 350, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Fluids", stock: 42, sku: "FL-002", variant: "1 Liter", cost: 250 },
    { id: "au8", name: "Side Mirror (Right)", price: 4500, wholesalePrice: 3800, wholesaleMinQty: 5, wholesaleUnit: "5 Units", category: "Body Parts", stock: 8, sku: "BP-001", variant: "Universal", cost: 3000 },
    { id: "au9", name: "Oil Filter", price: 500, wholesalePrice: 380, wholesaleMinQty: 24, wholesaleUnit: "Box (24)", category: "Filters", stock: 60, sku: "FI-002", variant: "Toyota/Honda", cost: 250 },
    { id: "au10", name: "Spark Plugs (Set of 4)", price: 1200, wholesalePrice: 950, wholesaleMinQty: 10, wholesaleUnit: "Box (10 sets)", category: "Engine Parts", stock: 30, sku: "EP-002", variant: "Iridium", cost: 700 },
    { id: "au11", name: "Wiper Blades (Pair)", price: 650, wholesalePrice: 480, wholesaleMinQty: 20, wholesaleUnit: "Pack (20 pairs)", category: "Body Parts", stock: 40, sku: "BP-002", variant: "20-inch", cost: 320 },
    { id: "au12", name: "Brake Fluid 500ml", price: 380, wholesalePrice: 300, wholesaleMinQty: 24, wholesaleUnit: "Carton (24)", category: "Fluids", stock: 48, sku: "FL-003", variant: "DOT 4", cost: 200 },
  ],
  dashboardMetrics: [
    { title: "Sales Today", value: "KES 128,500", change: "+16.7%", changeType: "positive" },
    { title: "Parts Sold", value: "68", change: "+12.3%", changeType: "positive" },
    { title: "Total Products", value: "2,450", change: "+18 new", changeType: "neutral" },
    { title: "Revenue (MTD)", value: "KES 3.2M", change: "+21.4%", changeType: "positive" },
    { title: "Low Stock Items", value: "16", change: "Needs reorder", changeType: "negative" },
    { title: "Active Mechanics", value: "45", change: "+4.6%", changeType: "positive" },
  ],
  weeklySales: [
    { day: "Mon", sales: 95000 }, { day: "Tue", sales: 108000 }, { day: "Wed", sales: 88000 },
    { day: "Thu", sales: 115000 }, { day: "Fri", sales: 132000 }, { day: "Sat", sales: 165000 }, { day: "Sun", sales: 78000 },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 2400000 }, { month: "Feb", revenue: 2700000 }, { month: "Mar", revenue: 3000000 },
    { month: "Apr", revenue: 2600000 }, { month: "May", revenue: 3100000 }, { month: "Jun", revenue: 3200000 },
  ],
  recentSales: [
    { id: "AUT-001", customer: "Kamau Motors", items: 4, amount: "KES 26,000", status: "completed", time: "10 min ago" },
    { id: "AUT-002", customer: "John Ndung'u", items: 2, amount: "KES 5,600", status: "completed", time: "30 min ago" },
    { id: "AUT-003", customer: "City Garage Ltd", items: 10, amount: "KES 45,000", status: "pending", time: "45 min ago" },
    { id: "AUT-004", customer: "Peter Mwende", items: 1, amount: "KES 12,000", status: "completed", time: "1 hr ago" },
    { id: "AUT-005", customer: "Quick Fix Autos", items: 6, amount: "KES 18,500", status: "completed", time: "2 hr ago" },
  ],
  dailySales: [
    { date: "Feb 18", sales: 105000, orders: 52 }, { date: "Feb 19", sales: 98000, orders: 48 },
    { date: "Feb 20", sales: 128000, orders: 65 }, { date: "Feb 21", sales: 115000, orders: 58 },
    { date: "Feb 22", sales: 142000, orders: 72 }, { date: "Feb 23", sales: 135000, orders: 68 },
    { date: "Feb 24", sales: 128500, orders: 68 },
  ],
  categoryBreakdown: [
    { name: "Engine Parts", value: 30 }, { name: "Fluids", value: 22 }, { name: "Electrical", value: 18 },
    { name: "Tires", value: 16 }, { name: "Filters", value: 14 },
  ],
  topProducts: [
    { name: "Engine Oil 5W-30", units: 85 }, { name: "Brake Pads", units: 42 },
    { name: "Air Filter", units: 65 }, { name: "Oil Filter", units: 72 }, { name: "Headlight Bulb", units: 95 },
  ],
  hourlySales: makeHourly([5200, 18000, 22000, 15000, 24000, 28000, 12000, 4300]),
  analyticsSummary: [
    { label: "Avg. Order Value", value: "KES 1,890" }, { label: "Repeat Customers", value: "72.1%" },
    { label: "Returns", value: "3.5%" }, { label: "Peak Hour", value: "4 - 5 PM" },
  ],
  transactions: [
    { id: "TXN-001", customer: "Kamau Motors", method: "M-Pesa", amount: "KES 26,000", status: "completed", reference: "QK7..89F", time: "10:32 AM" },
    { id: "TXN-002", customer: "John Ndung'u", method: "Cash", amount: "KES 5,600", status: "completed", reference: "-", time: "10:02 AM" },
    { id: "TXN-003", customer: "City Garage Ltd", method: "M-Pesa", amount: "KES 45,000", status: "pending", reference: "RL3..12D", time: "9:47 AM" },
    { id: "TXN-004", customer: "Peter Mwende", method: "Card", amount: "KES 12,000", status: "completed", reference: "****9912", time: "9:30 AM" },
    { id: "TXN-005", customer: "Quick Fix Autos", method: "M-Pesa", amount: "KES 18,500", status: "completed", reference: "NK8..34G", time: "8:30 AM" },
    { id: "TXN-006", customer: "Bernard Wekesa", method: "Cash", amount: "KES 3,800", status: "completed", reference: "-", time: "8:15 AM" },
    { id: "TXN-007", customer: "Auto World Ltd", method: "M-Pesa", amount: "KES 52,000", status: "completed", reference: "TM2..98H", time: "8:00 AM" },
    { id: "TXN-008", customer: "Eric Otieno", method: "Cash", amount: "KES 1,200", status: "completed", reference: "-", time: "7:45 AM" },
  ],
  paymentSummary: [
    { title: "Total Payments Today", value: "KES 128,500", change: "+16.7%", trend: "up" },
    { title: "M-Pesa", value: "KES 82,400", change: "64.1%", trend: "up" },
    { title: "Cash", value: "KES 32,100", change: "25.0%", trend: "neutral" },
    { title: "Card", value: "KES 14,000", change: "10.9%", trend: "neutral" },
  ],
  reportTypes: [
    { id: "daily-sales", name: "Daily Sales Report", description: "Parts sold with vehicle compatibility data", lastGenerated: "Today, 9:00 AM" },
    { id: "inventory", name: "Parts Inventory", description: "Stock by vehicle make/model with reorder alerts", lastGenerated: "Today, 8:30 AM" },
    { id: "compatibility", name: "Vehicle Compatibility", description: "Cross-reference parts with vehicle models", lastGenerated: "Feb 23, 2026" },
    { id: "warranty", name: "Warranty Claims", description: "Defective parts and supplier warranty tracking", lastGenerated: "Feb 22, 2026" },
    { id: "supplier", name: "Supplier Performance", description: "Lead times, pricing, and quality by supplier", lastGenerated: "Feb 20, 2026" },
    { id: "service", name: "Service Jobs Report", description: "Garage service jobs linked to parts sold", lastGenerated: "Feb 18, 2026" },
  ],
}

// ─── CATEGORY MAP ──────────────────────────────────────────────────────
export const businessDataMap: Record<BusinessCategory, BusinessCategoryData> = {
  retail,
  food,
  pharmacy,
  electronics,
  fashion,
  services,
  beauty,
  education,
  automotive,
  other: { ...retail, label: "Other Business" },
}

export function getBusinessData(category: BusinessCategory): BusinessCategoryData {
  return businessDataMap[category] ?? retail
}
