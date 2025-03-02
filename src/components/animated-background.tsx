"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.size = Math.random() * 15 + 5
        this.speedX = Math.random() * 2 - 1
        this.speedY = -Math.random() * 3 - 1
        this.alpha = Math.random() * 0.5 + 0.1

        // Create warm colors (reds, oranges, yellows)
        const hue = Math.floor(Math.random() * 60) + 10 // 10-70 range for warm hues
        const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 50 // 50-70%
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.alpha})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.1

        // Slight wiggle effect
        this.x += Math.random() * 2 - 1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const particleCount = Math.min(70, Math.floor(canvas.width / 15)) // Responsive particle count with higher density

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new particles more frequently
      if (Math.random() < 0.12 && particles.length < particleCount * 2) {
        particles.push(new Particle())
      }
      
      // Sometimes add multiple particles at once for more dynamic effect
      if (Math.random() < 0.03) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle())
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Remove particles that are too small or out of bounds
        if (
          particles[i].size <= 0.2 ||
          particles[i].y < -100 ||
          particles[i].x < -100 ||
          particles[i].x > canvas.width + 100
        ) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-70" />
}

