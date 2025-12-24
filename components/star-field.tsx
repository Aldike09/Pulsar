"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: Star[] = []
    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
        opacity: Math.random(),
      })
    }

    let animationFrameId: number

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Parallax effect based on scroll
        const scrollY = window.scrollY
        const parallaxY = star.y - scrollY * star.speed * 0.5

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.05
        star.opacity = Math.max(0.1, Math.min(1, star.opacity))

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, parallaxY, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Add some colored stars
        if (Math.random() > 0.95) {
          const hue = Math.random() * 60 + 180 // Blue to cyan
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity * 0.5})`
          ctx.beginPath()
          ctx.arc(star.x, parallaxY, star.size * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}
