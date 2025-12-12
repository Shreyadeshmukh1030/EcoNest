import { products } from "@/lib/data/products"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const minRating = searchParams.get("minRating")
  const sort = searchParams.get("sort")
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const page = Number.parseInt(searchParams.get("page") || "1")

  let filtered = [...products]

  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }
  if (subcategory) {
    filtered = filtered.filter((p) => p.subcategory === subcategory)
  }
  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= Number.parseInt(minPrice))
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number.parseInt(maxPrice))
  }
  if (minRating) {
    filtered = filtered.filter((p) => p.rating >= Number.parseInt(minRating))
  }

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price)
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price)
  if (sort === "rating-desc") filtered.sort((a, b) => b.rating - a.rating)

  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return NextResponse.json({
    products: paginated,
    total: filtered.length,
    page,
    limit,
  })
}
