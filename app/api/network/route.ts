import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Get network data from the database
    const networkData = await executeQuery<any[]>({
      query: `
        SELECT 
          u.id, u.username, u.first_name, u.last_name, u.email, 
          u.sponsor_id, u.created_at, r.name as rank_name
        FROM users u
        JOIN ranks r ON u.rank_id = r.id
        ORDER BY u.sponsor_id, u.id
      `,
      values: [],
    })

    // Transform flat data into a hierarchical structure
    const transformedData = transformToHierarchy(networkData)

    return NextResponse.json({
      success: true,
      data: transformedData,
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

// Helper function to transform flat data into a hierarchical structure
function transformToHierarchy(data: any[]) {
  const map = new Map()
  const roots: any[] = []

  // First pass: create a map of id to node
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  // Second pass: link children to parents
  data.forEach((item) => {
    const node = map.get(item.id)
    if (item.sponsor_id === null) {
      // This is a root node
      roots.push(node)
    } else {
      // This is a child node
      const parent = map.get(item.sponsor_id)
      if (parent) {
        parent.children.push(node)
      } else {
        // If parent doesn't exist, treat as root
        roots.push(node)
      }
    }
  })

  return roots
}
