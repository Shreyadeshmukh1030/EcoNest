"use client"

import type { Product } from "@/lib/data/products"
import { useCart, useWishlist } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const { items, toggle } = useWishlist()
  const wished = items.some((w) => w.id === product.id)
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleBuyNow = () => {
    add(product.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 relative overflow-hidden">
        <Link href={`/products#${product.slug}`} aria-label={`View ${product.name}`}>
          <div className="relative w-full h-60 bg-muted">
            <Image
              src={imgError ? "/placeholder.svg" : product.image}
              alt={product.name}
              fill
              className="object-cover rounded-t-md group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
        <button
          onClick={() => toggle(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            wished ? "bg-red-500 text-white scale-110" : "bg-white/80 hover:bg-white text-gray-700"
          }`}
          aria-pressed={wished}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
        </button>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-pretty leading-tight">{product.name}</h3>
          <Badge variant="secondary" className="shrink-0" aria-label={`${product.rating} out of 5 stars`}>
            {product.rating}★
          </Badge>
        </div>
        {product.description && <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>}
        <p className="text-sm text-muted-foreground">{product.material ?? "Eco-friendly"}</p>
        <p className="font-semibold text-lg">₹{product.price.toLocaleString("en-IN")}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-2 p-4 pt-0">
        <Button className="flex-1 transition-all" onClick={handleBuyNow} aria-label="Add to cart" disabled={added}>
          {added ? (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Added!
            </>
          ) : (
            "Buy Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
