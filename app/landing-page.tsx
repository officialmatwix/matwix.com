"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Network,
  ChevronRight,
  Users,
  DollarSign,
  Award,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TerminalIcon } from "@radix-ui/react-icons"
import ParticleText from "@/components/particle-text"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-colors">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </CardContent>
    </Card>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, avatar }) => {
  return (
    <Card className="bg-slate-800/50 border border-slate-700/50">
      <CardContent className="p-6">
        <div className="mb-4 text-cyan-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.59 4.59A2 2 0 1 1 11 8H8.41A2 2 0 0 0 7 9.41V12H9.59A2 2 0 1 1 8.41 16H7v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.41A2 2 0 0 1 9.59 4.59z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text-slate-300 mb-6">{quote}</p>
        <div className="flex items-center">
          <img src={avatar || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="font-medium text-slate-200">{author}</div>
            <div className="text-sm text-slate-400">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  highlighted?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}) => {
  return (
    <Card
      className={`${highlighted ? "border-cyan-500/50 bg-gradient-to-b from-slate-800/90 to-slate-900/90" : "bg-slate-800/50 border-slate-700/50"} relative`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-cyan-600 text-white border-none py-1 px-3">MOST POPULAR</Badge>
        </div>
      )}
      <CardContent className={`p-6 ${highlighted ? "pt-8" : ""}`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-cyan-400">{price}</span>
          <span className="text-sm text-slate-400 ml-1">{period}</span>
        </div>
        <p className="text-slate-400 mb-6">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-cyan-500 mr-2 shrink-0" />
              <span className="text-slate-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={`w-full ${buttonVariant === "default" ? "bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800" : "border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70"}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Matrix/quantum particle effect for the rest of the page (not the banner)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 150
    const matrixChars = "01"

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

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 12 + 8
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
        this.char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length))
        this.opacity = Math.random() * 0.8 + 0.1
        this.pulse = Math.random() > 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // Pulsing effect
        if (this.pulse) {
          this.opacity += 0.01
          if (this.opacity >= 0.9) this.pulse = false
        } else {
          this.opacity -= 0.01
          if (this.opacity <= 0.1) this.pulse = true
        }
      }

      draw() {
        if (!ctx) return
        ctx.font = `${this.size}px monospace`
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
        ctx.fillText(this.char, this.x, this.y)
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
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto py-6 px-6 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center">
            <img src="/images/mwwhite.png" alt="MATRIX Logo" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-cyan-600 hover:bg-cyan-700">Get Started</Button>
            </Link>
          </div>
        </header>

        {/* Hero Section with Quantum Terminal */}
        <section className="container mx-auto px-6 py-24 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-96 h-96 rounded-full bg-cyan-500 blur-[100px]"></div>
            <div className="w-96 h-96 rounded-full bg-blue-500 blur-[100px] ml-20 mt-20"></div>
          </div>

          <Badge className="mb-4 bg-slate-800/70 text-cyan-400 border-cyan-500/50 py-1 px-3">
            NEXT GENERATION MLM PLATFORM
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            MATRIX - THE REAL WORLD
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10">
            Harness the power of advanced algorithms and real-time analytics to build, manage, and grow your network
            marketing business with unprecedented efficiency.
          </p>

          {/* Particle Text Banner */}
          <div className="w-full mb-10 h-[80vh] bg-black border border-green-500 rounded-md overflow-hidden relative">
            <div className="flex items-center justify-between bg-black p-2 border-b border-green-500">
              <div className="flex items-center">
                <TerminalIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-500 font-mono">MATRIX - THE REAL WORLD</span>
              </div>
            </div>
            <div className="h-[calc(100%-40px)]">
              <ParticleText />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800"
              >
                Launch Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70"
            >
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">500+</div>
              <div className="text-sm text-slate-400">Active Networks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">25k+</div>
              <div className="text-sm text-slate-400">Users Worldwide</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">$12M+</div>
              <div className="text-sm text-slate-400">Commissions Paid</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/70 text-cyan-400 border-cyan-500/50 py-1 px-3">POWERFUL FEATURES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Tools for Modern Network Marketers</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with intuitive design to give you everything you need to
              succeed in today's competitive MLM landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Network className="h-10 w-10 text-cyan-500" />}
              title="Real-Time Network Visualization"
              description="See your entire downline structure with interactive 3D visualization. Track growth, identify opportunities, and optimize your network in real-time."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-cyan-500" />}
              title="Team Management"
              description="Manage your team with powerful tools for communication, training, and performance tracking. Build stronger relationships and drive better results."
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-cyan-500" />}
              title="Commission Tracking"
              description="Transparent commission calculations and payouts. Monitor earnings, set goals, and forecast future income with advanced analytics."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-cyan-500" />}
              title="Advanced Analytics"
              description="Gain insights from comprehensive data analysis. Identify trends, optimize strategies, and make data-driven decisions to grow your business."
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-cyan-500" />}
              title="Rank Advancement"
              description="Track progress towards your next rank with clear metrics and achievement paths. Celebrate milestones and stay motivated with visual progress indicators."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-cyan-500" />}
              title="Secure Infrastructure"
              description="Enterprise-grade security protects your data and transactions. Our platform is built on a robust, scalable infrastructure with 99.9% uptime."
            />
          </div>

          <div className="mt-16 text-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800"
              >
                Explore All Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="bg-slate-900/80 py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-slate-800/70 text-cyan-400 border-cyan-500/50 py-1 px-3">
                QUANTUM INTERFACE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Future of MLM Management</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Our intuitive dashboard puts powerful tools at your fingertips with a sleek, futuristic interface
                designed for maximum productivity.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 h-20 bottom-0 top-auto"></div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-2 shadow-2xl relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800/90 rounded-t-lg flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 mx-auto">NEXUS MLM DASHBOARD</div>
                </div>
                <div className="pt-8">
                  <img
                    src="/placeholder.svg?height=600&width=1200"
                    alt="Dashboard Preview"
                    className="w-full rounded-b-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/70 text-cyan-400 border-cyan-500/50 py-1 px-3">SUCCESS STORIES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Network Marketing Leaders</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Hear from professionals who have transformed their MLM business with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Since implementing Nexus MLM, my team's productivity has increased by 47%. The visualization tools make it so easy to identify growth opportunities."
              author="Sarah Johnson"
              role="Diamond Director"
              avatar="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="The commission tracking system is flawless. I can see exactly where my income is coming from and focus my efforts on the most profitable activities."
              author="Michael Chen"
              role="Executive Leader"
              avatar="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="I've tried many MLM platforms, but nothing compares to Nexus. The analytics alone have helped me double my downline in just 6 months."
              author="Jessica Williams"
              role="Regional Director"
              avatar="/placeholder.svg?height=80&width=80"
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-slate-900/80 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-slate-800/70 text-cyan-400 border-cyan-500/50 py-1 px-3">
                FLEXIBLE PRICING
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the Perfect Plan for Your Business</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Scalable solutions that grow with your network. No hidden fees, no surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                title="Starter"
                price="$49"
                period="per month"
                description="Perfect for new network marketers building their first team."
                features={[
                  "Up to 100 team members",
                  "Basic network visualization",
                  "Commission tracking",
                  "Email support",
                ]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Professional"
                price="$99"
                period="per month"
                description="Advanced tools for growing networks and serious marketers."
                features={[
                  "Up to 500 team members",
                  "Advanced network visualization",
                  "Real-time analytics dashboard",
                  "Team communication tools",
                  "Priority support",
                ]}
                buttonText="Get Started"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="$199"
                period="per month"
                description="Comprehensive solution for large networks and organizations."
                features={[
                  "Unlimited team members",
                  "3D network visualization",
                  "Advanced analytics & reporting",
                  "Custom branding options",
                  "API access",
                  "24/7 dedicated support",
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500 rounded-full blur-[100px]"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your MLM Business?</h2>
                <p className="text-slate-300 max-w-xl">
                  Join thousands of successful network marketers who are growing their business with our cutting-edge
                  platform. Get started today with a 14-day free trial.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 whitespace-nowrap"
                  >
                    Start Free Trial
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 whitespace-nowrap"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/90 border-t border-slate-800/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="mb-4">
                  <img src="/images/mwwhite.png" alt="MATRIX Logo" className="h-8 w-auto" />
                </div>
                <p className="text-slate-400 text-sm">
                  The next generation platform for network marketing professionals. Build, manage, and grow your
                  business with powerful tools and real-time analytics.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-slate-500 mb-4 md:mb-0">
                © 2023 MATRIX - The Real World. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

