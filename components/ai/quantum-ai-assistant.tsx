"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Brain, Send, Sparkles, Maximize2, Minimize2, Mic, ImageIcon, Paperclip } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function QuantumAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to Quantum Assistant. I'm here to help you optimize your network, analyze performance, and provide strategic recommendations. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your network analysis, I recommend focusing on recruiting in your left leg to balance your binary structure. This could increase your Pay Leg Bonus by up to 25% next month.",
        "I've analyzed your team's performance. Your retention rate is 85%, which is above average. However, 5 members haven't logged in for over 30 days. Would you like me to suggest a re-engagement strategy?",
        "Looking at your current growth rate, you're on track to reach Mentor rank within 45 days. To accelerate this, consider implementing the 'Power Start' strategy I've outlined in your training materials.",
        "Your team's product adoption shows that 30% haven't purchased the premium package. Encouraging upgrades could increase your group volume by approximately 15% this month.",
        "I've detected a potential opportunity in your network. Three members in your downline are close to reaching Navigator rank. Supporting them could accelerate your team's growth and increase your generation bonus earnings.",
      ]

      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden h-[calc(100vh-12rem)]">
      <CardHeader className="border-b border-slate-700/50 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
            <div className="relative mr-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <div className="absolute -inset-1 rounded-full border border-purple-500/50 animate-pulse"></div>
            </div>
            Quantum Assistant
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-slate-800/50 text-purple-400 border-purple-500/50 text-xs">
              <Sparkles className="h-3 w-3 mr-1 text-purple-400" />
              QUANTUM
            </Badge>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 mr-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8 bg-purple-900/50 border border-purple-500/50">
                        <Brain className="h-4 w-4 text-purple-400" />
                      </Avatar>
                      <div className="absolute -inset-0.5 rounded-full border border-purple-500/30 animate-pulse"></div>
                    </div>
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 text-sm ${
                    message.role === "user"
                      ? "bg-purple-600/20 border border-purple-500/30 text-slate-200"
                      : "bg-slate-800/50 border border-slate-700/50 text-slate-300"
                  }`}
                >
                  {message.content}
                  <div className={`text-xs mt-1 ${message.role === "user" ? "text-slate-400" : "text-slate-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <div className="flex-shrink-0 mr-3">
                  <Avatar className="h-8 w-8 bg-purple-900/50 border border-purple-500/50">
                    <Brain className="h-4 w-4 text-purple-400" />
                  </Avatar>
                </div>
                <div className="rounded-lg p-3 bg-slate-800/50 border border-slate-700/50">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-slate-700/50 p-4 mt-auto">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Ask Quantum Assistant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[60px] resize-none bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus-visible:ring-purple-500"
              />
              <div className="absolute bottom-2 right-2 flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
