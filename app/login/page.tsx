"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MatrixRain } from "@/components/matrix-rain"
import { login } from "@/lib/auth-service"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects */}
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black z-0"></div>

      {/* Login form */}
      <div className="w-full max-w-md z-10 p-6">
        <div className="text-center mb-8">
          <img src="/images/mwwhite.png" alt="Matwix Logo" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white tracking-wider">ACCESS PORTAL</h1>
          <div className="text-cyan-500 text-sm mt-2 font-mono">AUTHENTICATION REQUIRED</div>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin"
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500 focus:ring-offset-slate-800"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="text-cyan-500 hover:text-cyan-400">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200"
                  >
                    {isLoading ? "Authenticating..." : "Sign in"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700/50 text-center">
            <span className="text-slate-400 text-sm">Don't have an account?</span>{" "}
            <Link href="/register" className="text-cyan-500 hover:text-cyan-400 text-sm font-medium">
              Register
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <div className="text-xs text-slate-500 font-mono">SYSTEM STATUS: ONLINE</div>
          <div className="text-xs text-slate-500 font-mono mt-1">VERSION 2.0.4</div>
        </div>
      </div>
    </div>
  )
}
