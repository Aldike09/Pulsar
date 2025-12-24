"use client"

import { useEffect, useRef } from "react"

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  thickness: number
}

export function MeteorShower() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const meteors: Meteor[] = []

    const createMeteor = () => {
      return {
        x: Math.random() * canvas.width + canvas.width * 0.2,
        y: -50,
        length: Math.random() * 100 + 60,
        speed: Math.random() * 4 + 3,
        angle: Math.PI / 4 + Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.6 + 0.4,
        thickness: Math.random() * 2.5 + 1.5,
      }
    }

    for (let i = 0; i < 2; i++) {
      meteors.push(createMeteor())
    }

    let animationFrameId: number
    let lastMeteorTime = Date.now()

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (Date.now() - lastMeteorTime > 3000 + Math.random() * 4000) {
        meteors.push(createMeteor())
        lastMeteorTime = Date.now()
      }

      // Draw and update meteors
      meteors.forEach((meteor, index) => {
        const endX = meteor.x - Math.cos(meteor.angle) * meteor.length
        const endY = meteor.y - Math.sin(meteor.angle) * meteor.length

        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`)
        gradient.addColorStop(0.3, `rgba(150, 220, 255, ${meteor.opacity * 0.8})`)
        gradient.addColorStop(0.7, `rgba(100, 150, 255, ${meteor.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(80, 120, 200, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = meteor.thickness
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo(meteor.x, meteor.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Enhanced glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = `rgba(150, 200, 255, ${meteor.opacity})`
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`
        ctx.beginPath()
        ctx.arc(meteor.x, meteor.y, meteor.thickness * 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        meteor.x += Math.cos(meteor.angle) * meteor.speed
        meteor.y += Math.sin(meteor.angle) * meteor.speed

        if (meteor.y > canvas.height + 100 || meteor.x > canvas.width + 100) {
          meteors.splice(index, 1)
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
