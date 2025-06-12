import { createClient } from "edgedb"

async function seed() {
  const client = createClient()

  console.log("Creating test user...")

  // Create a test rank
  await client.query(`
    INSERT Rank {
      name := "Admin",
      description := "Administrator",
      level := 1
    }
    UNLESS CONFLICT ON .name
  `)

  // Create a test user
  await client.query(`
    INSERT User {
      username := "admin",
      email := "admin@example.com",
      password := "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
      firstName := "Admin",
      lastName := "User",
      status := "active",
      rank := (SELECT Rank FILTER .name = "Admin")
    }
    UNLESS CONFLICT ON .email
  `)

  console.log("Seed completed successfully!")
}

seed().catch((err) => {
  console.error("Seed error:", err)
  process.exit(1)
})
