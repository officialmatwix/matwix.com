"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Network,
  Users,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  Check,
  BookOpen,
  Globe,
  Brain,
  PenTool,
  Mic,
  ImageIcon,
  MessageSquare,
  Code,
  FileSearch,
  Wallet,
  Coins,
  ShoppingBag,
  Clock,
  MapPin,
  Eye,
  Bot,
  Sparkles,
  Play,
  Star,
  Rocket,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradient = "from-purple-500/20 to-blue-500/20",
}) => {
  return (
    <Card className="group relative overflow-hidden bg-slate-900/60 border border-slate-700/70 hover:border-purple-500/70 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />
      <CardContent className="relative p-6 text-center">
        <div className="mb-5 flex justify-center items-center h-16 w-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 group-hover:from-purple-600/30 group-hover:to-blue-600/30 mx-auto transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, color }) => {
  const colorMap: Record<string, string> = {
    purple: "hover:border-purple-500/70 hover:shadow-purple-500/30",
    blue: "hover:border-blue-500/70 hover:shadow-blue-500/30",
    emerald: "hover:border-emerald-500/70 hover:shadow-emerald-500/30",
    yellow: "hover:border-yellow-500/70 hover:shadow-yellow-500/30",
    indigo: "hover:border-indigo-500/70 hover:shadow-indigo-500/30",
    red: "hover:border-red-500/70 hover:shadow-red-500/30",
  }

  const iconBgMap: Record<string, string> = {
    purple: "bg-gradient-to-br from-purple-600/30 to-pink-600/30",
    blue: "bg-gradient-to-br from-blue-600/30 to-cyan-600/30",
    emerald: "bg-gradient-to-br from-emerald-600/30 to-green-600/30",
    yellow: "bg-gradient-to-br from-yellow-600/30 to-orange-600/30",
    indigo: "bg-gradient-to-br from-indigo-600/30 to-purple-600/30",
    red: "bg-gradient-to-br from-red-600/30 to-pink-600/30",
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-slate-900/60 border border-slate-700/70 transition-all duration-300 hover:scale-105 shadow-lg",
        colorMap[color] || colorMap.purple,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-950/50 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      <CardContent className="relative p-6">
        <div className={cn("mb-4 p-3 rounded-lg w-fit", iconBgMap[color] || iconBgMap.purple)}>{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

interface ProductCardProps {
  icon: React.ReactNode
  title: string
  description: string
  status: "Coming Soon" | "Beta" | "Live"
}

const ProductCard: React.FC<ProductCardProps> = ({ icon, title, description, status }) => {
  const statusColors = {
    "Coming Soon": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    Beta: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    Live: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  }

  return (
    <Card className="group relative overflow-hidden bg-slate-900/60 border border-slate-700/70 hover:border-purple-500/70 transition-all duration-300 min-w-[280px] sm:min-w-[300px] shadow-lg hover:shadow-purple-500/30 flex-shrink-0">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/30 to-blue-600/30">{icon}</div>
          <Badge className={`${statusColors[status]} text-xs font-medium py-1 px-2.5`}>{status}</Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm flex-grow">{description}</p>
      </CardContent>
    </Card>
  )
}

interface TimelineStepProps {
  step: number
  title: string
  description: string
  percentage: string
  isLast?: boolean
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, title, description, percentage, isLast = false }) => {
  return (
    <div className="flex items-start space-x-4 md:space-x-6">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-md">
          {step}
        </div>
        {!isLast && (
          <div className="w-1 h-20 md:h-24 bg-gradient-to-b from-blue-600 via-purple-600/50 to-transparent mt-2" />
        )}
      </div>
      <div className={`flex-1 ${!isLast ? "pb-10" : "pb-2"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-slate-100">{title}</h3>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 font-medium py-1 px-2.5 w-fit mt-1 sm:mt-0">
            {percentage}
          </Badge>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Particle class for background animation
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  char: string
  opacity: number
  pulse: boolean
  canvasWidth: number
  canvasHeight: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = Math.random() * this.canvasWidth
    this.y = Math.random() * this.canvasHeight
    this.size = Math.random() * 8 + 4
    this.speedX = (Math.random() - 0.5) * 0.2
    this.speedY = (Math.random() - 0.5) * 0.2

    const colors = [
      `rgba(192, 57, 239, ${Math.random() * 0.6 + 0.3})`, // Purple
      `rgba(57, 137, 239, ${Math.random() * 0.6 + 0.3})`, // Blue
      `rgba(57, 239, 157, ${Math.random() * 0.6 + 0.3})`, // Emerald
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]
    const quantumChars = "01✧✦✷✸✺MATWIX"
    this.char = quantumChars.charAt(Math.floor(Math.random() * quantumChars.length))
    this.opacity = Math.random() * 0.7 + 0.2
    this.pulse = Math.random() > 0.5
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (
      this.x > this.canvasWidth + this.size ||
      this.x < -this.size ||
      this.y > this.canvasHeight + this.size ||
      this.y < -this.size
    ) {
      this.x = Math.random() * this.canvasWidth
      this.y = Math.random() > 0.5 ? -this.size : this.canvasHeight + this.size
    }

    if (this.pulse) {
      this.opacity += 0.005
      if (this.opacity >= 0.8) this.pulse = false
    } else {
      this.opacity -= 0.005
      if (this.opacity <= 0.2) this.pulse = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.size}px monospace`
    ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
    ctx.shadowBlur = 5
    ctx.shadowColor = this.color.replace(/[\d.]+\)$/g, `0.5)`)
    ctx.fillText(this.char, this.x, this.y)
    ctx.shadowBlur = 0
  }
}

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isLoading) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)

      particles.length = 0
      const particleCount = Math.min(100, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 20000))
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.offsetWidth, canvas.offsetHeight))
      }
    }

    setupCanvas()

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setupCanvas()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isLoading])

  // Common icon props
  const commonIconProps = { className: "h-8 w-8 md:h-10 md:w-10" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative overflow-x-hidden">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-15" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[100]">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-blue-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-emerald-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
            </div>
            <div className="mt-6 text-purple-400 font-mono text-base md:text-lg tracking-wider">
              MATWIX INITIALIZING
            </div>
            <div className="mt-2 text-slate-400 text-sm">Crafting the Quantum Future...</div>
          </div>
        </div>
      )}

      <div className={`relative z-10 transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {/* Header */}
        <header className="container mx-auto py-5 px-4 sm:px-6 flex items-center justify-between border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-50 bg-slate-950/70">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              MATWIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {[
              { name: "Features", href: "#features" },
              { name: "AI Tools", href: "#ai-tools" },
              { name: "Quantum", href: "#quantum-marketing" },
              { name: "Freedom", href: "#freedom" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-purple-400 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-purple-400 px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm px-4 sm:px-5 py-2 shadow-lg hover:shadow-purple-500/40 transition-shadow">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-purple-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-md pt-20 px-6 flex flex-col">
            <nav className="flex flex-col space-y-6 items-center text-center">
              {[
                { name: "Features", href: "#features" },
                { name: "AI Tools", href: "#ai-tools" },
                { name: "Quantum", href: "#quantum-marketing" },
                { name: "Freedom", href: "#freedom" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-200 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-6 flex flex-col space-y-4 w-full">
                <Link href="/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full text-slate-300 border-slate-700 hover:text-purple-400 hover:border-purple-500"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/40 transition-shadow">
                    Join Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}

        <main>
          {/* Hero Section */}
          <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28 text-center relative min-h-[calc(100vh-80px)] flex flex-col justify-center">
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 overflow-hidden">
              <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-purple-600 blur-[100px] sm:blur-[150px] md:blur-[200px] animate-pulse-slow"></div>
              <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-blue-600 blur-[100px] sm:blur-[150px] md:blur-[200px] ml-10 sm:ml-20 mt-10 sm:mt-20 animate-pulse-slower"></div>
              <div className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-emerald-600 blur-[100px] sm:blur-[150px] md:blur-[200px] -ml-10 sm:-ml-40 -mt-10 sm:-mt-20 animate-pulse-slow"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/40 py-1.5 px-3.5 text-xs sm:text-sm font-medium tracking-wide">
                🚀 QUANTUM AI REVOLUTION
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight">
                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Unlocking Global Potential
                </span>
                <span className="block text-slate-100 mt-1 sm:mt-2">with Quantum AI</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed">
                The first AI platform combining <strong className="text-purple-400">Quantum Marketing</strong>,{" "}
                <strong className="text-blue-400">Machine Learning</strong> &{" "}
                <strong className="text-emerald-400">Web3</strong> to transform your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base sm:text-lg px-7 sm:px-8 py-3 sm:py-4 h-auto shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    Join Now
                    <Rocket className="ml-2.5 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 hover:border-slate-500 text-base sm:text-lg px-7 sm:px-8 py-3 sm:py-4 h-auto shadow-lg hover:shadow-slate-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="mr-2.5 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                {[
                  { label: "Global Users", value: "1M+", color: "text-purple-400" },
                  { label: "Revenue Generated", value: "$50M+", color: "text-blue-400" },
                  { label: "Countries", value: "150+", color: "text-emerald-400" },
                  { label: "Uptime", value: "99.9%", color: "text-yellow-400" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What is Matwix Section */}
          <section id="features" className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                What is{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MATWIX
                </span>
                ?
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                A revolutionary ecosystem combining education, technology, and quantum marketing to unlock your
                potential.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon={<BookOpen {...commonIconProps} className={`${commonIconProps.className} text-purple-400`} />}
                title="Academy"
                description="Comprehensive learning platform with AI-powered courses, certifications, and skill development programs designed for the future economy."
                gradient="from-purple-600/20 to-pink-600/20"
              />
              <FeatureCard
                icon={<Globe {...commonIconProps} className={`${commonIconProps.className} text-blue-400`} />}
                title="Webtools"
                description="Advanced AI-powered tools for content creation, automation, and business optimization. Everything you need in one platform."
                gradient="from-blue-600/20 to-cyan-600/20"
              />
              <FeatureCard
                icon={<Brain {...commonIconProps} className={`${commonIconProps.className} text-emerald-400`} />}
                title="Quantum Marketing"
                description="Revolutionary compensation system using quantum principles to maximize earnings through direct sales, team building, and passive income streams."
                gradient="from-emerald-600/20 to-green-600/20"
              />
            </div>
          </section>

          {/* AI-Powered Tools Section */}
          <section id="ai-tools" className="bg-slate-900/40 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/40 py-1.5 px-3.5 text-xs sm:text-sm font-medium tracking-wide">
                  🤖 AI ECOSYSTEM
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  AI-Powered{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Tools
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Cutting-edge AI tools designed to supercharge your productivity and creativity.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                {[
                  {
                    icon: <PenTool className="h-6 w-6 text-slate-100" />,
                    title: "AI Writer",
                    desc: "Generate high-quality content, articles, and copy with advanced language models.",
                    color: "purple",
                  },
                  {
                    icon: <Mic className="h-6 w-6 text-slate-100" />,
                    title: "AI Voice/Music",
                    desc: "Create professional voiceovers, music, and audio content with AI.",
                    color: "blue",
                  },
                  {
                    icon: <ImageIcon className="h-6 w-6 text-slate-100" />,
                    title: "AI Image/Video",
                    desc: "Generate stunning visuals, images, and videos for any purpose.",
                    color: "emerald",
                  },
                  {
                    icon: <MessageSquare className="h-6 w-6 text-slate-100" />,
                    title: "WhatsApp CRM",
                    desc: "Automate customer relationships and sales through WhatsApp integration.",
                    color: "yellow",
                  },
                  {
                    icon: <Code className="h-6 w-6 text-slate-100" />,
                    title: "Chat & Code Generator",
                    desc: "AI-powered coding assistant and intelligent chatbot for development.",
                    color: "indigo",
                  },
                  {
                    icon: <FileSearch className="h-6 w-6 text-slate-100" />,
                    title: "Plagiarism Detection",
                    desc: "Advanced content verification and originality checking system.",
                    color: "red",
                  },
                ].map((tool) => (
                  <ToolCard
                    key={tool.title}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.desc}
                    color={tool.color}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Upcoming Products Section */}
          <section id="upcoming-products" className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/40 py-1.5 px-3.5 text-xs sm:text-sm font-medium tracking-wide">
                🔮 COMING SOON
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Upcoming{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Products
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Revolutionary products that will reshape the digital landscape.
              </p>
            </div>
            <div className="relative">
              <div className="flex overflow-x-auto space-x-6 sm:space-x-8 pb-6 px-2">
                {[
                  {
                    icon: <BookOpen className="h-6 w-6 text-slate-100" />,
                    title: "E-book Generator",
                    desc: "AI-powered platform to create, publish, and monetize digital books instantly.",
                    status: "Beta" as const,
                  },
                  {
                    icon: <Users className="h-6 w-6 text-slate-100" />,
                    title: "AI Social Platform",
                    desc: "Next-generation social network powered by AI and blockchain technology.",
                    status: "Coming Soon" as const,
                  },
                  {
                    icon: <Network className="h-6 w-6 text-slate-100" />,
                    title: "Web3 Blockchain System",
                    desc: "Decentralized infrastructure for the future of digital transactions.",
                    status: "Coming Soon" as const,
                  },
                  {
                    icon: <Wallet className="h-6 w-6 text-slate-100" />,
                    title: "Matwix Wallet & Exchange",
                    desc: "Secure digital wallet and cryptocurrency exchange platform.",
                    status: "Beta" as const,
                  },
                  {
                    icon: <ShoppingBag className="h-6 w-6 text-slate-100" />,
                    title: "NFT Marketplace",
                    desc: "Create, buy, and sell NFTs in our exclusive marketplace.",
                    status: "Coming Soon" as const,
                  },
                  {
                    icon: <Coins className="h-6 w-6 text-slate-100" />,
                    title: "$MAT Token",
                    desc: "Native utility token powering the entire MATWIX ecosystem.",
                    status: "Live" as const,
                  },
                ].map((product) => (
                  <ProductCard
                    key={product.title}
                    icon={product.icon}
                    title={product.title}
                    description={product.desc}
                    status={product.status}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Quantum Marketing Explainer */}
          <section id="quantum-marketing" className="bg-slate-900/40 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/40 py-1.5 px-3.5 text-xs sm:text-sm font-medium tracking-wide">
                  ⚛️ QUANTUM SYSTEM
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  Quantum{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Marketing
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Revolutionary compensation system designed to maximize your earning potential.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="space-y-6 sm:space-y-8">
                  {[
                    {
                      step: 1,
                      title: "Direct Sales Bonus",
                      desc: "Earn immediate 8% commission on every direct sale you make. Start earning from day one with our premium products and services.",
                      perc: "8%",
                    },
                    {
                      step: 2,
                      title: "5-Level Generation Bonus",
                      desc: "Build your network and earn from 5 levels deep. Each level provides decreasing but substantial bonuses as your team grows.",
                      perc: "Up to 25%",
                    },
                    {
                      step: 3,
                      title: "Pay Leg Bonus",
                      desc: "Advanced binary system that rewards balanced team building. Earn additional bonuses based on your weaker leg performance.",
                      perc: "10-15%",
                    },
                    {
                      step: 4,
                      title: "Career Ranks & Bonuses",
                      desc: "Achieve higher ranks to unlock exclusive bonuses, luxury rewards, and leadership recognition in the MATWIX community.",
                      perc: "Unlimited",
                      isLast: true,
                    },
                  ].map((item) => (
                    <TimelineStep
                      key={item.step}
                      step={item.step}
                      title={item.title}
                      description={item.desc}
                      percentage={item.perc}
                      isLast={item.isLast}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Freedom Section */}
          <section id="freedom" className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Achieve True{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Freedom
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                MATWIX empowers you to break free from traditional limitations and create the life you deserve.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <DollarSign {...commonIconProps} className={`${commonIconProps.className} text-yellow-400`} />,
                  title: "Financial Freedom",
                  desc: "Build multiple income streams through our quantum marketing system. Achieve financial independence with passive income that grows exponentially.",
                  color: "from-yellow-600/20 to-orange-600/20",
                  border: "hover:border-yellow-500/70",
                  shadow: "hover:shadow-yellow-500/30",
                },
                {
                  icon: <Clock {...commonIconProps} className={`${commonIconProps.className} text-blue-400`} />,
                  title: "Time Freedom",
                  desc: "Automate your business with AI-powered tools. Spend more time with family and pursuing your passions while your income continues to grow.",
                  color: "from-blue-600/20 to-cyan-600/20",
                  border: "hover:border-blue-500/70",
                  shadow: "hover:shadow-blue-500/30",
                },
                {
                  icon: <MapPin {...commonIconProps} className={`${commonIconProps.className} text-emerald-400`} />,
                  title: "Location Freedom",
                  desc: "Work from anywhere in the world. Our cloud-based platform ensures you can manage your business from any location with internet access.",
                  color: "from-emerald-600/20 to-green-600/20",
                  border: "hover:border-emerald-500/70",
                  shadow: "hover:shadow-emerald-500/30",
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className={`group relative overflow-hidden bg-slate-900/60 border border-slate-700/70 ${item.border} transition-all duration-300 hover:scale-105 shadow-lg ${item.shadow}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                  <CardContent className="relative p-6 sm:p-8 text-center">
                    <div className={`mb-5 p-3 sm:p-4 rounded-full bg-gradient-to-br ${item.color} w-fit mx-auto`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-100">{item.title}</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Cybersecurity with AI Section */}
          <section id="cybersecurity" className="bg-slate-900/40 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/40 py-1.5 px-3.5 text-xs sm:text-sm font-medium tracking-wide">
                  🛡️ SECURITY FIRST
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  Cybersecurity with{" "}
                  <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">AI</span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Advanced AI-powered security measures to protect your data and investments.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                <FeatureCard
                  icon={<Eye {...commonIconProps} className={`${commonIconProps.className} text-red-400`} />}
                  title="Threat Detection"
                  description="Real-time AI monitoring system that identifies and neutralizes potential security threats before they can cause damage."
                  gradient="from-red-600/20 to-pink-600/20"
                />
                <FeatureCard
                  icon={<Zap {...commonIconProps} className={`${commonIconProps.className} text-orange-400`} />}
                  title="Automated Response"
                  description="Instant automated responses to security incidents, ensuring minimal downtime and maximum protection for all users."
                  gradient="from-orange-600/20 to-yellow-600/20"
                />
                <FeatureCard
                  icon={<Shield {...commonIconProps} className={`${commonIconProps.className} text-green-400`} />}
                  title="Ethical AI Standards"
                  description="Committed to responsible AI development with transparent algorithms and ethical data handling practices."
                  gradient="from-green-600/20 to-emerald-600/20"
                />
              </div>
            </div>
          </section>

          {/* Quantum Layer Section */}
          <section id="quantum-layer" className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/40 py-1.5 px-3.5 text-xs sm:text-sm font-medium tracking-wide">
                🌌 QUANTUM LAYER
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                The{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Quantum
                </span>{" "}
                Advantage
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Experience the future with our quantum-powered AI assistant and insights platform.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
              {[
                {
                  icon: <Bot {...commonIconProps} className={`${commonIconProps.className} text-purple-400`} />,
                  title: "Quantum Assistant",
                  desc: "Your personal AI companion powered by quantum computing principles. Get instant answers, strategic insights, and personalized recommendations for your business growth.",
                  features: ["24/7 intelligent support", "Predictive analytics", "Quantum-speed processing"],
                  color: "purple",
                  gradient: "from-purple-900/40 to-slate-900/40",
                  border: "border-purple-500/50",
                  shadow: "hover:shadow-purple-500/40",
                  checkColor: "text-purple-400",
                },
                {
                  icon: <BarChart3 {...commonIconProps} className={`${commonIconProps.className} text-blue-400`} />,
                  title: "Quantum Insights",
                  desc: "Advanced analytics platform that processes vast amounts of data to provide actionable insights for your business decisions and market opportunities.",
                  features: ["Real-time market analysis", "Performance optimization", "Future trend prediction"],
                  color: "blue",
                  gradient: "from-blue-900/40 to-slate-900/40",
                  border: "border-blue-500/50",
                  shadow: "hover:shadow-blue-500/40",
                  checkColor: "text-blue-400",
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className={`group relative overflow-hidden bg-gradient-to-br ${item.gradient} border ${item.border} shadow-xl ${item.shadow} transition-shadow duration-300`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${item.color}-600/10 to-slate-950/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                  <CardContent className="relative p-6 sm:p-8">
                    <div
                      className={`mb-5 p-3 sm:p-4 rounded-full bg-gradient-to-br from-${item.color}-600/20 to-${item.color}-700/20 w-fit`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-100">{item.title}</h3>
                    <p className="text-slate-300 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    <ul className="space-y-2 text-sm sm:text-base">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-center text-slate-400">
                          <Check className={`h-4 w-4 ${item.checkColor} mr-2.5 shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-gradient-to-r from-purple-800/30 via-blue-800/30 to-emerald-800/30 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight">
                  You're not here by{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    accident
                  </span>
                  .
                  <br />
                  This is your{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    moment
                  </span>
                  .
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 sm:mb-12 leading-relaxed">
                  Join the Quantum Revolution and transform your future with the power of AI, Web3, and unlimited
                  potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 sm:mb-12">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 h-auto shadow-xl hover:shadow-purple-500/60 transition-all duration-300 transform hover:scale-105"
                    >
                      Start Now
                      <Rocket className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </Link>
                </div>
                <div className="flex justify-center items-center space-x-1.5 mb-10 sm:mb-12">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-slate-400">Trusted by 1M+ users worldwide</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                  {[
                    { title: "No Risk", desc: "30-day money-back guarantee", color: "text-purple-400" },
                    { title: "24/7 Support", desc: "Expert assistance anytime", color: "text-blue-400" },
                    { title: "Instant Access", desc: "Start earning immediately", color: "text-emerald-400" },
                  ].map((item) => (
                    <div key={item.title} className="space-y-1">
                      <div className={`text-xl sm:text-2xl font-bold ${item.color}`}>{item.title}</div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950/80 border-t border-slate-800/50 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
              <div className="md:col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center space-x-2.5 mb-4 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                    MATWIX
                  </span>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Unlocking global potential with Quantum AI. The future of Web3, FinTech, and artificial intelligence
                  starts here.
                </p>
              </div>
              {[
                { title: "Platform", links: ["Academy", "AI Tools", "Quantum Marketing", "Web3 System"] },
                { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
                { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"] },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-slate-200 mb-4 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-200">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-xs sm:text-sm text-slate-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} MATWIX. All rights reserved. Powered by Quantum AI.
              </div>
              <div className="flex space-x-5">
                {[
                  {
                    label: "Twitter",
                    path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                  },
                  {
                    label: "LinkedIn",
                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="text-slate-500 hover:text-purple-400 transition-colors duration-200"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
