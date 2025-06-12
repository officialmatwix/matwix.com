import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would hash the password and compare with the stored hash
    const users = await executeQuery<any[]>({
      query: "SELECT id, username, email FROM users WHERE email = ? AND password = ? LIMIT 1",
      values: [email, password], // In production, NEVER store or compare plain text passwords
    })

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    const user = users[0]

    // In a real app, you would create a JWT or session here
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
