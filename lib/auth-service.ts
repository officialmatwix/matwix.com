// Mock authentication service

// Store for our "database" of users
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
  },
]

// Function to simulate login
export async function login(email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find user
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Create a token (in a real app, this would be a JWT)
  const token = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }))

  // Store token in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)

    // Also set a cookie for the middleware
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  }
}

// Function to get the current user from the token
export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null
  }

  const token = localStorage.getItem("auth_token")

  if (!token) {
    return null
  }

  try {
    const userData = JSON.parse(atob(token))
    const user = users.find((u) => u.id === userData.id)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error("Error parsing auth token:", error)
    return null
  }
}

// Function to logout
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")

    // Also clear the cookie
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax"
  }
}

// Function to check if user is authenticated
export function isAuthenticated() {
  return getCurrentUser() !== null
}

