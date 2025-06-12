"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MLMDataProvider } from "@/context/mlm-data-context"
import { MatwixCompensationProvider } from "@/context/matwix-compensation-context"
import { LanguageProvider } from "@/context/language-context"
import { UserAvatarMenu } from "@/components/user-avatar-menu"
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  Menu,
  Network,
  Package,
  Settings,
  Users,
  Bell,
  Award,
  DollarSign,
  Sparkles,
  Copy,
  Share2,
  Brain,
  Atom,
  Command,
  ChevronLeft,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { isAuthenticated } from "@/lib/auth-service"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function QuantumDashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [notifications, setNotifications] = useState(3)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsMounted(true)

    // Check authentication
    if (!isAuthenticated()) {
      router.push("/login")
    }

    // Set active section based on pathname
    const path = pathname?.split("/")[2] || "dashboard"
    setActiveSection(path)

    // Initialize particles background
    initParticles()

    // Listen for keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setShowCommandPalette((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [router, pathname])

  // Initialize particles background
  const initParticles = () => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
    }[] = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: getRandomColor(),
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    function getRandomColor() {
      const colors = ["#06b6d4", "#8b5cf6", "#3b82f6", "#10b981", "#f43f5e"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle =
          p.color +
          Math.floor(p.alpha * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle =
              p.color +
              Math.floor(p.alpha * 0.2 * 255)
                .toString(16)
                .padStart(2, "0")
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }

  const copyReferralLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText("https://matwix.com/join/ref/MX-7842")
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const shareReferralLink = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "Join Matwix",
        text: "Join my Matwix network using my referral link",
        url: "https://matwix.com/join/ref/MX-7842",
      })
    } else {
      copyReferralLink()
    }
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (!isMounted) {
    return null
  }

  return (
    <MatwixCompensationProvider>
      <MLMDataProvider>
        <LanguageProvider>
          <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
            {/* Particles background */}
            <canvas ref={particlesRef} className="fixed inset-0 z-0 opacity-20" />

            {/* Command palette */}
            <AnimatePresence>
              {showCommandPalette && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCommandPalette(false)}
                >
                  <motion.div
                    className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 border-b border-slate-800">
                      <div className="flex items-center">
                        <Command className="h-5 w-5 text-slate-500 mr-2" />
                        <input
                          type="text"
                          placeholder="Search commands..."
                          className="w-full bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                      <div className="p-2">
                        <div className="text-xs text-slate-500 px-2 py-1">Navigation</div>
                        {navItems.map((item) => (
                          <div
                            key={item.href}
                            className="flex items-center px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer"
                            onClick={() => {
                              router.push(item.href)
                              setShowCommandPalette(false)
                            }}
                          >
                            <item.icon className="h-4 w-4 text-slate-400 mr-2" />
                            <span className="text-slate-300">{item.label}</span>
                            <span className="ml-auto text-xs text-slate-500">{item.shortcut}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-slate-800">
                        <div className="text-xs text-slate-500 px-2 py-1">Actions</div>
                        <div className="flex items-center px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer">
                          <Users className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-slate-300">Add new team member</span>
                        </div>
                        <div className="flex items-center px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer">
                          <Share2 className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-slate-300">Share referral link</span>
                        </div>
                        <div className="flex items-center px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer">
                          <Brain className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-slate-300">Generate AI insights</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
              <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                <div className="flex items-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="mr-4 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-slate-950 border-slate-800 text-slate-50 w-64 p-0">
                      <div className="flex h-16 items-center border-b border-slate-800 px-6">
                        <Link href="/dashboard" className="flex items-center">
                          <div className="relative h-8 w-8">
                            <Atom className="h-8 w-8 text-purple-500 absolute animate-spin-slow" />
                            <Atom
                              className="h-8 w-8 text-cyan-500 absolute animate-spin-slower"
                              style={{ opacity: 0.7 }}
                            />
                          </div>
                        </Link>
                      </div>
                      <nav className="flex flex-col gap-1 p-4">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                              pathname === item.href
                                ? "bg-slate-800 text-slate-50"
                                : "text-slate-400 hover:text-slate-50 hover:bg-slate-800/50"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        ))}
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <Link href="/dashboard" className="flex items-center">
                    <div className="relative h-8 w-8">
                      <Atom className="h-8 w-8 text-purple-500 absolute animate-spin-slow" />
                      <Atom className="h-8 w-8 text-cyan-500 absolute animate-spin-slower" style={{ opacity: 0.7 }} />
                    </div>
                  </Link>
                </div>

                {/* Referral Link Section */}
                <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-4">
                  <div className="bg-slate-900/70 border border-slate-700/50 rounded-lg px-3 py-1.5 flex items-center justify-between w-full">
                    <div className="flex items-center min-w-0">
                      <span className="text-xs font-mono text-slate-400 whitespace-nowrap mr-2">ID: MX-7842</span>
                      <span className="text-xs text-slate-300 truncate">https://matwix.com/join/ref/MX-7842</span>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-slate-400 hover:text-cyan-400"
                              onClick={copyReferralLink}
                              aria-label="Copy referral link"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isCopied ? "Copied!" : "Copy referral link"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-slate-400 hover:text-cyan-400"
                              onClick={shareReferralLink}
                              aria-label="Share referral link"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Share referral link</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-slate-100 hidden md:flex items-center"
                    onClick={() => setShowCommandPalette(true)}
                  >
                    <Command className="h-4 w-4 mr-1" />
                    <span>Ctrl+K</span>
                  </Button>

                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                    <Globe className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    )}
                  </Button>

                  <UserAvatarMenu />
                </div>
              </div>
            </header>

            {/* Main content */}
            <div className="flex flex-1">
              {/* Sidebar */}
              <aside
                className={`hidden md:flex md:flex-col border-r border-slate-800 bg-slate-950/80 transition-all duration-300 ${isCollapsed ? "md:w-16" : "md:w-64"}`}
              >
                <div className="flex justify-end p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-500 hover:text-slate-300"
                    onClick={toggleSidebar}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </div>
                <nav className="flex flex-col gap-1 p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-slate-50"
                          : "text-slate-400 hover:text-slate-50 hover:bg-slate-800/50"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${pathname === item.href ? "text-purple-400" : ""}`} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  ))}
                </nav>

                {/* Status indicators */}
                {!isCollapsed && (
                  <div className="mt-auto p-4 border-t border-slate-800">
                    <div className="space-y-2">
                      {statusItems.map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 text-slate-500" />
                            <span className="text-xs text-slate-500">{item.label}</span>
                          </div>
                          <span className={`text-xs ${item.color}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </aside>

              {/* Content */}
              <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-950 p-4 sm:p-6 relative">
                {/* Glow effects */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Main content */}
                <div className="relative z-10">{children}</div>
              </main>
            </div>
          </div>
        </LanguageProvider>
      </MLMDataProvider>
    </MatwixCompensationProvider>
  )
}

