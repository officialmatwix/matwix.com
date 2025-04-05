import Link from "next/link"
import ParticleText from "@/components/particle-text"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Login/Register buttons positioned at top right with better mobile spacing */}
      <div className="fixed top-4 right-4 z-20 flex gap-2">
        <Link
          href="/login"
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity text-center text-xs sm:text-sm"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700 text-center text-xs sm:text-sm"
        >
          Register
        </Link>
      </div>

      {/* Full-screen particle text with better mobile handling */}
      <div className="w-full h-screen">
        <ParticleText />
      </div>
    </main>
  )
}

