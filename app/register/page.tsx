"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MatrixRain } from "@/components/matrix-rain"
import { QuantumCircuit } from "@/components/quantum-circuit"

// Mock function to check if sponsor exists
const checkSponsorExists = async (sponsorName: string): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock sponsor list - in a real app, this would be a database query
  const validSponsors = ["admin", "john", "sarah", "matrix", "neo"]
  return validSponsors.includes(sponsorName.toLowerCase())
}

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sponsorName: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sponsorName: "",
  })
  const [isCheckingSponsor, setIsCheckingSponsor] = useState(false)
  const [sponsorValid, setSponsorValid] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Reset sponsor validation when sponsor name changes
    if (name === "sponsorName") {
      setSponsorValid(null)
    }
  }

  // Check sponsor name when user stops typing
  useEffect(() => {
    const checkSponsor = async () => {
      if (formData.sponsorName && formData.sponsorName.length > 2) {
        setIsCheckingSponsor(true)
        try {
          const exists = await checkSponsorExists(formData.sponsorName)
          setSponsorValid(exists)
          if (!exists) {
            setErrors((prev) => ({
              ...prev,
              sponsorName: "Sponsor not found. Please enter a valid sponsor name.",
            }))
          }
        } catch (error) {
          console.error("Error checking sponsor:", error)
        } finally {
          setIsCheckingSponsor(false)
        }
      }
    }

    const timeoutId = setTimeout(checkSponsor, 500)
    return () => clearTimeout(timeoutId)
  }, [formData.sponsorName])

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name) {
      newErrors.name = "Name is required"
      valid = false
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    if (!formData.sponsorName) {
      newErrors.sponsorName = "Sponsor name is required"
      valid = false
    } else if (sponsorValid === false) {
      newErrors.sponsorName = "Sponsor not found. Please enter a valid sponsor name."
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // In a real app, you would make an API call here
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      router.push("/login")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <MatrixRain />
      </div>
      <div className="absolute inset-0 z-0 opacity-10">
        <QuantumCircuit />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black z-0"></div>

      {/* Glowing orbs */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Register card */}
      <div className="w-full max-w-md z-10 p-6">
        <div className="text-center mb-8">
          <img src="/images/mwwhite.png" alt="Matwix Logo" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white tracking-wider">REGISTRATION PORTAL</h1>
          <div className="text-cyan-500 text-sm mt-2 font-mono">NEW USER ENROLLMENT</div>
        </div>

        <Card className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-400">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Thomas Anderson"
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-400">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="neo@matrix.com"
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sponsorName" className="text-slate-400">
                  Sponsor Name
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="sponsorName"
                    name="sponsorName"
                    type="text"
                    placeholder="Enter your sponsor's username"
                    className={`pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 ${
                      sponsorValid === true
                        ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                        : sponsorValid === false
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "focus:border-cyan-500 focus:ring-cyan-500"
                    }`}
                    value={formData.sponsorName}
                    onChange={handleChange}
                  />
                  {isCheckingSponsor && (
                    <div className="absolute right-3 top-3">
                      <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {!isCheckingSponsor && sponsorValid === true && (
                    <div className="absolute right-3 top-3 text-green-500">✓</div>
                  )}
                </div>
                {errors.sponsorName && <p className="text-sm text-red-500">{errors.sponsorName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-400">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-400">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-cyan-500 hover:text-cyan-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-cyan-500 hover:text-cyan-400">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>

            <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/50">
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>

          <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700/50 text-center">
            <span className="text-slate-400 text-sm">Already have an account?</span>{" "}
            <Link href="/login" className="text-cyan-500 hover:text-cyan-400 text-sm font-medium">
              Login
            </Link>
          </div>
        </Card>

        <div className="text-center mt-6">
          <div className="text-xs text-slate-500 font-mono">SYSTEM STATUS: ONLINE</div>
          <div className="text-xs text-slate-500 font-mono mt-1">VERSION 2.0.4</div>
        </div>
      </div>
    </div>
  )
}

