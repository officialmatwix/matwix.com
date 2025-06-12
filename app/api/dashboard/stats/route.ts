import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "1" // Default to admin user if not specified

  try {
    // Get user's network position
    const networkPositions = await executeQuery<any[]>({
      query: `
        SELECT id, left_volume, right_volume, total_volume
        FROM network_positions
        WHERE user_id = ?
      `,
      values: [userId],
    })

    if (networkPositions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User network position not found",
        },
        { status: 404 },
      )
    }

    const networkPosition = networkPositions[0]

    // Get team size (all downline)
    const teamSizeResult = await executeQuery<any[]>({
      query: `
        WITH RECURSIVE downline AS (
          SELECT id, user_id, parent_id, level
          FROM network_positions
          WHERE id = ?
          
          UNION ALL
          
          SELECT np.id, np.user_id, np.parent_id, np.level
          FROM network_positions np
          JOIN downline d ON np.parent_id = d.id
        )
        SELECT COUNT(*) as team_size FROM downline WHERE id != ?
      `,
      values: [networkPosition.id, networkPosition.id],
    })

    // Get commission stats
    const commissionStats = await executeQuery<any[]>({
      query: `
        SELECT 
          SUM(amount) as total_earnings,
          SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN amount ELSE 0 END) as monthly_earnings,
          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_amount
        FROM commissions
        WHERE user_id = ?
      `,
      values: [userId],
    })

    // Get recent orders
    const recentOrders = await executeQuery<any[]>({
      query: `
        SELECT o.id, o.order_number, o.total_amount, o.total_pv, 
               o.status, o.payment_status, o.created_at,
               u.username, u.first_name, u.last_name
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 5
      `,
      values: [],
    })

    return NextResponse.json({
      success: true,
      data: {
        networkStats: {
          leftVolume: networkPosition.left_volume,
          rightVolume: networkPosition.right_volume,
          totalVolume: networkPosition.total_volume,
          teamSize: teamSizeResult[0].team_size,
        },
        commissionStats: {
          totalEarnings: commissionStats[0].total_earnings || 0,
          monthlyEarnings: commissionStats[0].monthly_earnings || 0,
          pendingAmount: commissionStats[0].pending_amount || 0,
        },
        recentOrders,
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
