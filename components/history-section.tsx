"use client"

import { useEffect, useRef, useState } from "react"

const physicsData = [
  {
    title: "Экстремальные состояния материи",
    subtitle: "Внутри нейтронной звезды",
    description:
      "Нейтронные звёзды представляют собой лабораторию экстремальной физики. Плотность вещества в их ядре достигает 10¹⁵ г/см³ — в миллиарды раз плотнее атомного ядра. При таких условиях материя переходит в экзотические состояния: возможно образование кварк-глюонной плазмы, гиперонов и даже странной материи.",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    title: "Магнетары",
    subtitle: "Самые магнитные объекты Вселенной",
    description:
      "Магнетары — это нейтронные звёзды с магнитным полем в 1000 триллионов раз сильнее земного. Такое поле способно исказить атомы, превращая их в вытянутые структуры, и влияет на квантовый вакуум. Вспышки магнетаров выделяют за долю секунды больше энергии, чем Солнце за 100 000 лет.",
    gradient: "from-purple-400 to-pink-600",
  },
  {
    title: "Пульсары как космические маяки",
    subtitle: "Прецизионные часы Вселенной",
    description:
      "Некоторые пульсары вращаются с невероятной стабильностью — их период вращения может быть предсказан с точностью до наносекунд на годы вперёд. Это делает их одними из самых точных часов во Вселенной. Астрономы используют их для навигации космических аппаратов и поиска гравитационных волн.",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "Килоновые и происхождение элементов",
    subtitle: "Фабрики тяжёлых элементов",
    description:
      "При столкновении двух нейтронных звёзд происходит килоновая — взрыв, создающий условия для r-процесса нуклеосинтеза. Именно так во Вселенной образуются золото, платина, уран и другие тяжёлые элементы. Всё золото на Земле — результат древних столкновений нейтронных звёзд.",
    gradient: "from-yellow-400 to-orange-600",
  },
]

export function HistorySection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(physicsData.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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
        { threshold: 0.15 },
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
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
            style={{ fontFamily: "var(--font-cosmic)" }}
          >
            Физика и Феномены
          </h2>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Нейтронные звёзды — это не просто космические объекты, а уникальные физические лаборатории, раскрывающие
            тайны материи и пространства-времени
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {physicsData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`glass-card-premium p-8 transition-all duration-1000 hover:scale-[1.03] group relative overflow-hidden ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
              />

              {/* Animated border glow */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                style={{
                  background: `linear-gradient(45deg, transparent, ${hoveredCard === index ? "rgba(100, 200, 255, 0.3)" : "transparent"}, transparent)`,
                  filter: "blur(20px)",
                }}
              />

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3
                    className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-lg font-semibold text-foreground/60 italic">{item.subtitle}</p>
                </div>

                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

                <p className="text-foreground/80 leading-relaxed text-lg">{item.description}</p>

                {/* Decorative element */}
                <div className="flex justify-end">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
