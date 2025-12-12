"use client"

import { products as ALL, type Product } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"
import { FreeGift } from "@/components/free-gift"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Filters = {
  categories: Set<Product["category"]>
  subcats: Set<string>
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sort?: "price-asc" | "price-desc" | "rating-desc"
}

const SUBCATS: Record<Product["category"], string[]> = {
  furniture: ["chairs", "tables", "shelves"],
  decor: ["lamps", "rugs", "planters", "wall-art"],
  plants: ["bonsai", "indoor"],
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>({
    categories: new Set(["furniture", "decor", "plants"]),
    subcats: new Set(),
    sort: "rating-desc",
  })

  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [minRating, setMinRating] = useState<string>("")

  const filtered = useMemo(() => {
    let out = [...ALL]
    // Filter categories
    out = out.filter((p) => filters.categories.has(p.category))
    // Filter subcategories
    if (filters.subcats.size) {
      out = out.filter((p) => filters.subcats.has(p.subcategory))
    }
    // Price range
    const min = Number(minPrice) || undefined
    const max = Number(maxPrice) || undefined
    if (min !== undefined) out = out.filter((p) => p.price >= min)
    if (max !== undefined) out = out.filter((p) => p.price <= max)
    // Rating filter
    const r = Number(minRating) || undefined
    if (r !== undefined) out = out.filter((p) => p.rating >= r)
    // Sort
    if (filters.sort === "price-asc") out.sort((a, b) => a.price - b.price)
    if (filters.sort === "price-desc") out.sort((a, b) => b.price - a.price)
    if (filters.sort === "rating-desc") out.sort((a, b) => b.rating - a.rating)
    return out
  }, [filters, minPrice, maxPrice, minRating])

  const toggleCat = (c: Product["category"]) => {
    const next = new Set(filters.categories)
    next.has(c) ? next.delete(c) : next.add(c)
    setFilters({ ...filters, categories: next })
  }
  const toggleSub = (s: string) => {
    const next = new Set(filters.subcats)
    next.has(s) ? next.delete(s) : next.add(s)
    setFilters({ ...filters, subcats: next })
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      {/* Internal Navigation */}
      <nav aria-label="Categories" className="mb-6">
        <ul className="flex flex-wrap items-center gap-3 text-sm">
          <li>
            <a href="#furniture" className="underline-offset-4 hover:underline">
              Furniture
            </a>
          </li>
          <li>
            <a href="#decor" className="underline-offset-4 hover:underline">
              Decor
            </a>
          </li>
          <li>
            <a href="#ecoplant" className="underline-offset-4 hover:underline">
              EcoPlant
            </a>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside aria-label="Filter and sort" className="rounded-md border p-4 h-fit lg:sticky lg:top-24">
          <h2 className="font-semibold mb-3">Filter & Sort</h2>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              {(["furniture", "decor", "plants"] as const).map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm mb-1">
                  <Checkbox
                    checked={filters.categories.has(c)}
                    onCheckedChange={() => toggleCat(c)}
                    aria-label={`Filter by ${c}`}
                  />
                  <span className="capitalize">{c}</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Subcategories</h3>
              {Object.entries(SUBCATS).flatMap(([k, arr]) =>
                arr.map((s) => (
                  <label key={`${k}-${s}`} className="flex items-center gap-2 text-sm mb-1">
                    <Checkbox
                      checked={filters.subcats.has(s)}
                      onCheckedChange={() => toggleSub(s)}
                      aria-label={`Filter by ${s}`}
                    />
                    <span className="capitalize">{s.replace("-", " ")}</span>
                  </label>
                )),
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="minPrice">Min Price</Label>
                <Input
                  id="minPrice"
                  inputMode="numeric"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input
                  id="maxPrice"
                  inputMode="numeric"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="20000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="minRating">Min Rating</Label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger id="minRating">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5★</SelectItem>
                  <SelectItem value="4">4★ & up</SelectItem>
                  <SelectItem value="3">3★ & up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={filters.sort} onValueChange={(v: Filters["sort"]) => setFilters({ ...filters, sort: v })}>
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">Top Rated</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  categories: new Set(["furniture", "decor", "plants"]),
                  subcats: new Set(),
                  sort: "rating-desc",
                })
                setMinPrice("")
                setMaxPrice("")
                setMinRating("")
              }}
            >
              Reset Filters
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="#furniture" className="underline-offset-4 hover:underline">
                  Chairs / Tables / Shelves
                </Link>
              </li>
              <li>
                <Link href="#decor" className="underline-offset-4 hover:underline">
                  Lamps / Rugs / Planters / Wall Art
                </Link>
              </li>
              <li>
                <Link href="#ecoplant" className="underline-offset-4 hover:underline">
                  Bonsai / Indoor Plants
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Product Grid */}
        <section className="space-y-10">
          <FreeGift />

          <section id="furniture" aria-labelledby="title-furniture">
            <h2 id="title-furniture" className="text-xl font-semibold mb-4">
              Furniture ({filtered.filter((p) => p.category === "furniture").length})
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filtered
                .filter((p) => p.category === "furniture")
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </section>

          <section id="decor" aria-labelledby="title-decor">
            <h2 id="title-decor" className="text-xl font-semibold mb-4">
              Decor ({filtered.filter((p) => p.category === "decor").length})
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filtered
                .filter((p) => p.category === "decor")
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </section>

          <section id="ecoplant" aria-labelledby="title-plants">
            <h2 id="title-plants" className="text-xl font-semibold mb-4">
              EcoPlant: Bonsai & Indoor Plants ({filtered.filter((p) => p.category === "plants").length})
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filtered
                .filter((p) => p.category === "plants")
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
