"use client"

import { products } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Gift, Heart, Sparkles, Truck, ShieldCheck, Leaf } from "lucide-react"
import Image from "next/image"

export default function GiftsPage() {
  const giftProducts = products.filter((p) => p.category === "gifts")

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      {/* Gift Header Hero Banner */}
      <header className="mb-10 relative rounded-3xl overflow-hidden border border-border shadow-lg bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-card">
        <div className="p-8 sm:p-12 md:p-16 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-600 text-white hover:bg-amber-700 px-3 py-1">
              🎁 Curated Sustainable Gifting
            </Badge>
            <Badge variant="outline" className="text-emerald-700 border-emerald-600/40">
              🌱 Zero Plastic Ribbon & Wrap
            </Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pretty leading-tight">
            Gifts That Keep Growing & Give Back
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Delight your loved ones, colleagues, and clients with artisanal luxury plant boxes, organic bamboo hampers, and zero-waste home bundles. Every gift hamper includes a complimentary plantable seed greeting card!
          </p>
        </div>
      </header>

      {/* Why Gifting Eco Matters Banner */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="rounded-2xl border border-border p-5 bg-card flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Artisan-Wrapped Hampers</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Wrapped in organic jute ribbon, handmade seeded paper, and biodegradable cornstarch cushioning.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-5 bg-card flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">1 Gift = 1 Tree Planted</h3>
            <p className="text-xs text-muted-foreground mt-1">
              We plant a native seedling in rural India for every single gift hamper purchased on EcoNest.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-5 bg-card flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 shrink-0">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Carbon-Neutral Doorstep Delivery</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Express priority dispatch across India with 100% zero-emission electric and solar transport.
            </p>
          </div>
        </div>
      </section>

      {/* Gifts Product Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">Explore Sustainable Gift Boxes</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Showing <strong>{giftProducts.length}</strong> handcrafted gift hampers & luxury bundles
            </p>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {giftProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
