import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const networkData = await executeQuery<any[]>({
      query: `
        SELECT np.id, np.user_id, np.parent_id, np.position, 
               np.left_child_id, np.right_child_id, 
               np.left_volume, np.right_volume, np.total_volume, np.level,
               u.username, u.first_name, u.last_name, r.name as rank_name
        FROM network_positions np
        JOIN users u ON np.user_id = u.id
        JOIN ranks r ON u.rank_id = r.id
        ORDER BY np.level, np.id
      `,
      values: [],
    })

    return NextResponse.json({
      success: true,
      data: networkData,
    })
  } catch (error) {
    console.error("Error fetching network data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch network data",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

