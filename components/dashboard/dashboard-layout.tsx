"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Command,
  DollarSign,
  Gift,
  Award,
  Moon,
  Network,
  Search,
  Settings,
  Sun,
  UserPlus,
  Users,
  Menu,
  Code,
  BookOpen,
  Sparkles,
  Globe,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { useMLMData } from "@/context/mlm-data-context"
import { useLanguage } from "@/context/language-context"
import UserAvatarMenu from "@/components/user-avatar-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, setTheme } = useTheme()
  const { networkGrowth, rankProgress, recruitmentStatus } = useMLMData()
  const { language, setLanguage, t } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">NETWORK INITIALIZING</div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center">
            <Link href="/dashboard">
              <img src="/images/mwwhite.png" alt="Matrix Logo" className="h-8 sm:h-10 w-auto" />
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={`${t("search")}...`}
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Language toggle */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleLanguage}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("notifications")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("toggleTheme")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <UserAvatarMenu
                user={{
                  name: "John Doe",
                  email: "john.doe@example.com",
                  role: "Gold Member",
                }}
              />

              {/* Mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-slate-100">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[350px] bg-slate-900/95 border-slate-700/50 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-slate-700/50">
                      <Link href="/dashboard" className="flex items-center">
                        <img src="/images/mwwhite.png" alt="Matrix Logo" className="h-8 w-auto mr-2" />
                      </Link>
                    </div>
                    <div className="p-4 flex-1 overflow-auto">
                      <nav className="space-y-2">
                        <MobileNavItem
                          icon={Command}
                          label={t("dashboard")}
                          href="/dashboard"
                          active={pathname === "/dashboard"}
                        />
                        <MobileNavItem
                          icon={Network}
                          label={t("network")}
                          href="/dashboard/network"
                          active={pathname === "/dashboard/network"}
                        />
                        <MobileNavItem
                          icon={Users}
                          label={t("team")}
                          href="/dashboard/team"
                          active={pathname === "/dashboard/team"}
                        />
                        <MobileNavItem
                          icon={DollarSign}
                          label={t("commissions")}
                          href="/dashboard/commissions"
                          active={pathname === "/dashboard/commissions"}
                        />
                        <MobileNavItem
                          icon={Gift}
                          label={t("products")}
                          href="/dashboard/products"
                          active={pathname === "/dashboard/products"}
                        />
                        <MobileNavItem
                          icon={UserPlus}
                          label={t("recruitment")}
                          href="/dashboard/recruitment"
                          active={pathname === "/dashboard/recruitment"}
                        />
                        <MobileNavItem
                          icon={Award}
                          label={t("achievements")}
                          href="/dashboard/achievements"
                          active={pathname === "/dashboard/achievements"}
                        />
                        <MobileNavItem
                          icon={BookOpen}
                          label={t("academy")}
                          href="/dashboard/academy"
                          active={pathname === "/dashboard/academy"}
                        />
                        <MobileNavItem
                          icon={Sparkles}
                          label={t("ai")}
                          href="/dashboard/ai"
                          active={pathname === "/dashboard/ai"}
                        />
                        <MobileNavItem
                          icon={Code}
                          label={t("terminal")}
                          href="/dashboard/terminal"
                          active={pathname === "/dashboard/terminal"}
                        />
                        <MobileNavItem
                          icon={Settings}
                          label={t("settings")}
                          href="/dashboard/settings"
                          active={pathname === "/dashboard/settings"}
                        />
                      </nav>

                      <div className="mt-8 pt-6 border-t border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-2 font-mono">{t("networkStatus")}</div>
                        <div className="space-y-3">
                          <StatusItem label={t("networkGrowth")} value={networkGrowth} color="cyan" />
                          <StatusItem label={t("rankProgress")} value={rankProgress} color="green" />
                          <StatusItem label={t("recruitment")} value={recruitmentStatus} color="blue" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden md:block md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4 pt-6">
                <nav className="space-y-2">
                  <NavItem icon={Command} label={t("dashboard")} href="/dashboard" active={pathname === "/dashboard"} />
                  <NavItem
                    icon={Network}
                    label={t("network")}
                    href="/dashboard/network"
                    active={pathname === "/dashboard/network"}
                  />
                  <NavItem
                    icon={Users}
                    label={t("team")}
                    href="/dashboard/team"
                    active={pathname === "/dashboard/team"}
                  />
                  <NavItem
                    icon={DollarSign}
                    label={t("commissions")}
                    href="/dashboard/commissions"
                    active={pathname === "/dashboard/commissions"}
                  />
                  <NavItem
                    icon={Gift}
                    label={t("products")}
                    href="/dashboard/products"
                    active={pathname === "/dashboard/products"}
                  />
                  <NavItem
                    icon={UserPlus}
                    label={t("recruitment")}
                    href="/dashboard/recruitment"
                    active={pathname === "/dashboard/recruitment"}
                  />
                  <NavItem
                    icon={Award}
                    label={t("achievements")}
                    href="/dashboard/achievements"
                    active={pathname === "/dashboard/achievements"}
                  />
                  <NavItem
                    icon={BookOpen}
                    label={t("academy")}
                    href="/dashboard/academy"
                    active={pathname === "/dashboard/academy"}
                  />
                  <NavItem icon={Sparkles} label={t("ai")} href="/dashboard/ai" active={pathname === "/dashboard/ai"} />
                  <NavItem
                    icon={Code}
                    label={t("terminal")}
                    href="/dashboard/terminal"
                    active={pathname === "/dashboard/terminal"}
                  />
                  <NavItem
                    icon={Settings}
                    label={t("settings")}
                    href="/dashboard/settings"
                    active={pathname === "/dashboard/settings"}
                  />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">{t("networkStatus")}</div>
                  <div className="space-y-3">
                    <StatusItem label={t("networkGrowth")} value={networkGrowth} color="cyan" />
                    <StatusItem label={t("rankProgress")} value={rankProgress} color="green" />
                    <StatusItem label={t("recruitment")} value={recruitmentStatus} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area - full width on mobile */}
          <div className="col-span-1 md:col-span-9 lg:col-span-10">{children}</div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  )
}

// Component for mobile nav items
function MobileNavItem({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link href={href} className="block">
      <Button
        variant="ghost"
        className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      >
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
