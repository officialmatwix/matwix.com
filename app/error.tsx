"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Safely log the error to an error reporting service
    try {
      console.error("Application error:", error)
    } catch (e) {
      console.error("Failed to log error")
    }
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-6 text-slate-300">
          We apologize for the inconvenience. An error occurred while loading the application.
        </p>
        {error && error.message && (
          <div className="mb-6 p-4 bg-slate-800 rounded-md text-left overflow-auto max-h-32">
            <p className="text-sm font-mono text-red-400">{error.message}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
