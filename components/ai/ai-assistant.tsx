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

// Matwix compensation plan knowledge base
const matwixKnowledgeBase = {
  structure: `The Matwix Quantum compensation plan is based on a binary structure where each distributor has two legs (left and right). New members are placed in these legs, creating a dual tree that grows down through unlimited levels. Each member must recruit two direct members, one for the left leg and one for the right. If a member recruits more than two people, the additional recruits are placed under their downline (spillover system).`,

  directSalesBonus: `The Direct Sales Bonus is 8% of the purchases made by your directly recruited members.`,

  generationBonus: `The Generation Bonus is paid until the 5th Generation with the following rates:
  - 1st Generation: 8% from monthly revenue
  - 2nd Generation: 2% from monthly revenue
  - 3rd Generation: 1% from monthly revenue
  - 4th Generation: 1% from monthly revenue
  - 5th Generation: 0.5% from monthly revenue`,

  payLegBonus: `The Pay Leg Bonus requires maintaining balance between the two legs. Commission is calculated on the weaker leg (pay leg), with percentage based on your rank. For example, at Specialist rank (11%), if your pay leg volume is $548, you would earn $60.28.`,

  careerBonus: `The Career Bonus is a one-time payment when you reach certain ranks. Once you receive a bonus for a rank, you won't receive it again even if you drop and regain that rank. Bonuses range from $100 for Pioneer rank to $1,000,000 for Mastermind rank.`,

  ranks: `The Matwix compensation plan has 11 ranks:
  1. Visionary (default rank)
  2. Pioneer (requires $5,000 group volume, pays 5% on pay leg)
  3. Navigator (requires $15,000 group volume with 2 Pioneer ranks, pays 8% on pay leg)
  4. Specialist (requires $100,000 group volume with 2 Navigator ranks, pays 11% on pay leg)
  5. Mentor (requires $400,000 group volume with 2 Specialist ranks, pays 14% on pay leg)
  6. Innovator (requires $1,300,000 group volume with 2 Mentor ranks, pays 17% on pay leg)
  7. Architect (requires $3,900,000 group volume with 2 Innovator ranks, pays 20% on pay leg)
  8. Leader (requires $14,500,000 group volume with 2 Architect ranks, pays 23% on pay leg)
  9. Sage (requires $40,000,000 group volume with 2 Leader ranks, pays 26% on pay leg)
  10. Master (requires $80,000,000 group volume with 2 Sage ranks, pays 29% on pay leg)
  11. Mastermind (requires $120,000,000 group volume with 2 Master ranks, pays 32% on pay leg)`,
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
          ? "Hello! I'm your AI assistant. I'm knowledgeable about the Matwix Quantum Compensation Plan and can help you understand how it works. Feel free to ask me any questions about the binary structure, bonuses, or rank requirements."
          : "¡Hola! Soy tu asistente de IA. Tengo conocimiento sobre el Plan de Compensación Quantum de Matwix y puedo ayudarte a entender cómo funciona. Siéntete libre de hacerme cualquier pregunta sobre la estructura binaria, bonificaciones o requisitos de rango.",
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

    // Process the user's question and generate a response
    setTimeout(() => {
      const response = generateMatwixResponse(input.toLowerCase())

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Function to generate responses about the Matwix compensation plan
  const generateMatwixResponse = (question: string): string => {
    // Check for questions about the binary structure
    if (
      question.includes("binary") ||
      question.includes("structure") ||
      question.includes("tree") ||
      question.includes("leg")
    ) {
      return matwixKnowledgeBase.structure
    }

    // Check for questions about direct sales bonus
    if (question.includes("direct sales") || question.includes("referral bonus")) {
      return matwixKnowledgeBase.directSalesBonus
    }

    // Check for questions about generation bonus
    if (question.includes("generation") || question.includes("downline bonus")) {
      return matwixKnowledgeBase.generationBonus
    }

    // Check for questions about pay leg bonus
    if (question.includes("pay leg") || question.includes("weaker leg") || question.includes("binary bonus")) {
      return matwixKnowledgeBase.payLegBonus
    }

    // Check for questions about career bonus
    if (question.includes("career") || question.includes("rank bonus") || question.includes("one-time")) {
      return matwixKnowledgeBase.careerBonus
    }

    // Check for questions about ranks
    if (
      question.includes("rank") ||
      question.includes("level") ||
      question.includes("mastermind") ||
      question.includes("pioneer") ||
      question.includes("visionary")
    ) {
      return matwixKnowledgeBase.ranks
    }

    // Check for questions about the overall compensation plan
    if (
      question.includes("compensation") ||
      question.includes("plan") ||
      question.includes("bonus") ||
      question.includes("commission") ||
      question.includes("earn") ||
      question.includes("money")
    ) {
      return `The Matwix Quantum Compensation Plan combines four bonus types:
      
1. Direct Sales Bonus: 8% of purchases made by your direct recruits.
2. Generation Bonus: Paid through 5 generations (8%, 2%, 1%, 1%, 0.5%).
3. Pay Leg Bonus: Commission on your weaker leg, percentage based on rank (5%-32%).
4. Career Bonus: One-time payments for rank achievements ($100-$1,000,000).

The plan is based on a binary structure with left and right legs. You need to maintain balance between legs to maximize earnings. Your rank determines your Pay Leg commission rate and qualification for Career Bonuses.`
    }

    // Default response for other questions
    return `I'm specialized in the Matwix Quantum Compensation Plan. You can ask me about:
    
- The binary structure and how it works
- Direct Sales Bonus (8% from direct recruits)
- Generation Bonus (through 5 generations)
- Pay Leg Bonus (based on your weaker leg)
- Career Bonus (one-time rank achievements)
- The 11 ranks from Visionary to Mastermind
    
How can I help you understand the compensation plan better?`
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
            Matwix Compensation Plan Assistant
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
                  placeholder={t("askAboutMatwixCompensation")}
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
