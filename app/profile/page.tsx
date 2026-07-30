"use client"

import { useAuth, useCart, useWishlist } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Package, Heart, ShoppingCart, ShieldCheck, LogOut, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { items: cart } = useCart()
  const { items: wish } = useWishlist()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    // Merge localStorage orders and backend API orders
    const rawLocal = typeof window !== "undefined" ? localStorage.getItem("econest:orders") : null
    const localOrders = rawLocal ? JSON.parse(rawLocal) : []

    fetch(`/api/orders${user?.id ? `?userId=${user.id}` : ""}`)
      .then((res) => res.json())
      .then((data: any[]) => {
        // Merge and deduplicate by id
        const map = new Map<string, any>()
        localOrders.forEach((o: any) => map.set(o.id, o))
        data.forEach((o: any) => map.set(o.id, o))
        setOrders(Array.from(map.values()))
      })
      .catch(() => {
        setOrders(localOrders)
      })
  }, [user])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Calculate eco points
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const ecoPoints = Math.max(120, Math.floor(totalSpent / 50))
  const totalCo2Saved = orders.reduce((sum, o) => sum + (o.co2SavedKg || 14), 0)

  if (!user) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-16">
        <Card className="max-w-md mx-auto text-center p-6 shadow-lg border border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Welcome to EcoNest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Please log in or register to view your sustainable profile, track orders, and redeem Eco-Points.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button asChild className="flex-1">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
      <div className="space-y-8">
        {/* Top Profile Card */}
        <Card className="border border-border shadow-md overflow-hidden bg-card">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Badge className="bg-white/20 text-white mb-2 backdrop-blur-md">🌱 Sustainable Explorer</Badge>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">{user.name}</h1>
              <p className="text-emerald-100 text-sm mt-0.5">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" asChild className="bg-white text-emerald-800 hover:bg-emerald-50">
                <Link href="/admin">
                  <ShieldCheck className="h-4 w-4 mr-1.5" />
                  Admin Panel
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-border p-4 bg-background">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                  <Leaf className="h-4 w-4 text-emerald-600" />
                  Eco-Points
                </div>
                <div className="font-bold text-2xl sm:text-3xl mt-1 text-emerald-700 dark:text-emerald-400">
                  {ecoPoints}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">1 pt per ₹50 spent</div>
              </div>

              <div className="rounded-xl border border-border p-4 bg-background">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                  <Package className="h-4 w-4 text-primary" />
                  Total Orders
                </div>
                <div className="font-bold text-2xl sm:text-3xl mt-1">{orders.length}</div>
                <div className="text-[11px] text-muted-foreground mt-1">Confirmed & Shipped</div>
              </div>

              <div className="rounded-xl border border-border p-4 bg-background">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  Cart Items
                </div>
                <div className="font-bold text-2xl sm:text-3xl mt-1">{cart.length}</div>
                <div className="text-[11px] text-muted-foreground mt-1">Ready for checkout</div>
              </div>

              <div className="rounded-xl border border-border p-4 bg-background">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                  <Heart className="h-4 w-4 text-red-500" />
                  Wishlist
                </div>
                <div className="font-bold text-2xl sm:text-3xl mt-1">{wish.length}</div>
                <div className="text-[11px] text-muted-foreground mt-1">Saved favorites</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-border">
              <Button variant="outline" asChild size="sm">
                <Link href="/cart">View Cart ({cart.length})</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/wishlist">View Wishlist ({wish.length})</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/products">Shop Catalog</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/impact">Calculate Carbon Savings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Your Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <ul className="space-y-4 divide-y divide-border">
                {orders.map((order) => (
                  <li key={order.id} className="pt-4 first:pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/orders/${order.id}`}
                            className="font-bold text-base hover:text-primary transition-colors inline-flex items-center gap-1"
                          >
                            Order #{order.id.slice(-8).toUpperCase()}
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                          </Link>
                          <Badge
                            variant="secondary"
                            className="text-xs uppercase bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold"
                          >
                            {order.status || "confirmed"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Placed on{" "}
                          {new Date(order.createdAt || Date.now()).toLocaleDateString("en-IN", {
                            dateStyle: "medium",
                          })}{" "}
                          • {order.items?.length || 0} items
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <div className="font-bold text-base">₹{(order.total || 0).toLocaleString("en-IN")}</div>
                          <div className="text-xs text-emerald-600">
                            🌱 {order.co2SavedKg || 14}kg CO₂ saved
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/orders/${order.id}`}>Track Order →</Link>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12 space-y-3">
                <Package className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">You haven&apos;t placed any eco-friendly orders yet.</p>
                <Button asChild size="sm">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
