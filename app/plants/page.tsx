"use client"

import { products } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Sun, Droplets, Wind, ShieldCheck } from "lucide-react"

export default function PlantsPage() {
  const plantProducts = products.filter((p) => p.category === "plants")

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      {/* Plants Header Banner */}
      <header className="mb-10 relative rounded-3xl overflow-hidden border border-border shadow-lg bg-gradient-to-br from-emerald-500/15 via-emerald-600/10 to-card">
        <div className="p-8 sm:p-12 md:p-16 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1">
              🌿 Indoor Botanical Nursery
            </Badge>
            <Badge variant="outline" className="text-emerald-700 border-emerald-600/40">
              🪴 NASA-Approved Air Purifiers
            </Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pretty leading-tight">
            Bring Living Greenery Into Every Room
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            From iconic split-leaf Monstera and statement Fiddle Leaf Fig trees to hardy Snake Plants and calming Bonsai,
            every plant is nurtured in organic soil and arrives potted in breathable artisan terracotta or seagrass planters.
          </p>
        </div>
      </header>

      {/* Plant Care Benefits Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="rounded-2xl border border-border p-4 bg-card text-center">
          <Wind className="h-7 w-7 mx-auto text-emerald-600 mb-2" />
          <h3 className="font-bold text-sm">Natural Air Purifiers</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Filters indoor toxins like benzene & formaldehyde naturally.
          </p>
        </div>

        <div className="rounded-2xl border border-border p-4 bg-card text-center">
          <Sun className="h-7 w-7 mx-auto text-amber-500 mb-2" />
          <h3 className="font-bold text-sm">Low-Light Friendly</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Hardy varieties thrive even in shaded apartments and office desks.
          </p>
        </div>

        <div className="rounded-2xl border border-border p-4 bg-card text-center">
          <Droplets className="h-7 w-7 mx-auto text-blue-500 mb-2" />
          <h3 className="font-bold text-sm">Minimal Watering</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Drought-tolerant roots that only require weekly or bi-weekly care.
          </p>
        </div>

        <div className="rounded-2xl border border-border p-4 bg-card text-center">
          <ShieldCheck className="h-7 w-7 mx-auto text-emerald-700 mb-2" />
          <h3 className="font-bold text-sm">Arrives Healthy Guarantee</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Specialized protective cornstarch shipping ensures pristine leaves.
          </p>
        </div>
      </section>

      {/* Plants Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">All Living Indoor Plants</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Showing <strong>{plantProducts.length}</strong> botanical plants & bonsai trees
            </p>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plantProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
