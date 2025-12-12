"use client"

import { useAuth, useCart, useWishlist } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    if (user) {
      // Fetch user orders
      fetch(`/api/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("[v0] Failed to fetch orders:", err))
    }
  }, [user])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-8">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Please log in to view your profile</p>
            <div className="flex gap-2 justify-center">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="font-medium text-lg">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-md border p-4 hover:shadow-md transition-shadow">
                <div className="text-sm text-muted-foreground">Cart Items</div>
                <div className="font-semibold text-2xl">{cart.length}</div>
              </div>
              <div className="rounded-md border p-4 hover:shadow-md transition-shadow">
                <div className="text-sm text-muted-foreground">Wishlist</div>
                <div className="font-semibold text-2xl">{wish.length}</div>
              </div>
              <div className="rounded-md border p-4 hover:shadow-md transition-shadow">
                <div className="text-sm text-muted-foreground">Orders</div>
                <div className="font-semibold text-2xl">{orders.length}</div>
              </div>
              <div className="rounded-md border p-4 hover:shadow-md transition-shadow">
                <div className="text-sm text-muted-foreground">Member Since</div>
                <div className="font-semibold text-sm">2024</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/wishlist">View Wishlist</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <ul className="space-y-3 divide-y">
                {orders.map((order) => (
                  <li key={order.id} className="pt-3 first:pt-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Order #{order.id.slice(-8)}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{order.total.toLocaleString("en-IN")}</div>
                        <div className="text-xs text-green-600 capitalize">{order.status}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">No orders yet. Start shopping!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
