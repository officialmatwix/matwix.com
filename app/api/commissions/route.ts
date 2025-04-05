import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  try {
    let query = `
      SELECT c.id, c.user_id, c.order_id, c.amount, c.type, 
             c.status, c.description, c.created_at
      FROM commissions c
    `

    const values: any[] = []

    if (userId) {
      query += ` WHERE c.user_id = ?`
      values.push(userId)
    }

    query += ` ORDER BY c.created_at DESC LIMIT 100`

    const commissions = await executeQuery<any[]>({
      query,
      values,
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

