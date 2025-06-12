// This is a server-only module
import { createClient } from "edgedb"

// Ensure this module is only used on the server
if (typeof window !== "undefined") {
  throw new Error("This module can only be used on the server")
}

// Create a singleton client
let client: ReturnType<typeof createClient> | null = null

export function getClient() {
  if (!client) {
    client = createClient()
  }
  return client
}

export async function executeQuery<T>(query: string, args?: any): Promise<T> {
  try {
    const client = getClient()
    const result = await client.queryJSON(query, args)
    return JSON.parse(result) as T
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
