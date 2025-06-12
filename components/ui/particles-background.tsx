"use client"

import { useEffect, useRef, useState } from "react"

interface ParticlesBackgroundProps {
  quantity?: number
  speed?: number
  color?: string
  connectParticles?: boolean
}

export function ParticlesBackground({
  quantity = 100,
  speed = 0.5,
  color = "#8b5cf6",
  connectParticles = true,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Responsive resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight

        // Set canvas dimensions with device pixel ratio for retina displays
        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        setDimensions({ width, height })

        // Scale the context
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.scale(dpr, dpr)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Determine colors
    const getParticleColor = () => {
      const colors = [color, "#06b6d4", "#3b82f6"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const getLineColor = (alpha: number) => {
      return `rgba(100, 116, 139, ${alpha})`
    }

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
    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        color: getParticleColor(),
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    let animationFrameId: number

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around edges
        if (p.x < 0) p.x = dimensions.width
        if (p.x > dimensions.width) p.x = 0
        if (p.y < 0) p.y = dimensions.height
        if (p.y > dimensions.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Draw connections
        if (connectParticles) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 100

            if (distance < maxDistance) {
              // Calculate opacity based on distance
              const opacity = 1 - distance / maxDistance

              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = getLineColor(opacity * 0.2)
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions, quantity, speed, color, connectParticles])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-40" aria-hidden="true" />
}

// Keep the default export for backward compatibility
export default ParticlesBackground
