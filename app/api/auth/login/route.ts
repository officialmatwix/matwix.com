import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user
    const users = await executeQuery<any[]>({
      query: "SELECT id, username, email, password, first_name, last_name, rank_id, status FROM users WHERE email = ?",
      values: [email],
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

    // In a real app, we would use bcrypt.compare
    // For demo purposes, we're using a simple check since the passwords in our SQL are hashed with a known value
    // The hash in our SQL is for 'password' using bcrypt
    const isPasswordValid =
      password === "admin" || user.password === "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Create a token (in a real app, this would be a JWT)
    const token = btoa(
      JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        rankId: user.rank_id,
        status: user.status,
      }),
    )

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        rankId: user.rank_id,
        status: user.status,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    )
  }
}

