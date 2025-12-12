"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"

export default function SearchPage() {
  const sp = useSearchParams()
  const q = (sp.get("q") || "").toLowerCase()
  const matches = products.filter((p) => {
    const blob = [p.name, p.material, ...(p.tags || [])].join(" ").toLowerCase()
    return q ? blob.includes(q) : false
  })
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold text-pretty mb-4">Search Results</h1>
      {q ? (
        matches.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No results for “{q}”.</p>
        )
      ) : (
        <p className="text-muted-foreground">Enter a term above to search products.</p>
      )}
    </main>
  )
}
