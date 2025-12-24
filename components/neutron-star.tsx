"use client"

import { useEffect, useRef } from "react"

export function NeutronStar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 300

    let rotation = 0
    let hue = 180

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 60

      // Rotating neutron star with magnetic field lines
      rotation += 0.02
      hue = (hue + 0.5) % 360

      // Glow effect
      for (let i = 0; i < 3; i++) {
        const glowRadius = radius + i * 20
        const gradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, glowRadius)
        gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${0.3 - i * 0.1})`)
        gradient.addColorStop(1, "hsla(200, 100%, 50%, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      coreGradient.addColorStop(0, `hsl(${hue}, 100%, 80%)`)
      coreGradient.addColorStop(0.5, `hsl(${hue + 20}, 90%, 60%)`)
      coreGradient.addColorStop(1, `hsl(${hue + 40}, 80%, 40%)`)

      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Magnetic field lines
      ctx.strokeStyle = `hsla(${hue + 60}, 100%, 70%, 0.6)`
      ctx.lineWidth = 2

      for (let i = 0; i < 8; i++) {
        const angle = rotation + (i * Math.PI) / 4
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.quadraticCurveTo(
          centerX + Math.cos(angle) * 100,
          centerY + Math.sin(angle) * 100,
          centerX + Math.cos(angle + 0.5) * 120,
          centerY + Math.sin(angle + 0.5) * 120,
        )
        ctx.stroke()
      }

      // Rotation bands
      for (let i = 0; i < 5; i++) {
        const y = centerY - radius + (i * radius * 2) / 5
        ctx.strokeStyle = `hsla(${hue}, 80%, 40%, ${0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(centerX, y, radius * 0.9, radius * 0.1, rotation * 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="fixed top-1/4 right-10 md:right-20 z-20 hidden lg:block">
      <canvas ref={canvasRef} className="drop-shadow-[0_0_50px_rgba(100,200,255,0.5)]" />
    </div>
  )
}
