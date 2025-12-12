import { NextResponse } from "next/server"

const users: Array<{ id: string; name: string; email: string; password: string }> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user exists
    if (users.find((u) => u.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create user (in production, hash password with bcrypt)
    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // WARNING: Never store plaintext passwords in production!
    }
    users.push(user)

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: `mock-token-${user.id}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
