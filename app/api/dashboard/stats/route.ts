import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Get dashboard statistics from the database
    const stats = await executeQuery<any[]>({
      query: `
        SELECT 
          (SELECT COUNT(*) FROM users) as totalUsers,
          (SELECT COUNT(*) FROM users WHERE status = 'active') as activeUsers,
          (SELECT SUM(amount) FROM commissions) as totalCommissions,
          (SELECT COUNT(*) FROM achievements_earned) as achievementsEarned
      `,
      values: [],
    })

    return NextResponse.json({
      success: true,
      data: stats[0],
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard statistics",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
