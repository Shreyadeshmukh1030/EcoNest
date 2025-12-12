import { products } from "@/lib/data/products"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  return NextResponse.json(product)
}
