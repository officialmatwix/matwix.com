"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { MatrixRain } from "@/components/matrix-rain"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!email) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // In a real app, you would make an API call here
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset request failed:", error)
      setError("Failed to send reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects */}
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black z-0"></div>

      {/* Forgot Password form */}
      <div className="w-full max-w-md z-10 p-6">
        <div className="text-center mb-8">
          <img src="/images/mwwhite.png" alt="Matwix Logo" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white tracking-wider">PASSWORD RECOVERY</h1>
          <div className="text-cyan-500 text-sm mt-2 font-mono">VERIFICATION REQUIRED</div>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            {isSubmitted ? (
              <div className="p-4 bg-green-900/30 border border-green-700/50 rounded-md mb-4">
                <p className="text-green-400 text-center">
                  If an account exists for {email}, you will receive a password reset link shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-500" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError("")
                        }}
                        placeholder="neo@matrix.com"
                        className="w-full pl-10 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700/50 text-center">
            <span className="text-slate-400 text-sm">Remember your password?</span>{" "}
            <Link href="/login" className="text-cyan-500 hover:text-cyan-400 text-sm font-medium">
              Back to Login
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
