"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  Download,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  variant: string
  price: number
  cost: number
  stock: number
}

const initialInventory: InventoryItem[] = [
  { id: "1", name: "Unga Jogoo 2kg", sku: "FL-001", category: "Flour", variant: "2kg", price: 180, cost: 150, stock: 45 },
  { id: "2", name: "Kimbo 1kg", sku: "CO-001", category: "Cooking Oil", variant: "1kg", price: 320, cost: 280, stock: 32 },
  { id: "3", name: "Brookside Milk 500ml", sku: "DA-001", category: "Dairy", variant: "500ml", price: 65, cost: 52, stock: 120 },
  { id: "4", name: "Mumias Sugar 1kg", sku: "SG-001", category: "Sugar", variant: "1kg", price: 150, cost: 125, stock: 58 },
  { id: "5", name: "Ketepa Tea 100g", sku: "BV-001", category: "Beverages", variant: "100g", price: 95, cost: 72, stock: 78 },
  { id: "6", name: "Royco Mchuzi Mix", sku: "SP-001", category: "Spices", variant: "Single", price: 10, cost: 7, stock: 200 },
  { id: "7", name: "Omo Detergent 1kg", sku: "HH-001", category: "Household", variant: "1kg", price: 220, cost: 185, stock: 40 },
  { id: "8", name: "Bread (White) 400g", sku: "BK-001", category: "Bakery", variant: "400g", price: 60, cost: 48, stock: 8 },
  { id: "9", name: "Eggs (Tray of 30)", sku: "DA-002", category: "Dairy", variant: "Tray", price: 450, cost: 380, stock: 15 },
  { id: "10", name: "Tusker Cider 500ml", sku: "BV-002", category: "Beverages", variant: "500ml", price: 200, cost: 160, stock: 60 },
  { id: "11", name: "Blueband 500g", sku: "CO-002", category: "Cooking Oil", variant: "500g", price: 180, cost: 148, stock: 42 },
  { id: "12", name: "Maize Flour 1kg", sku: "FL-002", category: "Flour", variant: "1kg", price: 120, cost: 95, stock: 5 },
]

const categories = [
  "All",
  "Flour",
  "Cooking Oil",
  "Dairy",
  "Sugar",
  "Beverages",
  "Spices",
  "Household",
  "Bakery",
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortField, setSortField] = useState<keyof InventoryItem>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    variant: "",
    price: "",
    cost: "",
    stock: "",
  })

  const filtered = inventory
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      return sortDirection === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })

  const handleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const openAddDialog = () => {
    setEditingItem(null)
    setFormData({ name: "", sku: "", category: "", variant: "", price: "", cost: "", stock: "" })
    setDialogOpen(true)
  }

  const openEditDialog = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      variant: item.variant,
      price: String(item.price),
      cost: String(item.cost),
      stock: String(item.stock),
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editingItem) {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...formData,
                price: Number(formData.price),
                cost: Number(formData.cost),
                stock: Number(formData.stock),
              }
            : item
        )
      )
    } else {
      const newItem: InventoryItem = {
        id: String(Date.now()),
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        variant: formData.variant,
        price: Number(formData.price),
        cost: Number(formData.cost),
        stock: Number(formData.stock),
      }
      setInventory((prev) => [...prev, newItem])
    }
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id))
  }

  const lowStockCount = inventory.filter((i) => i.stock <= 10).length

  return (
    <>
      <AppHeader
        title="Inventory"
        description={`${inventory.length} products, ${lowStockCount} low stock`}
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or SKU..."
                  className="pl-8 h-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="size-3.5 mr-1.5" />
                Export
              </Button>
              <Button size="sm" className="text-xs" onClick={openAddDialog}>
                <Plus className="size-3.5 mr-1.5" />
                Add Product
              </Button>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs -ml-3 h-7"
                      onClick={() => handleSort("name")}
                    >
                      Product Name
                      <ArrowUpDown className="size-3 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-xs">
                    SKU
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-xs">
                    Category
                  </TableHead>
                  <TableHead className="hidden lg:table-cell text-xs">
                    Variant
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs -ml-3 h-7"
                      onClick={() => handleSort("stock")}
                    >
                      Stock
                      <ArrowUpDown className="size-3 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs -ml-3 h-7"
                      onClick={() => handleSort("price")}
                    >
                      Price
                      <ArrowUpDown className="size-3 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow
                    key={item.id}
                    className={
                      item.stock <= 10
                        ? "bg-muted/50"
                        : ""
                    }
                  >
                    <TableCell className="text-xs font-medium">
                      {item.name}
                      {item.stock <= 10 && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-[9px] border-foreground"
                        >
                          Low Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                      {item.sku}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs">
                      {item.category}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {item.variant}
                    </TableCell>
                    <TableCell className="text-xs font-semibold">
                      {item.stock}
                    </TableCell>
                    <TableCell className="text-xs font-semibold">
                      KES {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="size-3" />
                          <span className="sr-only">Edit {item.name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="size-3" />
                          <span className="sr-only">Delete {item.name}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Update the product details below."
                : "Fill in the details for the new product."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-xs">
                  Product Name
                </Label>
                <Input
                  id="name"
                  className="h-9"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="sku" className="text-xs">
                  SKU
                </Label>
                <Input
                  id="sku"
                  className="h-9"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="category" className="text-xs">
                  Category
                </Label>
                <Input
                  id="category"
                  className="h-9"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="variant" className="text-xs">
                  Variant
                </Label>
                <Input
                  id="variant"
                  className="h-9"
                  value={formData.variant}
                  onChange={(e) =>
                    setFormData({ ...formData, variant: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="price" className="text-xs">
                  Price (KES)
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="h-9"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cost" className="text-xs">
                  Cost (KES)
                </Label>
                <Input
                  id="cost"
                  type="number"
                  className="h-9"
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({ ...formData, cost: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="stock" className="text-xs">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  className="h-9"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <Button onClick={handleSave}>
            {editingItem ? "Save Changes" : "Add Product"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
