"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Atom animation */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-r-4 border-cyan-400 animate-spin-slow"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Particles */}
        <div className="absolute -top-12 -left-12 w-48 h-48 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Loading Quantum Dashboard</h2>

      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-slate-400 text-sm flex items-center">
        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
        Initializing quantum systems...
      </p>
    </div>
  )
}
