import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const result = await executeQuery<any[]>({
      query: "SELECT COUNT(*) as userCount FROM users",
      values: [],
    })

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: result[0],
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
