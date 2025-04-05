"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

export function QuantumTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isInitializing, setIsInitializing] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Initialize terminal
  useEffect(() => {
    const initMessages = [
      "Initializing quantum terminal...",
      "Loading neural interface...",
      "Establishing secure connection...",
      "Quantum entanglement verified...",
      "Neural handshake complete...",
      "Welcome to MATWIX - THE REAL WORLD Terminal",
      "Type 'help' for available commands.",
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < initMessages.length) {
        setHistory((prev) => [...prev, initMessages[i]])
        i++
      } else {
        setIsInitializing(false)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let response: string[] = []

    if (command === "") {
      response = [""]
    } else if (command === "help") {
      response = [
        "Available commands:",
        "help - Display this help message",
        "clear - Clear the terminal",
        "status - Display system status",
        "network - Show network information",
        "connect - Connect to the Matwix network",
        "disconnect - Disconnect from the Matwix network",
        "about - Display information about Matwix",
        "exit - Exit the terminal",
      ]
    } else if (command === "clear") {
      setHistory([])
      return
    } else if (command === "status") {
      response = [
        "System Status: ONLINE",
        "Neural Interface: ACTIVE",
        "Quantum Entanglement: STABLE",
        "Security Protocol: ENABLED",
        "Network Connection: SECURE",
      ]
    } else if (command === "network") {
      response = [
        "Network Information:",
        "Type: Quantum Neural Network",
        "Nodes: 1,024",
        "Connections: 1,048,576",
        "Bandwidth: 10 Tbps",
        "Latency: 0.001 ms",
        "Encryption: Quantum",
      ]
    } else if (command === "connect") {
      response = [
        "Connecting to MATRIX network...",
        "Establishing quantum entanglement...",
        "Verifying neural interface...",
        "Connection established.",
        "Welcome to the MATWIX network.",
      ]
    } else if (command === "disconnect") {
      response = [
        "Disconnecting from MATRIX network...",
        "Closing quantum entanglement...",
        "Shutting down neural interface...",
        "Disconnected from the MATRIX network.",
      ]
    } else if (command === "about") {
      response = [
        "MATWIX - THE REAL WORLD Terminal",
        "Version: 1.0.0",
        "Created by: Quantum Neural Networks",
        "Copyright © 2023 MATWIX Corporation",
        "All rights reserved.",
      ]
    } else if (command === "exit") {
      response = ["Exiting terminal..."]
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } else {
      response = [`Command not found: ${command}. Type 'help' for available commands.`]
    }

    setHistory((prev) => [...prev, `> ${cmd}`, ...response])
    setCommandHistory((prev) => [cmd, ...prev])
    setHistoryIndex(-1)
    setInput("")
  }

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="h-full bg-black text-green-500 font-mono p-4 overflow-auto" ref={terminalRef} onClick={focusInput}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}
      {!isInitializing && (
        <div className="flex items-center">
          <span className="mr-2">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono"
            autoFocus
          />
          <span className={`w-2 h-4 bg-green-500 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
        </div>
      )}
    </div>
  )
}

export default QuantumTerminal

