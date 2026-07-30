"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { products, type Product } from "@/lib/data/products"
import { useCart, useWishlist } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { Heart, ShoppingCart, Star, ShieldCheck, Leaf, Truck, RotateCcw, ArrowLeft, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Review = {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

const DEFAULT_REVIEWS: Record<string, Review[]> = {
  default: [
    {
      id: "r1",
      author: "Ananya Sharma",
      rating: 5,
      date: "2024-10-15",
      comment: "Absolutely in love with the craftsmanship! You can truly feel the natural texture and quality.",
      verified: true,
    },
    {
      id: "r2",
      author: "Rohan Patel",
      rating: 5,
      date: "2024-11-02",
      comment: "Looks stunning in our living room. It's so refreshing to buy home décor without guilt!",
      verified: true,
    },
  ],
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const router = useRouter()
  const { add } = useCart()
  const { items: wishItems, toggle: toggleWishlist } = useWishlist()

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug || p.id === slug)
  }, [slug])

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(
    (product && DEFAULT_REVIEWS[product.id]) || DEFAULT_REVIEWS.default
  )
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [newAuthor, setNewAuthor] = useState("")
  const [imgError, setImgError] = useState(false)

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn&apos;t find an eco-friendly product matching that name.</p>
        <Button asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>
      </main>
    )
  }

  const wished = wishItems.some((w) => w.id === product.id)

  const handleAddToCart = () => {
    add(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const handleBuyNow = () => {
    add(product.id, qty)
    router.push("/checkout")
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !newAuthor.trim()) return
    const review: Review = {
      id: `r-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      comment: newComment.trim(),
      verified: true,
    }
    setReviews([review, ...reviews])
    setNewComment("")
    setNewAuthor("")
    setNewRating(5)
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.material === product.material))
    .slice(0, 4)

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb / Back button */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="inline-flex items-center hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Shop
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Product Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden bg-muted border border-border shadow-md">
            <Image
              src={imgError ? "/placeholder.svg" : product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                <Leaf className="h-3.5 w-3.5 mr-1" />
                100% Eco-Friendly
              </Badge>
              {product.material && (
                <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-md">
                  Material: {product.material}
                </Badge>
              )}
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                wished ? "bg-red-500 text-white scale-110" : "bg-white/90 hover:bg-white text-gray-700"
              }`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Eco-Impact Highlights */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
              <Leaf className="h-5 w-5 mx-auto text-emerald-600 mb-1" />
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Zero Plastic</div>
              <div className="text-[11px] text-muted-foreground">Biodegradable</div>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
              <ShieldCheck className="h-5 w-5 mx-auto text-amber-600 mb-1" />
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">Artisan-Crafted</div>
              <div className="text-[11px] text-muted-foreground">Ethical trade</div>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-center">
              <Truck className="h-5 w-5 mx-auto text-blue-600 mb-1" />
              <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">CO₂ Offset</div>
              <div className="text-[11px] text-muted-foreground">Carbon neutral</div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Buy Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="uppercase tracking-wider text-[11px]">
                {product.subcategory || product.category}
              </Badge>
              <div className="flex items-center text-amber-500 text-sm font-medium">
                <Star className="h-4 w-4 fill-current mr-1" />
                {product.rating}.0 ({reviews.length} customer reviews)
              </div>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-pretty tracking-tight">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              ₹{product.price.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-muted-foreground ml-2">Inclusive of all eco-taxes</span>
            </p>
          </div>

          <div className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed">
            <p>
              {product.description ||
                "Handcrafted from sustainably sourced, high-grade natural materials. Designed to elevate your home aesthetics while preserving our planet's ecological balance."}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {product.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary/70 text-secondary-foreground font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <hr className="border-border" />

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </label>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 transition-colors text-lg font-semibold"
                >
                  -
                </button>
                <span className="px-5 py-1.5 font-medium text-center min-w-[3rem]">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 transition-colors text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={added}
                className="flex-1 text-base h-12 shadow-sm"
              >
                {added ? (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBuyNow}
                className="flex-1 text-base h-12 border-primary text-primary hover:bg-primary/10"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Shipping Assurance */}
          <div className="rounded-xl bg-card border border-border p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free Carbon-Neutral Shipping on orders above ₹3,000</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>15-day hassle-free eco-return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16 border-t border-border pt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <h2 className="font-serif text-2xl font-bold mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-lg">{product.rating}.0 out of 5</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We value transparency and sustainable feedback. Share your thoughts on this product!
            </p>
          </div>

          {/* Submit Review Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-lg">Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya R."
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Rating</label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      >
                        <option value={5}>5 ★ - Excellent & Eco-Friendly</option>
                        <option value={4}>4 ★ - Very Good</option>
                        <option value={3}>3 ★ - Average</option>
                        <option value={2}>2 ★ - Needs Improvement</option>
                        <option value={1}>1 ★ - Poor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience with the craftsmanship and quality..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <Card key={rev.id} className="p-4 bg-card/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {rev.author}
                        {rev.verified && (
                          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
                            ✓ Verified Eco-Buyer
                          </Badge>
                        )}
                      </div>
                      <div className="flex text-amber-500 my-1">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{rev.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{rev.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold">You May Also Like</h2>
              <p className="text-sm text-muted-foreground">More sustainable picks from our collection</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-primary hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
