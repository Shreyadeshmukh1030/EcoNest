"use client"

import { useState, useEffect, useMemo } from "react"
import { products as initialProducts, type Product } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Leaf,
  Plus,
  Search,
  CheckCircle,
  Truck,
  Box,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "catalog" | "analytics">("orders")
  const [orders, setOrders] = useState<any[]>([])
  const [catalog, setCatalog] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  // New product form state
  const [newTitle, setNewTitle] = useState("")
  const [newPrice, setNewPrice] = useState("2999")
  const [newCategory, setNewCategory] = useState<"furniture" | "decor" | "plants">("decor")
  const [newMaterial, setNewMaterial] = useState("Bamboo")

  useEffect(() => {
    // Load orders
    const raw = typeof window !== "undefined" ? localStorage.getItem("econest:orders") : null
    const localOrders = raw ? JSON.parse(raw) : []

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data: any[]) => {
        const map = new Map<string, any>()
        localOrders.forEach((o: any) => map.set(o.id, o))
        data.forEach((o: any) => map.set(o.id, o))
        setOrders(Array.from(map.values()))
      })
      .catch(() => {
        setOrders(localOrders)
      })
  }, [])

  // Update order status
  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    setOrders(updated)
    if (typeof window !== "undefined") {
      localStorage.setItem("econest:orders", JSON.stringify(updated))
    }
  }

  // Add product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newProd: Product = {
      id: `p-${Date.now()}`,
      name: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newCategory,
      subcategory: newCategory === "furniture" ? "chairs" : newCategory === "decor" ? "lamps" : "indoor",
      price: Number(newPrice) || 1999,
      rating: 5,
      material: newMaterial,
      image: "/bamboo-lounge-chair-sustainable.jpg",
      description: `Handcrafted ${newMaterial} eco-friendly item created for sustainable home spaces.`,
    }
    setCatalog([newProd, ...catalog])
    setNewTitle("")
    setShowAddModal(false)
  }

  // Remove product
  const handleDeleteProduct = (id: string) => {
    setCatalog(catalog.filter((p) => p.id !== id))
  }

  // Filtered catalog
  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return catalog
    const q = searchQuery.toLowerCase()
    return catalog.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }, [catalog, searchQuery])

  // Key metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const totalCo2 = orders.reduce((sum, o) => sum + (o.co2SavedKg || 14), 0)

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Badge className="bg-emerald-600 text-white mb-2">🔒 Executive Dashboard</Badge>
          <h1 className="font-serif text-3xl font-bold">Admin & Operations Panel</h1>
          <p className="text-muted-foreground text-sm">
            Manage sustainable catalog inventory, fulfill customer orders, and inspect environmental statistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            New Eco-Product
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">View Live Store</Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase">
              <span>Total Gross Revenue</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold mt-1 text-emerald-700 dark:text-emerald-400">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Confirmed transactions</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase">
              <span>Total Orders</span>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold mt-1">{orders.length}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Pending & Shipped</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase">
              <span>Active Catalog</span>
              <Box className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold mt-1">{catalog.length}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Eco-friendly SKUs</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase">
              <span>CO₂ Offset Generated</span>
              <Leaf className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold mt-1 text-emerald-700 dark:text-emerald-400">
              {totalCo2} kg
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Verified carbon metric</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2.5 font-semibold text-sm border-b-2 transition-colors shrink-0 ${
            activeTab === "orders"
              ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Order Fulfillment Board ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-4 py-2.5 font-semibold text-sm border-b-2 transition-colors shrink-0 ${
            activeTab === "catalog"
              ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Catalog Manager ({catalog.length})
        </button>
      </div>

      {/* 1. Order Fulfillment Tab */}
      {activeTab === "orders" && (
        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Customer Orders & Logistics</CardTitle>
            <CardDescription>Update order status to trigger live tracking progress on customer invoices.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No customer orders received yet. Place a test order from the checkout page!
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                    <th className="pb-3 pr-4">Order ID</th>
                    <th className="pb-3 pr-4">Customer</th>
                    <th className="pb-3 pr-4">Total</th>
                    <th className="pb-3 pr-4">Payment</th>
                    <th className="pb-3 pr-4">Status / Update</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-muted/30">
                      <td className="py-3 pr-4 font-mono font-semibold">
                        <Link href={`/orders/${o.id}`} className="hover:underline flex items-center gap-1">
                          #{o.id.slice(-8).toUpperCase()}
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </Link>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="font-medium">{o.customerName || "Aarav Sharma"}</div>
                        <div className="text-xs text-muted-foreground">{o.customerEmail || "aarav.sharma@example.com"}</div>
                      </td>
                      <td className="py-3 pr-4 font-bold text-emerald-700 dark:text-emerald-400">
                        ₹{(o.total || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 pr-4 capitalize text-xs">{o.paymentMethod || "UPI"}</td>
                      <td className="py-3 pr-4">
                        <select
                          value={o.status || "confirmed"}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          className="text-xs rounded-md border border-border bg-background px-2 py-1 font-medium"
                        >
                          <option value="confirmed">1. Confirmed</option>
                          <option value="shipped">2. Shipped via EV</option>
                          <option value="delivered">3. Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/orders/${o.id}`}>Inspect →</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      )}

      {/* 2. Catalog Manager Tab */}
      {activeTab === "catalog" && (
        <Card className="border border-border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Inventory & SKUs</CardTitle>
              <CardDescription>All products currently live on the EcoNest customer storefront.</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                  <th className="pb-3 pr-4">Product</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Material</th>
                  <th className="pb-3 pr-4">Price</th>
                  <th className="pb-3 pr-4">Rating</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCatalog.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted shrink-0">
                          <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <Link href={`/products/${p.slug}`} className="font-semibold hover:underline">
                            {p.name}
                          </Link>
                          <div className="text-xs text-muted-foreground font-mono">SKU: {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 capitalize">{p.category}</td>
                    <td className="py-3 pr-4">{p.material || "Eco-friendly"}</td>
                    <td className="py-3 pr-4 font-bold">₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="py-3 pr-4">★ {p.rating}.0</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-muted-foreground hover:text-red-600 transition-colors p-1"
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />
          <Card className="relative z-50 w-full max-w-md bg-card border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Add New Eco-Product</CardTitle>
              <CardDescription>Immediately list a new item on the store catalog.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">Product Name</label>
                  <Input required placeholder="e.g. Cork Coffee Coasters" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    >
                      <option value="furniture">Furniture</option>
                      <option value="decor">Home Décor</option>
                      <option value="plants">Living Plants 🌿</option>
                      <option value="gifts">Gifts to Give 🎁</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1">Price (₹)</label>
                    <Input required type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Sustainable Material</label>
                  <Input placeholder="e.g. Bamboo, Hemp, Jute" value={newMaterial} onChange={(e) => setNewMaterial(e.target.value)} />
                </div>
                <div className="flex gap-2 justify-end pt-3">
                  <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Publish to Store
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
