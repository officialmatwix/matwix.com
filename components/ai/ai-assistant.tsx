"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/language-context"
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const { t, language } = useLanguage()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial greeting message
  useEffect(() => {
    const initialMessage = {
      role: "assistant" as const,
      content:
        language === "en"
          ? "Hello! I'm your AI assistant. How can I help you today with your network marketing business?"
          : "¡Hola! Soy tu asistente de IA. ¿Cómo puedo ayudarte hoy con tu negocio de marketing en red?",
      timestamp: new Date(),
    }

    setMessages([initialMessage])
  }, [language])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        en: [
          "I can help you with recruitment strategies for your network marketing business.",
          "Here are some tips to increase your team's productivity.",
          "Let me analyze your current performance metrics and suggest improvements.",
          "Would you like me to help you create a personalized recruitment script?",
        ],
        es: [
          "Puedo ayudarte con estrategias de reclutamiento para tu negocio de marketing en red.",
          "Aquí hay algunos consejos para aumentar la productividad de tu equipo.",
          "Permíteme analizar tus métricas de rendimiento actuales y sugerir mejoras.",
          "¿Te gustaría que te ayude a crear un guión de reclutamiento personalizado?",
        ],
      }

      // Random response based on language
      const randomResponse = responses[language][Math.floor(Math.random() * responses[language].length)]

      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "en" ? "en-US" : "es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("ai")}</h1>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50">
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-cyan-500 mr-2" />
            {t("ai")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[60vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-100"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === "assistant" ? (
                        <Bot className="h-4 w-4 mr-1 text-cyan-400" />
                      ) : (
                        <User className="h-4 w-4 mr-1 text-white" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.role === "assistant" ? t("assistant") : t("you")} • {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-slate-800 text-slate-100">
                    <div className="flex items-center mb-1">
                      <Bot className="h-4 w-4 mr-1 text-cyan-400" />
                      <span className="text-xs opacity-70">
                        {t("assistant")} • {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-400 mr-2" />
                      <span className="text-sm">{t("thinking")}...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-700/50 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center space-x-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("typeMessage")}
                  className="flex-1 bg-slate-800/50 border-slate-700/50 text-slate-100"
                />
                <Button type="submit" disabled={!input.trim() || isLoading} className="bg-cyan-600 hover:bg-cyan-700">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
