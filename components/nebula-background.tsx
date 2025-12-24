"use client"

import { useEffect, useRef } from "react"

export function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: false })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0
    let animationFrameId: number

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scrollY = window.scrollY * 0.2

      const layers = [
        { color: [60, 20, 100], offset: scrollY * 0.3, scale: 1.5, speed: 0.0008 },
        { color: [20, 60, 130], offset: scrollY * 0.5, scale: 1.8, speed: 0.0012 },
        { color: [80, 30, 150], offset: scrollY * 0.4, scale: 1.2, speed: 0.001 },
        { color: [40, 100, 180], offset: scrollY * 0.6, scale: 2.0, speed: 0.0015 },
      ]

      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < 6; i++) {
          const x =
            (canvas.width / 5) * i +
            Math.sin(time * layer.speed + i + layerIndex) * 150 -
            ((layer.offset * 0.5) % canvas.width)
          const y =
            (canvas.height / 2) * (layerIndex % 2) +
            Math.cos(time * layer.speed * 1.3 + i + layerIndex) * 100 +
            layer.offset

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 350 * layer.scale)
          gradient.addColorStop(
            0,
            `rgba(${layer.color[0]}, ${layer.color[1]}, ${layer.color[2]}, ${0.12 * layer.scale})`,
          )
          gradient.addColorStop(
            0.4,
            `rgba(${layer.color[0]}, ${layer.color[1]}, ${layer.color[2]}, ${0.06 * layer.scale})`,
          )
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
      })

      time += 16
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleScroll = () => {
      // Parallax effect trigger
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: "screen", opacity: 0.7 }}
    />
  )
}
