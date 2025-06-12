import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Get achievements data from the database
    const achievements = await executeQuery<any[]>({
      query: `
        SELECT 
          a.id, a.name, a.description, a.points, a.badge_url,
          COUNT(ae.id) as earned_count
        FROM achievements a
        LEFT JOIN achievements_earned ae ON a.id = ae.achievement_id
        GROUP BY a.id
        ORDER BY a.points DESC
      `,
      values: [],
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
