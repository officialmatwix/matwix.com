import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Get products data from the database
    const products = await executeQuery<any[]>({
      query: `
        SELECT 
          p.id, p.name, p.description, p.price, p.image_url, p.status,
          c.name as category_name
        FROM products p
        JOIN product_categories c ON p.category_id = c.id
        ORDER BY p.id
      `,
      values: [],
    })

    return NextResponse.json({
      success: true,
      data: products,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
