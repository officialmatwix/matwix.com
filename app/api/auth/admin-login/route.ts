import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email, password } = body

    // For demo purposes, always allow admin@example.com with password admin
    if (email === "admin@example.com" && password === "admin") {
      const user = {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        rankId: "1",
        status: "active",
      }

      const token = btoa(JSON.stringify(user))

      // Return success response
      return NextResponse.json({
        success: true,
        message: "Admin login successful",
        user: user,
        token,
      })
    }

    // If credentials don't match
    return NextResponse.json(
      {
        success: false,
        message: "Invalid admin credentials",
      },
      { status: 401 },
    )
  } catch (error) {
    console.error("Admin login error:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during admin login",
      },
      { status: 500 },
    )
  }
}
