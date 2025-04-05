import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    const products = await executeQuery<any[]>({
      query: `
        SELECT p.id, p.name, p.description, p.price, p.pv, 
               p.category, p.image_url, p.status,
               pi.quantity
        FROM products p
        LEFT JOIN product_inventory pi ON p.id = pi.product_id
        ORDER BY p.category, p.name
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

