"use client"

import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-16" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="space-y-8">
          <h1
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 transition-all duration-1000 cursor-default leading-tight ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              fontFamily: "var(--font-cosmic)",
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
              textShadow: "0 0 100px rgba(100, 200, 255, 0.6), 0 0 50px rgba(150, 100, 255, 0.4)",
            }}
          >
            Нейтронные Звёзды
          </h1>

          <div className="flex justify-center gap-4">
            <div
              className={`h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
            <div
              className={`h-1 w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </div>

          <p
            className={`text-xl md:text-2xl lg:text-3xl font-light text-cyan-200/80 transition-all duration-1000 delay-300 max-w-4xl mx-auto ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Загадочные реликты звёздных катастроф
          </p>
        </div>

        <div
          className={`glass-card-premium p-8 md:p-12 lg:p-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
          }}
        >
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90 font-light text-balance">
            Нейтронные звёзды — одни из самых загадочных и экстремальных объектов во Вселенной. Рождённые в
            катастрофических взрывах сверхновых, эти космические монстры сжимают массу больше Солнца в сферу размером с
            небольшой город. Их плотность настолько невероятна, что чайная ложка их вещества весила бы миллиард тонн на
            Земле.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 mx-auto text-cyan-400 drop-shadow-[0_0_10px_rgba(100,200,255,0.8)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
