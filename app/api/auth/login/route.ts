import { NextResponse } from "next/server"

// In production, use NextAuth or proper JWT-based auth
const mockUsers = [{ id: "demo-user", name: "Demo User", email: "demo@econest.com", password: "demo123" }]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const user = mockUsers.find((u) => u.email === email && u.password === password)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: `mock-token-${user.id}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
