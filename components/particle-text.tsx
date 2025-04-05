"use client"

import type React from "react"
import { useEffect, useRef } from "react"

class Particle {
  x: number
  y: number
  size: number
  baseX: number
  baseY: number
  density: number
  isTextParticle: boolean
  speed: number
  angle: number

  constructor(x: number, y: number, isTextParticle: boolean) {
    this.x = x
    this.y = y
    this.size = isTextParticle ? 1.5 : Math.random() * 1 + 0.5
    this.baseX = x
    this.baseY = y
    this.density = isTextParticle ? Math.random() * 10 + 5 : 0
    this.isTextParticle = isTextParticle
    this.speed = Math.random() * 0.5 + 0.1
    this.angle = Math.random() * Math.PI * 2
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Use cyan/blue colors to match the dashboard theme
    if (this.isTextParticle) {
      const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.size, this.y + this.size)
      gradient.addColorStop(0, "#06b6d4") // cyan-500
      gradient.addColorStop(1, "#3b82f6") // blue-500
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = "rgba(6, 182, 212, 0.5)" // cyan with transparency
    }

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update(mouse: { x: number; y: number }, canvasWidth: number, canvasHeight: number) {
    if (this.isTextParticle) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance
      const maxDistance = 100
      const force = (maxDistance - distance) / maxDistance
      const directionX = forceDirectionX * force * this.density
      const directionY = forceDirectionY * force * this.density

      if (distance < maxDistance) {
        this.x -= directionX
        this.y -= directionY
      } else {
        if (this.x !== this.baseX) {
          const dx = this.x - this.baseX
          this.x -= dx / 10
        }
        if (this.y !== this.baseY) {
          const dy = this.y - this.baseY
          this.y -= dy / 10
        }
      }
    } else {
      this.x += Math.cos(this.angle) * this.speed
      this.y += Math.sin(this.angle) * this.speed

      if (this.x < 0 || this.x > canvasWidth) {
        this.x = (this.x + canvasWidth) % canvasWidth
      }
      if (this.y < 0 || this.y > canvasHeight) {
        this.y = (this.y + canvasHeight) % canvasHeight
      }
    }
  }
}

const ParticleText: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeParticles()
    }

    const initializeParticles = () => {
      particlesRef.current = []
      const offscreenCanvas = document.createElement("canvas")
      const offscreenCtx = offscreenCanvas.getContext("2d")

      if (!offscreenCtx) return

      offscreenCanvas.width = canvas.width
      offscreenCanvas.height = canvas.height

      // Create gradient for text
      const gradient = offscreenCtx.createLinearGradient(
        0,
        offscreenCanvas.height / 2 - 40,
        offscreenCanvas.width,
        offscreenCanvas.height / 2 + 40,
      )
      gradient.addColorStop(0, "#06b6d4") // cyan-500
      gradient.addColorStop(1, "#3b82f6") // blue-500

      offscreenCtx.fillStyle = gradient

      // Responsive font size based on screen width
      const isMobile = window.innerWidth < 768
      const fontSize = isMobile ? 40 : 60
      const subtitleFontSize = isMobile ? 30 : 50

      // Main title
      offscreenCtx.font = `bold ${fontSize}px Arial`
      offscreenCtx.textAlign = "center"
      offscreenCtx.textBaseline = "middle"
      offscreenCtx.fillText("MATWIX", canvas.width / 2, canvas.height / 2 - 50)

      // Subtitle with adjusted position for mobile
      offscreenCtx.font = `bold ${subtitleFontSize}px Arial`
      const verticalOffset = isMobile ? 30 : 50
      offscreenCtx.fillText("THE REAL WORLD", canvas.width / 2, canvas.height / 2 + verticalOffset)

      const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
      const step = isMobile ? 4 : 3 // Increase step for mobile to reduce particles

      for (let y = 0; y < imageData.height; y += step) {
        for (let x = 0; x < imageData.width; x += step) {
          if (imageData.data[y * 4 * imageData.width + x * 4 + 3] > 128) {
            particlesRef.current.push(new Particle(x, y, true))
          }
        }
      }

      // Add floating background particles - reduce count on smaller screens
      const particleDensityFactor = isMobile ? 0.3 : 1
      const numBackgroundParticles = Math.floor(((canvas.width * canvas.height) / 8000) * particleDensityFactor)
      for (let i = 0; i < numBackgroundParticles; i++) {
        particlesRef.current.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, false))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particlesRef.current) {
        particle.update(mouseRef.current, canvas.width, canvas.height)
        particle.draw(ctx)
      }
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default ParticleText

