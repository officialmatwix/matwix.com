"use client"

import { useEffect, useRef } from "react"

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial setup
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Text settings
    const text = "MATWIX"
    ctx.font = "bold 180px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Measure text to center it
    const textWidth = ctx.measureText(text).width
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw text (invisible, just for particle positioning)
    ctx.fillText(text, centerX, centerY)

    // Get pixel data
    let imageData
    try {
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    } catch (e) {
      console.error("Error getting image data:", e)
      return
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Particle settings
    const particleSize = 3
    const particleSpacing = 6
    const particles: {
      x: number
      y: number
      originX: number
      originY: number
      color: string
      vx: number
      vy: number
    }[] = []

    // Create particles based on text pixels
    for (let y = 0; y < canvas.height; y += particleSpacing) {
      for (let x = 0; x < canvas.width; x += particleSpacing) {
        // Safety check to prevent out-of-bounds access
        const pixelIndex = (y * canvas.width + x) * 4
        if (pixelIndex >= imageData.data.length) continue

        const alpha = imageData.data[pixelIndex + 3]
        if (alpha > 128) {
          const colors = ["#8b5cf6", "#06b6d4", "#3b82f6"]
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            originX: x,
            originY: y,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        // Calculate direction to origin
        const dx = particle.originX - particle.x
        const dy = particle.originY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Update velocity
        particle.vx = dx * 0.05
        particle.vy = dy * 0.05

        // Apply velocity with easing
        if (distance > 1) {
          particle.x += particle.vx
          particle.y += particle.vy
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black" style={{ touchAction: "none" }} />
}
