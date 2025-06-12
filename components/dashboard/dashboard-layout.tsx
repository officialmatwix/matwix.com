"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  DollarSign,
  Package,
  UserPlus,
  Award,
  Settings,
  Menu,
  X,
  Network,
  BookOpen,
  BarChart2,
  Terminal,
  Brain,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Bell,
  MessageSquare,
  LogOut,
  Globe,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MatwixCompensationProvider } from "@/context/matwix-compensation-context"
import { MLMDataProvider } from "@/context/mlm-data-context"
import { useLanguage } from "@/context/language-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMLMData } from "@/hooks/use-mlm-data"

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Notification dropdown component
function NotificationDropdown() {
  const mlmData = useMLMData()
  const notifications = mlmData?.notifications || [] // Add fallback empty array
  const { t } = useLanguage()
  const [unreadCount, setUnreadCount] = useState(3)

  const handleMarkAllRead = () => {
    setUnreadCount(0)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border border-slate-700 bg-slate-900/95 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-700 p-3">
          <h3 className="font-medium text-slate-100">{t("notifications")}</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleMarkAllRead}>
            {t("markAllRead")}
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="space-y-0.5">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 hover:bg-slate-800/50 ${
                  notification.unread ? "bg-slate-800/20" : ""
                }`}
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                    notification.type === "commission"
                      ? "bg-green-500/20 text-green-400"
                      : notification.type === "team"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {notification.type === "commission" ? "$" : notification.type === "team" ? "T" : "S"}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{notification.message}</p>
                  <p className="text-xs text-slate-400">{notification.time}</p>
                </div>
                {notification.unread && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t border-slate-700 p-2 text-center">
          <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-slate-300">
            {t("viewAllNotifications")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Chat component
function ChatDropdown() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I assist you with your Matwix business today?",
      sender: "assistant",
      time: "10:30 AM",
    },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        content: input,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")

      // Simulate assistant response after a short delay
      setTimeout(() => {
        const assistantMessage = {
          id: messages.length + 2,
          content: "I'm processing your request. Our AI assistant will help you shortly.",
          sender: "assistant",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }, 1000)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border border-slate-700 bg-slate-900/95 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col h-[400px]">
          <div className="flex items-center justify-between border-b border-slate-700 p-3">
            <h3 className="font-medium text-slate-100">Matwix Assistant</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-100 border border-slate-700"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t border-slate-700 p-3">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder={t("typeYourMessage")}
                className="flex-1 bg-slate-800 border-slate-700 text-slate-100"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="h-8 w-8 bg-purple-600 hover:bg-purple-700"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Language toggle component
function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
            {language.toUpperCase()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0 border border-slate-700 bg-slate-900/95 backdrop-blur-sm shadow-xl">
        <div className="p-1">
          <Button
            variant={language === "en" ? "default" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setLanguage("en")}
          >
            <span className="mr-2">🇺🇸</span> English
          </Button>
          <Button
            variant={language === "es" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setLanguage("es")}
          >
            <span className="mr-2">🇪🇸</span> Español
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Logout button component
function LogoutButton() {
  const { t } = useLanguage()

  const handleLogout = () => {
    // Implement logout functionality
    window.location.href = "/"
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      className="rounded-full w-8 h-8 text-slate-400 hover:text-slate-100"
      aria-label={t("logout")}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
}

// User avatar menu component
function UserAvatarMenu() {
  const { t } = useLanguage()
  const user = { name: "Neo Anderson", email: "neo@matrix.com", role: "Gold Member" }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer border-2 border-transparent hover:border-cyan-500 transition-colors">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
          <AvatarFallback className="bg-slate-700 text-cyan-500">
            {user.name.charAt(0)}
            {user.name.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 border border-slate-700 bg-slate-900/95 backdrop-blur-sm shadow-xl">
        <div className="p-3 border-b border-slate-700">
          <p className="text-sm font-medium text-slate-100">{user.name}</p>
          <p className="text-xs text-slate-400">{user.email}</p>
          <p className="text-xs text-cyan-400 mt-1">{user.role}</p>
        </div>
        <div className="p-1">
          <Button variant="ghost" className="w-full justify-start text-sm">
            <Users className="mr-2 h-4 w-4" /> {t("profile")}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            <Settings className="mr-2 h-4 w-4" /> {t("settings")}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-red-400"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut className="mr-2 h-4 w-4" /> {t("logout")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [pathname])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { name: t("dashboard"), href: "/dashboard", icon: Home },
    { name: t("team"), href: "/dashboard/team", icon: Users },
    { name: t("network"), href: "/dashboard/network", icon: Network },
    { name: t("banking"), href: "/dashboard/banking", icon: DollarSign },
    { name: t("products"), href: "/dashboard/products", icon: Package },
    { name: t("recruitment"), href: "/dashboard/recruitment", icon: UserPlus },
    { name: t("achievements"), href: "/dashboard/achievements", icon: Award },
    { name: t("academy"), href: "/dashboard/academy", icon: BookOpen },
    { name: t("compensation"), href: "/dashboard/compensation", icon: BarChart2 },
    { name: t("visualization"), href: "/dashboard/visualization", icon: Terminal },
    { name: t("quantum"), href: "/dashboard/quantum", icon: Brain },
    { name: t("insights"), href: "/dashboard/insights", icon: Sparkles },
    { name: t("settings"), href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <MatwixCompensationProvider>
      <MLMDataProvider>
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
          {/* Sidebar */}
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 transition-all duration-300 ease-in-out transform lg:relative backdrop-blur-sm",
              isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0",
            )}
          >
            <div className="flex flex-col h-full">
              {/* Logo - Different sizes based on sidebar state */}
              <div className="flex items-center justify-center p-0 border-b border-slate-800/50">
                <Link href="/dashboard" className="flex items-center justify-center">
                  {isSidebarOpen ? (
                    // Large logo for expanded sidebar
                    <div className="relative h-32 w-32">
                      <img src="/images/mwwhite.png" alt="Matwix Logo" className="h-full w-full object-contain" />
                    </div>
                  ) : (
                    // Small logo for collapsed sidebar
                    <div className="relative h-16 w-16">
                      <img src="/images/mwwhite.png" alt="Matwix Logo" className="h-full w-full object-contain" />
                    </div>
                  )}
                </Link>
                {isMobile && (
                  <Button variant="ghost" size="icon" onClick={toggleSidebar} className="absolute right-4 lg:hidden">
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Toggle button for desktop */}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="absolute -right-3 top-20 bg-slate-800 border border-slate-700 rounded-full h-6 w-6 flex items-center justify-center z-10 hover:bg-slate-700"
                >
                  {isSidebarOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </Button>
              )}

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 mt-4">
                <ul className="space-y-1 px-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          pathname === item.href || pathname.startsWith(`${item.href}/`)
                            ? "bg-gradient-to-r from-purple-900/50 to-slate-800 text-purple-400 border-l-2 border-purple-500"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isSidebarOpen ? "mr-3" : "mx-auto")} />
                        {isSidebarOpen && <span>{item.name}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800/50">
                {isSidebarOpen ? (
                  <div className="flex items-center justify-between">
                    <LogoutButton />
                    <span className="text-xs text-slate-500">The Real World v2.0.5</span>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <LogoutButton />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/50 py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isMobile && (
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="text-sm text-slate-400">
                    <span className="text-purple-400 font-mono">QUANTUM</span> NETWORK
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <ChatDropdown />
                  <NotificationDropdown />
                  <UserAvatarMenu />
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto bg-slate-950 p-4">{children}</main>
          </div>
        </div>
      </MLMDataProvider>
    </MatwixCompensationProvider>
  )
}
