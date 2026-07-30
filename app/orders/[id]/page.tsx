"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Truck, Package, MapPin, Leaf, ArrowLeft, Printer, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params?.id as string
  const [order, setOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Try checking localStorage for recent client orders
    const raw = typeof window !== "undefined" ? localStorage.getItem("econest:orders") : null
    const localOrders = raw ? JSON.parse(raw) : []
    const foundLocal = localOrders.find((o: any) => o.id === orderId)

    if (foundLocal) {
      setOrder(foundLocal)
      setLoading(false)
    } else {
      // 2. Fetch from backend API
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data: any[]) => {
          const found = data.find((o) => o.id === orderId)
          if (found) setOrder(found)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [orderId])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Loading sustainable order details...</p>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="container mx-auto px-4 py-16 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-3">Order Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          We couldn&apos;t locate order <strong>#{orderId}</strong>.
        </p>
        <Button asChild>
          <Link href="/products">Browse Store</Link>
        </Button>
      </main>
    )
  }

  const steps = [
    { title: "Order Confirmed", desc: "Payment verified & order booked", done: true },
    { title: "Eco-Packaging", desc: "Packed in biodegradable cornstarch materials", done: true },
    {
      title: "In Transit via EV",
      desc: "Dispatched through zero-emission electric vehicles",
      done: order.status === "shipped" || order.status === "delivered",
    },
    {
      title: "Delivered",
      desc: "Carbon neutral delivery complete",
      done: order.status === "delivered",
    },
  ]

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link href="/profile" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Profile & Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">Order #{order.id.slice(-8).toUpperCase()}</h1>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-xs">
              {order.status || "Confirmed"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString("en-IN", {
              dateStyle: "medium",
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </Button>
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/products">Shop Again</Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Tracking Timeline & Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Tracking Progress Bar */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5 text-emerald-600" />
                Live Order Progress
              </CardTitle>
              <CardDescription>Estimated delivery within 3–5 business days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-4 gap-4 relative">
                {steps.map((s, index) => (
                  <div key={s.title} className="flex flex-col items-start sm:items-center text-left sm:text-center space-y-1.5">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        s.done
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {s.done ? "✓" : index + 1}
                    </div>
                    <div className="font-semibold text-xs sm:text-sm">{s.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight">{s.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items List */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Items Ordered ({order.items?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image src={item.image} alt={item.name || "Product"} fill className="object-cover" sizes="56px" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-sm">{item.name || item.id}</div>
                      <div className="text-xs text-muted-foreground">Quantity: {item.qty}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-sm">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Delivery Details & CO2 Impact */}
        <div className="space-y-6">
          {/* Sustainability Impact Card */}
          <Card className="border border-emerald-500/30 bg-emerald-500/5 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <Leaf className="h-5 w-5 text-emerald-600" />
                Your Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CO₂ Emissions Offset:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {order.co2SavedKg || 14} kg CO₂
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Plastic Packaging Avoided:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">100%</span>
              </div>
              <div className="text-xs text-muted-foreground pt-2 border-t border-emerald-500/20">
                Thank you for contributing to a cleaner, greener Earth!
              </div>
            </CardContent>
          </Card>

          {/* Customer & Shipping Info */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Shipping & Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Customer Name:</span>
                <span className="font-medium">{order.customerName || "Aarav Sharma"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Email & Phone:</span>
                <span className="font-medium">
                  {order.customerEmail || "aarav.sharma@example.com"} • {order.customerPhone || "+91 98765 43210"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Shipping Address:</span>
                <span className="font-medium">{order.shippingAddress || "42 Green Valley Apartments, Bengaluru"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Payment Method:</span>
                <span className="font-medium capitalize">{order.paymentMethod || "UPI / QR Code"}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-bold">Total Paid:</span>
                <span className="font-bold text-base text-emerald-700 dark:text-emerald-400">
                  ₹{(order.total || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
