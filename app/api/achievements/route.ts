import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  try {
    let query = `
      SELECT a.id, a.user_id, a.title, a.description, 
             a.type, a.achieved_at,
             u.username, u.first_name, u.last_name
      FROM achievements a
      JOIN users u ON a.user_id = u.id
    `

    const values: any[] = []

    if (userId) {
      query += ` WHERE a.user_id = ?`
      values.push(userId)
    }

    query += ` ORDER BY a.achieved_at DESC LIMIT 100`

    const achievements = await executeQuery<any[]>({
      query,
      values,
    })

    return NextResponse.json({
      success: true,
      data: achievements,
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch achievements",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

