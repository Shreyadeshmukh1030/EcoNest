"use client"

import { useState } from "react"
import { useCart, usePromo } from "@/lib/store"
import { products } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, ArrowRight, Truck, Tag, ShoppingBag, Plus, Minus, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart()
  const { promo, setPromo, clearPromo } = usePromo()
  const [promoInput, setPromoInput] = useState("")
  const [promoError, setPromoError] = useState("")
  const [promoSuccess, setPromoSuccess] = useState("")

  const map = new Map(products.map((p) => [p.id, p]))
  const rows = items
    .map((i) => ({ ...i, product: map.get(i.id)! }))
    .filter((r) => !!r.product)

  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0)

  // Free shipping at ₹3,000
  const freeShippingTarget = 3000
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingTarget) * 100))
  const amountNeededForFreeShipping = Math.max(0, freeShippingTarget - subtotal)

  // Calculate promo discount
  let discountAmount = 0
  if (promo) {
    if (promo.discountPercent > 0) {
      discountAmount += Math.round((subtotal * promo.discountPercent) / 100)
    }
    if (promo.discountFlat > 0 && subtotal >= 2000) {
      discountAmount += promo.discountFlat
    }
  }

  const shippingCost = subtotal === 0 ? 0 : subtotal >= freeShippingTarget ? 0 : 200
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError("")
    setPromoSuccess("")
    const code = promoInput.trim().toUpperCase()
    if (code === "ECO10") {
      setPromo({ code: "ECO10", discountPercent: 10, discountFlat: 0 })
      setPromoSuccess("ECO10 applied! 10% discount added.")
      setPromoInput("")
    } else if (code === "EARTH20") {
      setPromo({ code: "EARTH20", discountPercent: 20, discountFlat: 0 })
      setPromoSuccess("EARTH20 applied! 20% discount added.")
      setPromoInput("")
    } else if (code === "WELCOME500") {
      if (subtotal < 2000) {
        setPromoError("WELCOME500 requires a minimum cart value of ₹2,000.")
      } else {
        setPromo({ code: "WELCOME500", discountPercent: 0, discountFlat: 500 })
        setPromoSuccess("WELCOME500 applied! Flat ₹500 discount added.")
        setPromoInput("")
      }
    } else {
      setPromoError("Invalid promo code. Try: ECO10, EARTH20, or WELCOME500.")
    }
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Your Shopping Cart</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Review your sustainable selections before heading to secure checkout.
      </p>

      {!rows.length ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card max-w-xl mx-auto my-12">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Your EcoNest Cart is Empty</h2>
          <p className="text-muted-foreground text-sm mt-1 mb-6">
            Explore our collection of biodegradable décor, artisan furniture, and living plants.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Explore Sustainable Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress Bar */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-600 font-semibold">
                      🎉 You have unlocked Free Carbon-Neutral Shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> more for Free Eco-Shipping!
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-muted-foreground">{shippingProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/products/${r.product.slug}`}
                      className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0"
                    >
                      <Image
                        src={r.product.image || "/placeholder.svg"}
                        alt={r.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div>
                      <Link
                        href={`/products/${r.product.slug}`}
                        className="font-semibold hover:text-primary transition-colors text-base"
                      >
                        {r.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {r.product.material ? `Material: ${r.product.material}` : "Eco-friendly craft"}
                      </p>
                      <p className="font-semibold text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                        ₹{r.product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                      <button
                        onClick={() => setQty(r.id, Math.max(1, r.qty - 1))}
                        aria-label="Decrease quantity"
                        className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">{r.qty}</span>
                      <button
                        onClick={() => setQty(r.id, r.qty + 1)}
                        aria-label="Increase quantity"
                        className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[5rem]">
                      <div className="font-bold">₹{(r.product.price * r.qty).toLocaleString("en-IN")}</div>
                    </div>

                    <button
                      onClick={() => remove(r.id)}
                      aria-label="Remove item"
                      className="text-muted-foreground hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="ghost" size="sm" onClick={clear} className="text-muted-foreground hover:text-red-600">
                Clear All Items
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/products">← Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Cart Summary & Promo Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold">Order Summary</h2>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Try ECO10 or EARTH20"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="h-10 text-sm uppercase"
                  />
                  <Button type="submit" variant="secondary" size="sm" className="h-10 px-4">
                    Apply
                  </Button>
                </div>
                {promoError && <p className="text-xs text-red-600 mt-1">{promoError}</p>}
                {promoSuccess && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {promoSuccess}
                  </p>
                )}
              </form>

              {/* Active Promo Display */}
              {promo && (
                <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-sm">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-800 dark:text-emerald-300">
                    <Tag className="h-3.5 w-3.5" />
                    Code <strong>{promo.code}</strong> Applied
                  </span>
                  <button
                    onClick={clearPromo}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              <hr className="border-border" />

              {/* Breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Eco-Discount ({promo?.code})</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carbon-Neutral Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-medium">FREE</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full text-base h-12 shadow-sm">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                🔒 256-bit encrypted secure eco-checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
