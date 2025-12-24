"use client"

import { useEffect, useRef, useState } from "react"

const discoveries = [
  {
    year: "1934",
    title: "Теоретическое предсказание",
    description:
      "Астрономы Вальтер Бааде и Фриц Цвикки впервые предположили существование нейтронных звезд. Они предсказали, что эти объекты могут образовываться при взрыве сверхновых, когда ядро звезды коллапсирует.",
    icon: "🔬",
  },
  {
    year: "1967",
    title: "Первое открытие",
    description:
      "Джоселин Белл Бёрнелл и Энтони Хьюиш обнаружили первый пульсар — быстро вращающуюся нейтронную звезду. Сигнал был настолько регулярным, что его сначала приняли за послание внеземной цивилизации и назвали LGM-1 (Little Green Men).",
    icon: "📡",
  },
  {
    year: "1968",
    title: "Пульсар в Крабовидной туманности",
    description:
      "Был обнаружен пульсар PSR B0531+21 в центре Крабовидной туманности — остатка сверхновой, которую наблюдали на Земле в 1054 году. Это подтвердило связь между сверхновыми и нейтронными звездами.",
    icon: "🌌",
  },
  {
    year: "2017",
    title: "Гравитационные волны",
    description:
      "Детекторы LIGO и Virgo зарегистрировали гравитационные волны от слияния двух нейтронных звезд — событие GW170817. Это открыло новую эру многоканальной астрономии и подтвердило происхождение тяжелых элементов.",
    icon: "🌊",
  },
]

export function DiscoverySection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(discoveries.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        },
        { threshold: 0.2 },
      )

      if (card) observer.observe(card)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <h2
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            style={{ fontFamily: "var(--font-cosmic)" }}
          >
            История Открытий
          </h2>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            От теоретических расчётов до революционных наблюдений — путь человечества к пониманию нейтронных звёзд
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50 hidden lg:block" />

          <div className="space-y-24">
            {discoveries.map((discovery, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className={`relative transition-all duration-1000 ${
                  visibleCards[index] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Year badge */}
                  <div className={`${index % 2 === 0 ? "lg:text-right" : "lg:text-left lg:order-2"} mb-6 lg:mb-0`}>
                    <div className="inline-block glass-card-premium px-8 py-4 hover:scale-110 transition-transform duration-300">
                      <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400">
                        {discovery.year}
                      </span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`${index % 2 === 0 ? "" : "lg:order-1"}`}>
                    <div className="glass-card-premium p-8 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                          {discovery.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-purple-300 group-hover:text-pink-300 transition-colors">
                            {discovery.title}
                          </h3>
                          <p className="text-foreground/80 leading-relaxed text-lg">{discovery.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-background shadow-lg shadow-purple-500/50 z-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
