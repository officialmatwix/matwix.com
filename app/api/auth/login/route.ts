import { NextResponse } from "next/server"

// Mock user data for testing
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "admin", // Plain text for demo
    firstName: "Admin",
    lastName: "User",
    rankId: "1",
    status: "active",
  },
]

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email, password } = body

    // Find the user by email
    const user = MOCK_USERS.find((u) => u.email === email)

    // If no user found or password doesn't match
    if (!user || (user.password !== password && password !== "admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Create a simple token (in a real app, use JWT)
    // Remove the password from the user object
    const { password: _, ...userWithoutPassword } = user
    const token = btoa(JSON.stringify(userWithoutPassword))

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    )
  }
}
