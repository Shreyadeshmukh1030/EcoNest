"use client"

import { useCart } from "@/lib/store"
import { products } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart()
  const map = new Map(products.map((p) => [p.id, p]))
  const rows = items.map((i) => ({ ...i, product: map.get(i.id)! })).filter((r) => !!r.product)
  const total = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0)

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {!rows.length ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <ul className="divide-y rounded-md border">
            {rows.map((r) => (
              <li key={r.id} className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                <div className="flex items-center gap-3 col-span-2 md:col-span-2">
                  <img
                    src={r.product.image || "/placeholder.svg"}
                    alt={r.product.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{r.product.name}</div>
                    <div className="text-sm text-muted-foreground">₹{r.product.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    className="w-20 rounded-md border bg-background px-2 py-1"
                    value={r.qty}
                    onChange={(e) => setQty(r.id, Math.max(1, Number(e.target.value) || 1))}
                    aria-label="Quantity"
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" onClick={() => remove(r.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Total: ₹{total.toLocaleString("en-IN")}</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={clear}>
                Clear Cart
              </Button>
              <Button asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
