"use client"

import { useEffect, useRef, useState } from "react"

const facts = [
  {
    title: "Невероятная плотность",
    description:
      "Чайная ложка вещества нейтронной звезды весит около миллиарда тонн — больше, чем все здания на Земле вместе взятые. Это означает, что атомы буквально раздавлены, и протоны с электронами слились в нейтроны.",
    icon: "⚛️",
    color: "from-blue-400 to-cyan-400",
  },
  {
    title: "Сверхбыстрое вращение",
    description:
      "Пульсар PSR J1748-2446ad вращается со скоростью 716 оборотов в секунду — это быстрее, чем лопасти блендера! При этом его экватор движется со скоростью около 24% от скорости света.",
    icon: "🌪️",
    color: "from-purple-400 to-pink-400",
  },
  {
    title: "Экстремальная гравитация",
    description:
      "На поверхности нейтронной звезды гравитация в 2 миллиарда раз сильнее земной. Если вы уроните объект с высоты 1 метр, он ударится о поверхность на скорости 7 миллионов км/ч.",
    icon: "🪐",
    color: "from-red-400 to-orange-400",
  },
  {
    title: "Магнитное поле",
    description:
      "Магнетары обладают самым сильным магнитным полем во Вселенной — до 10¹⁵ Гаусс. Такое поле может стереть информацию с кредитной карты на расстоянии до половины расстояния от Земли до Луны.",
    icon: "🧲",
    color: "from-green-400 to-emerald-400",
  },
  {
    title: "Кристаллическая кора",
    description:
      "Кора нейтронной звезды состоит из кристаллической решётки атомных ядер — в основном железа и никеля. Это самая прочная структура во Вселенной, в миллиарды раз крепче стали.",
    icon: "💎",
    color: "from-yellow-400 to-amber-400",
  },
  {
    title: "Температура поверхности",
    description:
      "Новорожденные нейтронные звёзды имеют температуру поверхности около 1 миллиона градусов Кельвина — в 170 раз горячее, чем поверхность Солнца. Они светятся преимущественно в рентгеновском диапазоне.",
    icon: "🔥",
    color: "from-orange-400 to-red-400",
  },
]

export function FactsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(facts.length).fill(false))
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
        { threshold: 0.1 },
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
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
            style={{ fontFamily: "var(--font-cosmic)" }}
          >
            Удивительные Факты
          </h2>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {facts.map((fact, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`glass-card-premium p-8 hover:scale-[1.05] hover:rotate-1 transition-all duration-500 group relative overflow-hidden ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${fact.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
              />

              {/* Icon with animation */}
              <div className="text-6xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                {fact.icon}
              </div>

              {/* Title with gradient */}
              <h3
                className={`text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${fact.color}`}
              >
                {fact.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/80 leading-relaxed">{fact.description}</p>

              {/* Decorative corner element */}
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 group-hover:scale-[3] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
