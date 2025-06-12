import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const users = await executeQuery<any[]>({
      query: `
        SELECT u.id, u.username, u.email, u.first_name, u.last_name, 
               u.phone, u.status, r.name as rank_name
        FROM users u
        JOIN ranks r ON u.rank_id = r.id
        ORDER BY u.id
        LIMIT 100
      `,
      values: [],
    })

    return NextResponse.json({
      success: true,
      data: users,
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
