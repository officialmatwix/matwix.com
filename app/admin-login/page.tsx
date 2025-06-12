"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("admin")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Call the admin login API endpoint
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("auth_token", data.token)

        // Also set a cookie
        document.cookie = `auth_token=${data.token}; path=/; max-age=86400; SameSite=Lax`

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError(data.message || "Admin login failed")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during admin login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-slate-900 p-6 rounded-lg border border-slate-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {error && <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md"
            >
              {isLoading ? "Logging in..." : "Login as Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
