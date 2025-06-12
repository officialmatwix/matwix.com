import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Get commissions data from the database
    const commissions = await executeQuery<any[]>({
      query: `
        SELECT 
          c.id, c.user_id, c.amount, c.type, c.status, c.created_at,
          u.username, u.first_name, u.last_name
        FROM commissions c
        JOIN users u ON c.user_id = u.id
        ORDER BY c.created_at DESC
        LIMIT 100
      `,
      values: [],
    })

    return NextResponse.json({
      success: true,
      data: commissions,
    })
  } catch (error) {
    console.error("Error fetching commissions:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch commissions",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
