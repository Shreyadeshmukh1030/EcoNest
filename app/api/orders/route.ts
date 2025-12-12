import { NextResponse } from "next/server"

const orders: Array<{
  id: string
  userId: string
  items: Array<{ id: string; qty: number; price: number }>
  total: number
  status: string
  createdAt: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items, total } = body

    const order = {
      id: `order-${Date.now()}`,
      userId,
      items,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }
    orders.push(order)

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (userId) {
    return NextResponse.json(orders.filter((o) => o.userId === userId))
  }
  return NextResponse.json(orders)
}
