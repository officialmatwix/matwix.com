"use client"

import type React from "react"

import { ArrowLeft, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface FocusedAcademyLayoutProps {
  children: React.ReactNode
  title?: string
}

export function FocusedAcademyLayout({ children, title = "Matwix Academy" }: FocusedAcademyLayoutProps) {
  const router = useRouter()

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black opacity-50 z-0"></div>
      <div className="relative z-10">
        <motion.header
          className="border-b border-gray-800 bg-black/50 backdrop-blur-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/dashboard/academy")}
                className="text-white hover:bg-gray-800/50"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Academy</span>
              </Button>
              <h1 className="text-xl font-bold flex items-center">
                <GraduationCap className="mr-2 h-6 w-6 text-purple-500" />
                {title}
              </h1>
            </div>
          </div>
        </motion.header>

        <main className="container py-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
