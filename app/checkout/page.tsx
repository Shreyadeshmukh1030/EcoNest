"use client"

import { useCart, useAuth } from "@/lib/store"
import { products } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const map = new Map(products.map((p) => [p.id, p]))
  const rows = items.map((i) => ({ ...i, product: map.get(i.id)! })).filter((r) => !!r.product)
  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0)
  const shipping = subtotal > 10000 ? 0 : 200
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest",
          items: rows.map((r) => ({ id: r.id, qty: r.qty, price: r.product.price })),
          total,
        }),
      })
      const order = await response.json()
      console.log("[v0] Order created:", order)

      clear()
      setOrderComplete(true)
      setTimeout(() => router.push("/"), 3000)
    } catch (error) {
      console.error("[v0] Order failed:", error)
    } finally {
      setLoading(false)
    }
  }

  if (orderComplete) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">Thank you for your order. Your eco-friendly products will be delivered soon!</p>
            <p className="text-sm text-muted-foreground">Redirecting to homepage...</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!rows.length) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <p className="text-muted-foreground">No items to checkout.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Shipping Info */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user?.name?.split(" ")[0] || ""} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user?.name?.split(" ")[1] || ""} />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ""} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Eco Street" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 divide-y">
              {rows.map((r) => (
                <li key={r.id} className="flex items-center justify-between pt-3 first:pt-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.product.image || "/placeholder.svg"}
                      alt={r.product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium text-sm">{r.product.name}</div>
                      <div className="text-xs text-muted-foreground">Qty: {r.qty}</div>
                    </div>
                  </div>
                  <span className="font-medium">₹{(r.product.price * r.qty).toLocaleString("en-IN")}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
            {shipping > 0 && (
              <p className="text-xs text-center text-muted-foreground">
                Add ₹{(10000 - subtotal).toLocaleString("en-IN")} more for FREE shipping
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
