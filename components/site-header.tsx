"use client"

import type React from "react"

import Link from "next/link"
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react"
import { useCart, useWishlist, useAuth } from "@/lib/store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function SiteHeader() {
  const { items: cartItems } = useCart()
  const { items: wishItems } = useWishlist()
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setSearchOpen(false)
      setSearchTerm("")
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="EcoNest Home">
          <span className="inline-block h-6 w-6 rounded-full bg-primary" aria-hidden="true" />
          <span className="font-serif text-xl tracking-wide">EcoNest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/impact" className="hover:text-primary transition-colors">
            Impact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-primary transition-colors p-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-md shadow-lg p-3 z-50">
                <form onSubmit={handleSearch}>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                  />
                </form>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link href="/wishlist" className="hover:text-primary transition-colors relative p-2" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishItems.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {wishItems.length}
              </Badge>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="hover:text-primary transition-colors relative p-2" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItems.length}
              </Badge>
            )}
          </Link>

          {/* Profile */}
          <Link
            href={user ? "/profile" : "/login"}
            className="hover:text-primary transition-colors p-2"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3"
        >
          <Link
            href="/"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/shop"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/impact"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Impact
          </Link>
          <div className="pt-3 border-t border-border">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </nav>
      )}
    </header>
  )
}
