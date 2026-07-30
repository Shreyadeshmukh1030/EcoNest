"use client"

import { useCart, useAuth, usePromo } from "@/lib/store"
import { products } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Truck, ShieldCheck, CreditCard, QrCode, Banknote, CheckCircle2, Lock, ArrowRight, Leaf } from "lucide-react"

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const { promo, clearPromo } = usePromo()
  const { user } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [deliveryType, setDeliveryType] = useState<"standard" | "express">("standard")
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi")
  const [upiSimulating, setUpiSimulating] = useState(false)

  // Form State
  const [name, setName] = useState(user?.name || "Aarav Sharma")
  const [email, setEmail] = useState(user?.email || "aarav.sharma@example.com")
  const [phone, setPhone] = useState("+91 98765 43210")
  const [address, setAddress] = useState("42 Green Valley Apartments, 3rd Main Rd")
  const [city, setCity] = useState("Bengaluru")
  const [state, setState] = useState("Karnataka")
  const [pincode, setPincode] = useState("560038")

  // Card demo state
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8890")
  const [cardExp, setCardExp] = useState("08/28")
  const [cardCvv, setCardCvv] = useState("321")

  const map = new Map(products.map((p) => [p.id, p]))
  const rows = items
    .map((i) => ({ ...i, product: map.get(i.id)! }))
    .filter((r) => !!r.product)

  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0)

  // Discount from Promo
  let discountAmount = 0
  if (promo) {
    if (promo.discountPercent > 0) {
      discountAmount += Math.round((subtotal * promo.discountPercent) / 100)
    }
    if (promo.discountFlat > 0 && subtotal >= 2000) {
      discountAmount += promo.discountFlat
    }
  }

  const baseShipping = subtotal >= 3000 ? 0 : 200
  const expressFee = deliveryType === "express" ? 150 : 0
  const totalShipping = baseShipping + expressFee
  const total = Math.max(0, subtotal - discountAmount + totalShipping)

  // Estimated CO2 savings
  const co2SavedKg = Math.max(5, rows.length * 6)

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rows.length === 0) return
    setLoading(true)

    try {
      const payload = {
        userId: user?.id || "guest-user",
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: `${address}, ${city}, ${state} - ${pincode}`,
        deliveryType,
        paymentMethod,
        items: rows.map((r) => ({
          id: r.id,
          name: r.product.name,
          qty: r.qty,
          price: r.product.price,
          image: r.product.image,
        })),
        subtotal,
        discountAmount,
        shippingFee: totalShipping,
        total,
        co2SavedKg,
        status: "confirmed",
      }

      // POST to backend API
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const orderData = await res.json()

      // Also store in localStorage for instant tracking demo
      const existingOrdersRaw = typeof window !== "undefined" ? localStorage.getItem("econest:orders") : null
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : []
      const updatedOrders = [orderData, ...existingOrders]
      if (typeof window !== "undefined") {
        localStorage.setItem("econest:orders", JSON.stringify(updatedOrders))
      }

      clear()
      clearPromo()
      router.push(`/orders/${orderData.id}`)
    } catch (err) {
      console.error("[EcoNest] Order failed:", err)
      setLoading(false)
    }
  }

  if (rows.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-3">No Items in Cart</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Please add eco-friendly products to your cart before proceeding to checkout.
        </p>
        <Button asChild>
          <a href="/products">Browse Catalog</a>
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold">Eco-Friendly Checkout</h1>
        <p className="text-muted-foreground text-sm">
          Complete your sustainable purchase with 100% zero-carbon logistics.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Columns: Address, Shipping, and Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Shipping Address */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  1
                </span>
                Delivery Address
              </CardTitle>
              <CardDescription>We use plastic-free cornstarch packaging for all deliveries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold">
                    Full Name
                  </Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-xs font-semibold">
                    Phone Number
                  </Label>
                  <Input id="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-xs font-semibold">
                    PIN Code
                  </Label>
                  <Input id="pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-xs font-semibold">
                  Street Address & Apartment
                </Label>
                <Input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-xs font-semibold">
                    City
                  </Label>
                  <Input id="city" required value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="state" className="text-xs font-semibold">
                    State
                  </Label>
                  <Input id="state" required value={state} onChange={(e) => setState(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Delivery Speed */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  2
                </span>
                Eco-Delivery Method
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <label
                onClick={() => setDeliveryType("standard")}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                  deliveryType === "standard"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "standard"}
                  onChange={() => setDeliveryType("standard")}
                  className="mt-1 accent-primary"
                />
                <div className="text-sm">
                  <div className="font-semibold flex items-center justify-between">
                    <span>Zero-Carbon Delivery</span>
                    <Badge variant="secondary" className="text-emerald-700 dark:text-emerald-400">
                      FREE
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    5–7 Business Days • Delivered via electric transport
                  </p>
                </div>
              </label>

              <label
                onClick={() => setDeliveryType("express")}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                  deliveryType === "express"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "express"}
                  onChange={() => setDeliveryType("express")}
                  className="mt-1 accent-primary"
                />
                <div className="text-sm">
                  <div className="font-semibold flex items-center justify-between">
                    <span>Express Solar Delivery</span>
                    <span className="text-xs font-bold">+₹150</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    2–3 Business Days • Priority dispatch
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* 3. Payment Method Simulator */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  3
                </span>
                Payment Method (Functional Demo)
              </CardTitle>
              <CardDescription>Select a payment method to simulate instant transaction approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === "upi"
                      ? "border-emerald-600 bg-emerald-500/10 font-semibold"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <QrCode className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs">UPI / QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === "card"
                      ? "border-emerald-600 bg-emerald-500/10 font-semibold"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs">Credit / Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-500/10 font-semibold"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <Banknote className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>
              </div>

              {/* UPI Simulator Box */}
              {paymentMethod === "upi" && (
                <div className="rounded-xl border border-border p-4 bg-muted/40 space-y-3 text-center">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Simulated UPI Instant Approval Enabled
                  </div>
                  <p className="text-xs text-muted-foreground">
                    In a production app, you would scan this QR code with Google Pay, PhonePe, or Paytm. Here, clicking
                    the order button automatically verifies payment.
                  </p>
                  <div className="mx-auto w-36 h-36 bg-white p-2 rounded-lg border border-border flex items-center justify-center shadow-sm">
                    <QrCode className="h-28 w-28 text-gray-800" />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">VPA: econest@okaxis</div>
                </div>
              )}

              {/* Card Simulator Box */}
              {paymentMethod === "card" && (
                <div className="rounded-xl border border-border p-4 bg-muted/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span>Simulated Test Credit/Debit Card</span>
                    <span>No real charge</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[11px]">Card Number</Label>
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8890"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[11px]">Expiry</Label>
                        <Input value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label className="text-[11px]">CVV</Label>
                        <Input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="321"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COD Box */}
              {paymentMethod === "cod" && (
                <div className="rounded-xl border border-border p-4 bg-muted/40 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Pay upon carbon-neutral delivery</p>
                  Please keep exact cash ready or scan our delivery agent&apos;s UPI QR code when your order arrives.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="space-y-6">
          <Card className="border border-border shadow-md bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items Preview */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {rows.map((r) => (
                  <div key={r.id} className="flex justify-between items-center text-sm py-1 border-b border-border/50">
                    <span className="truncate max-w-[180px]">
                      {r.product.name} × {r.qty}
                    </span>
                    <span className="font-semibold">₹{(r.product.price * r.qty).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              {/* Carbon Offset Highlight */}
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-3">
                <Leaf className="h-5 w-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">
                    🌱 {co2SavedKg}kg CO₂ Offset Generated
                  </div>
                  <div className="text-muted-foreground">
                    Equivalent to planting {Math.max(1, Math.round(co2SavedKg / 10))} tree seedlings!
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* Cost Calculation */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Promo Discount ({promo?.code})</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span>
                    {totalShipping === 0 ? (
                      <span className="text-emerald-600 font-medium">FREE</span>
                    ) : (
                      `₹${totalShipping}`
                    )}
                  </span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-bold text-base">Total Payable</span>
                  <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full text-base h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              >
                {loading ? "Confirming Eco-Order..." : `Pay ₹${total.toLocaleString("en-IN")} & Place Order`}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                <span>Simulated Secure 256-Bit SSL Checkout</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </main>
  )
}
