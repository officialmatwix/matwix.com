"use client"

// Client-side authentication service

// Function to handle login
export async function login(email: string, password: string) {
  try {
    // Call the login API endpoint
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    // Always try to parse the response as JSON first
    let data
    try {
      data = await response.json()
    } catch (e) {
      // If JSON parsing fails, get the text
      const text = await response.text()
      data = {
        success: false,
        message: `Server returned invalid response: ${text.substring(0, 100)}`,
      }
    }

    // If the response was not ok, throw an error with the message
    if (!response.ok) {
      throw new Error(data.message || `Login failed with status: ${response.status}`)
    }

    // Store token in localStorage if login was successful
    if (data.success && data.token) {
      localStorage.setItem("auth_token", data.token)
      // Also set a cookie for the middleware
      document.cookie = `auth_token=${data.token}; path=/; max-age=86400; SameSite=Lax`
    }

    return data
  } catch (error: any) {
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
    // Handle both JWT and simple base64 tokens
    return JSON.parse(atob(token.split(".")[1] || token))
  } catch (error) {
    console.error("Error parsing auth token:", error)
    // Clear invalid token
    localStorage.removeItem("auth_token")
    return null
  }
}

// Function to logout
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
    // Also clear the cookie
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax"
    // Redirect to login page
    window.location.href = "/login"
  }
}

// Function to check if user is authenticated
export function isAuthenticated() {
  return getCurrentUser() !== null
}
