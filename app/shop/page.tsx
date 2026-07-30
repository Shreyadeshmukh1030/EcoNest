"use client"

import { useState, useMemo } from "react"
import { products, type Product } from "@/lib/data/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react"
import Image from "next/image"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<number>(10000)
  const [sortBy, setSortBy] = useState<string>("rating-desc")
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false)

  // Get unique materials
  const materials = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      if (p.material) set.add(p.material)
    })
    return Array.from(set)
  }, [])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let out = [...products]

    if (selectedCategory !== "all") {
      out = out.filter((p) => p.category === selectedCategory)
    }

    if (selectedMaterial !== "all") {
      out = out.filter((p) => p.material === selectedMaterial)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      out = out.filter((p) => {
        const text = [p.name, p.material, p.description, ...(p.tags || [])].join(" ").toLowerCase()
        return text.includes(q)
      })
    }

    out = out.filter((p) => p.price <= maxPrice)

    if (sortBy === "price-asc") out.sort((a, b) => a.price - b.price)
    if (sortBy === "price-desc") out.sort((a, b) => b.price - a.price)
    if (sortBy === "rating-desc") out.sort((a, b) => b.rating - a.rating)

    return out
  }, [selectedCategory, selectedMaterial, searchQuery, maxPrice, sortBy])

  const handleResetFilters = () => {
    setSelectedCategory("all")
    setSelectedMaterial("all")
    setSearchQuery("")
    setMaxPrice(10000)
    setSortBy("rating-desc")
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      {/* Header Banner */}
      <header className="mb-8 relative rounded-2xl overflow-hidden border border-border shadow-md bg-card">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-living-room.jpg"
            alt="Naturally styled eco-friendly living room"
            fill
            className="object-cover opacity-25 dark:opacity-15"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 p-6 sm:p-10 md:p-12">
          <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">🌱 Sustainability First</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pretty">
            Eco-Friendly Catalog
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base">
            Discover artisan-crafted home décor, biodegradable furniture, and living plants designed to reduce carbon footprints without compromising style.
          </p>
        </div>
      </header>

      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by product name, material, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex-1 h-11"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters {selectedCategory !== "all" || selectedMaterial !== "all" ? "(Active)" : ""}
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="h-11 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="rating-desc">★ Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
        {/* Desktop Filter Sidebar / Responsive Mobile Drawer */}
        <aside
          className={`${
            mobileFilterOpen
              ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto block md:static md:p-0 md:bg-transparent"
              : "hidden md:block"
          } md:col-span-1 space-y-6 rounded-xl border border-border bg-card p-5`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-border md:hidden">
              <h2 className="font-serif text-lg font-bold">Filter Catalog</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFilterOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-sm mb-3">Category</h3>
            <div className="space-y-1.5">
              {[
                { label: "All Products", value: "all" },
                { label: "Gifts to Give 🎁", value: "gifts" },
                { label: "Living Plants 🌿", value: "plants" },
                { label: "Furniture", value: "furniture" },
                { label: "Home Décor", value: "decor" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value)
                    if (mobileFilterOpen) setMobileFilterOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Material</h3>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              aria-label="Filter by material"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Materials</option>
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="price-slider" className="font-semibold text-sm">
                Max Price
              </label>
              <span className="text-xs font-bold text-primary">₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              id="price-slider"
              type="range"
              min={500}
              max={10000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price filter"
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-border">
            <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={handleResetFilters}>
              Reset All Filters
            </Button>
          </div>
        </aside>

        {/* Product Listing Grid */}
        <section className="md:col-span-3 lg:col-span-4">
          {/* Active filter badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">
              Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "product" : "products"}
            </span>
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedCategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}
            {selectedMaterial !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Material: {selectedMaterial}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedMaterial("all")} />
              </Badge>
            )}
            {maxPrice < 10000 && (
              <Badge variant="secondary" className="gap-1">
                Under ₹{maxPrice.toLocaleString("en-IN")}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setMaxPrice(10000)} />
              </Badge>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card">
              <p className="text-lg font-medium">No eco-friendly products match your filters</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try expanding your search or clearing active filters.
              </p>
              <Button variant="outline" onClick={handleResetFilters} className="mt-4">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
