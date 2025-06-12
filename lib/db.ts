import mysql from "mysql2/promise"
import { headers } from "next/headers"

// This line ensures this module is only used on the server
const isServer = typeof window === "undefined"

// Create a connection pool only on the server
const getPool = () => {
  if (!isServer) {
    throw new Error("Database connection can only be used on the server")
  }

  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
}

// We'll create the pool lazily when it's needed
let pool: mysql.Pool | null = null

// Define the type for the query config
export interface QueryConfig {
  query: string
  values?: any[]
}

export async function executeQuery<T>(queryConfig: QueryConfig): Promise<T> {
  try {
    // Force this function to be server-side only
    headers() // This will throw an error if called from client-side

    if (!pool) {
      pool = getPool()
    }

    const [results] = await pool.execute(queryConfig.query, queryConfig.values || [])
    return results as T
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Don't export the pool directly
