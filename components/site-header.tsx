"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, ShoppingCart, User, Menu, X, Trash2, ArrowRight, ShieldCheck } from "lucide-react"
import { useCart, useWishlist, useAuth } from "@/lib/store"
import { products } from "@/lib/data/products"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function SiteHeader() {
  const { items: cartItems, remove, setQty, clear } = useCart()
  const { items: wishItems } = useWishlist()
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const router = useRouter()

  const map = new Map(products.map((p) => [p.id, p]))
  const cartRows = cartItems
    .map((i) => ({ ...i, product: map.get(i.id)! }))
    .filter((r) => !!r.product)

  const cartSubtotal = cartRows.reduce((sum, r) => sum + r.product.price * r.qty, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setSearchOpen(false)
      setSearchTerm("")
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="EcoNest Home">
          <div className="relative h-10 w-10 rounded-full overflow-hidden shadow-md border border-emerald-500/20 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="EcoNest Official Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-serif text-2xl sm:text-3xl tracking-wide font-bold bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-700 dark:from-emerald-400 dark:to-emerald-200 bg-clip-text text-transparent">
            EcoNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-6 font-medium text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition-colors">
            Catalog
          </Link>
          <Link href="/plants" className="hover:text-primary transition-colors font-semibold text-emerald-700 dark:text-emerald-400">
            Plants 🌿
          </Link>
          <Link href="/gifts" className="hover:text-primary transition-colors font-semibold text-amber-600 dark:text-amber-400">
            Gifts 🎁
          </Link>
          <Link href="/impact" className="hover:text-primary transition-colors">
            Our Impact
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            Story
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary text-xs transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Admin
          </Link>
        </nav>

        {/* Header Icons & Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-primary transition-colors p-2.5 rounded-full hover:bg-muted"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-card border border-border rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search bamboo, chairs, lamps..."
                    autoFocus
                    className="text-sm h-10"
                  />
                  <Button type="submit" size="sm" className="h-10 px-3">
                    Search
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="hover:text-primary transition-colors relative p-2.5 rounded-full hover:bg-muted"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishItems.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-1 right-1 h-5 min-w-[1.25rem] flex items-center justify-center px-1 text-[11px] font-bold rounded-full bg-red-600 text-white"
              >
                {wishItems.length}
              </Badge>
            )}
          </Link>

          {/* Cart Drawer Button */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="hover:text-primary transition-colors relative p-2.5 rounded-full hover:bg-muted"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-1 right-1 h-5 min-w-[1.25rem] flex items-center justify-center px-1 text-[11px] font-bold rounded-full bg-emerald-600 text-white"
              >
                {cartItems.length}
              </Badge>
            )}
          </button>

          {/* Profile Icon */}
          <Link
            href={user ? "/profile" : "/login"}
            className="hover:text-primary transition-colors p-2.5 rounded-full hover:bg-muted"
            aria-label="User Profile"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-card border-t border-border px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-3 duration-200"
        >
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted font-medium text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted font-medium text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Catalog
            </Link>
            <Link
              href="/plants"
              className="px-3 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Plants 🌿
            </Link>
            <Link
              href="/gifts"
              className="px-3 py-2.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gifts 🎁
            </Link>
            <Link
              href="/impact"
              className="px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted font-medium text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Impact
            </Link>
            <Link
              href="/about"
              className="px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted font-medium text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Admin Dashboard
            </Link>
          </div>

          <div className="pt-3 border-t border-border">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-sm h-11"
              />
              <Button type="submit" size="sm" className="h-11 px-4">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </nav>
      )}

      {/* Slide-over Mini-Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setCartDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-50 w-full max-w-md bg-card border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
                <h2 className="font-serif text-lg font-bold">Your Eco Cart</h2>
                <Badge variant="secondary">{cartItems.length} items</Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartDrawerOpen(false)}
                aria-label="Close cart drawer"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartRows.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p className="text-muted-foreground text-sm">Your cart is currently empty.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCartDrawerOpen(false)
                      router.push("/products")
                    }}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cartRows.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-background"
                  >
                    <Link
                      href={`/products/${r.product.slug}`}
                      onClick={() => setCartDrawerOpen(false)}
                      className="relative h-14 w-14 rounded-md overflow-hidden bg-muted shrink-0"
                    >
                      <Image
                        src={r.product.image || "/placeholder.svg"}
                        alt={r.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${r.product.slug}`}
                        onClick={() => setCartDrawerOpen(false)}
                        className="font-medium text-sm hover:text-primary truncate block"
                      >
                        {r.product.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        ₹{r.product.price.toLocaleString("en-IN")} each
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-border rounded-md bg-muted/50 text-xs">
                        <button
                          onClick={() => setQty(r.id, Math.max(1, r.qty - 1))}
                          className="px-2 py-1 hover:bg-muted"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold">{r.qty}</span>
                        <button
                          onClick={() => setQty(r.id, r.qty + 1)}
                          className="px-2 py-1 hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(r.id)}
                        className="text-muted-foreground hover:text-red-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cartRows.length > 0 && (
              <div className="p-4 border-t border-border bg-muted/30 space-y-3">
                <div className="flex justify-between items-center font-semibold text-base">
                  <span>Subtotal:</span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setCartDrawerOpen(false)
                      router.push("/cart")
                    }}
                  >
                    View Cart
                  </Button>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => {
                      setCartDrawerOpen(false)
                      router.push("/checkout")
                    }}
                  >
                    Checkout →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
