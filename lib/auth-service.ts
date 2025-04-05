"use client"

// Client-side authentication service
// This file should only contain client-side code

// Function to simulate login
export async function login(email: string, password: string) {
  try {
    // Call the login API endpoint instead of directly accessing the database
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    const data = await response.json()

    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", data.token)

      // Also set a cookie for the middleware
      document.cookie = `auth_token=${data.token}; path=/; max-age=86400; SameSite=Lax`
    }

    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
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
    return JSON.parse(atob(token))
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