// Navigation items
const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
    shortcut: "D",
  },
  {
    href: "/dashboard/network",
    label: "Binary Network",
    icon: Network,
    shortcut: "N",
  },
  {
    href: "/dashboard/team",
    label: "Team",
    icon: Users,
    shortcut: "T",
  },
  {
    href: "/dashboard/compensation",
    label: "Compensation Plan",
    icon: Award,
    shortcut: "C",
  },
  {
    href: "/dashboard/bonuses",
    label: "Bonus History",
    icon: DollarSign,
    shortcut: "B",
  },
  {
    href: "/dashboard/commissions",
    label: "Commissions",
    icon: CreditCard,
    shortcut: "M",
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Package,
    shortcut: "P",
  },
  {
    href: "/dashboard/recruitment",
    label: "Recruitment",
    icon: ChevronRight,
    shortcut: "R",
  },
  {
    href: "/dashboard/achievements",
    label: "Achievements",
    icon: Award,
    shortcut: "A",
  },
  {
    href: "/dashboard/ai",
    label: "AI Assistant",
    icon: Sparkles,
    shortcut: "I",
  },
  {
    href: "/dashboard/insights",
    label: "Quantum Insights",
    icon: Brain,
    shortcut: "Q",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    shortcut: "S",
  },
]

// Status indicators
const statusItems = [
  {
    label: "Rank",
    value: "Specialist",
    icon: Award,
    color: "text-violet-400",
  },
  {
    label: "Network Growth",
    value: "+15.3%",
    icon: BarChart3,
    color: "text-cyan-400",
  },
  {
    label: "Team Activity",
    value: "68%",
    icon: Users,
    color: "text-green-400",
  },
]
