"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Lock } from "lucide-react"

interface PinEntryProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  isPinSetup?: boolean
  title?: string
  description?: string
}

export function PinEntry({
  isOpen,
  onClose,
  onSuccess,
  isPinSetup = false,
  title = "Enter PIN",
  description = "Please enter your 6-digit PIN to access Banking",
}: PinEntryProps) {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""))
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<"enter" | "confirm">(isPinSetup ? "enter" : "enter")
  const [isMounted, setIsMounted] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlePinChange = (index: number, value: string, isConfirm = false) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newPin = isConfirm ? [...confirmPin] : [...pin]

    // Handle paste event with multiple characters
    if (value.length > 1) {
      const digits = value.split("").slice(0, 6)
      for (let i = 0; i < digits.length; i++) {
        if (index + i < 6) {
          newPin[index + i] = digits[i]
        }
      }

      // Focus the next input after the pasted digits
      const nextIndex = Math.min(index + digits.length, 5)
      if (nextIndex < 6) {
        inputRefs.current[nextIndex]?.focus()
      }
    } else {
      // Handle single character input
      newPin[index] = value

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    isConfirm ? setConfirmPin(newPin) : setPin(newPin)
    setError(null)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, isConfirm = false) => {
    // Handle backspace
    if (e.key === "Backspace") {
      const newPin = isConfirm ? [...confirmPin] : [...pin]

      if (!newPin[index] && index > 0) {
        // If current input is empty, focus previous and clear it
        newPin[index - 1] = ""
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current input
        newPin[index] = ""
      }

      isConfirm ? setConfirmPin(newPin) : setPin(newPin)
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleSubmit = () => {
    if (!isMounted) return

    const pinString = pin.join("")

    if (pinString.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    if (isPinSetup) {
      if (step === "enter") {
        setStep("confirm")
        return
      } else {
        const confirmPinString = confirmPin.join("")

        if (pinString !== confirmPinString) {
          setError("PINs do not match. Please try again.")
          setStep("enter")
          setPin(Array(6).fill(""))
          setConfirmPin(Array(6).fill(""))
          return
        }

        // Save PIN to localStorage (in a real app, this would be server-side with proper encryption)
        if (typeof window !== "undefined") {
          localStorage.setItem("bankingPin", pinString)
        }
        onSuccess()
      }
    } else {
      // Verify PIN
      if (typeof window !== "undefined") {
        const savedPin = localStorage.getItem("bankingPin")

        if (pinString === savedPin) {
          // Set session storage to indicate PIN has been verified for this session
          sessionStorage.setItem("bankingPinVerified", "true")
          onSuccess()
        } else {
          setError("Incorrect PIN. Please try again.")
          setPin(Array(6).fill(""))
        }
      }
    }
  }

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRefs.current[0]?.focus()
      }, 100)
    }
  }, [isOpen, step])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-900 border border-slate-700/50 text-slate-100">
        <DialogHeader>
          <div className="mx-auto bg-slate-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-cyan-400" />
          </div>
          <DialogTitle className="text-center text-xl">{step === "confirm" ? "Confirm PIN" : title}</DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            {step === "confirm" ? "Please re-enter your PIN to confirm" : description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-center space-x-2">
            {(step === "enter" ? pin : confirmPin).map((digit, index) => (
              <Input
                key={`pin-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value, step === "confirm")}
                onKeyDown={(e) => handleKeyDown(index, e, step === "confirm")}
                className="w-12 h-12 text-center text-xl bg-slate-800 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500"
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="border-slate-700 hover:bg-slate-800">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-cyan-600 hover:bg-cyan-700">
              {isPinSetup ? (step === "enter" ? "Next" : "Set PIN") : "Verify"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
