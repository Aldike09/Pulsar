"use client"

import { useEffect, useRef, useState } from "react"

export function NeutronStar3D() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2
          className={`text-4xl md:text-6xl font-bold text-center text-cosmic-purple transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ fontFamily: "var(--font-cosmic)" }}
        >
          Интерактивная 3D Модель
        </h2>

        <div
          className={`glass-card-premium p-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Neutron Star"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/f3d06d6bb3794377afa7735460f23414/embed"
              className="w-full h-full border-0"
            />
          </div>
        </div>

        <p
          className={`text-center text-cosmic-blue text-lg transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Вращайте модель мышью для детального изучения структуры нейтронной звезды
        </p>
      </div>
    </section>
  )
}
