"use client"

import { useWishlist } from "@/lib/store"
import { products } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"

export default function WishlistPage() {
  const { items } = useWishlist()
  const ids = new Set(items.map((i) => i.id))
  const list = products.filter((p) => ids.has(p.id))
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
      {list.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Your wishlist is empty.</p>
      )}
    </main>
  )
}
