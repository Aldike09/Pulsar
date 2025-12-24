"use client"

import { useEffect, useRef, useState } from "react"

const formulas = [
  {
    title: "Масса Чандрасекара",
    formula: "$$M \\approx 1.4 M_{\\odot}$$",
    description:
      "Типичная масса нейтронной звезды составляет около 1.4 массы Солнца. Это критическая масса, известная как предел Чандрасекара, при которой электронное давление не может противостоять гравитационному коллапсу.",
    color: "from-blue-400 to-cyan-400",
  },
  {
    title: "Компактный радиус",
    formula: "$$R \\approx 10-12 \\text{ км}$$",
    description:
      "Несмотря на огромную массу, радиус нейтронной звезды всего 10-12 километров — размером с небольшой город. Для сравнения, радиус Солнца составляет 696 000 км.",
    color: "from-purple-400 to-pink-400",
  },
  {
    title: "Экстремальная плотность",
    formula: "$$\\rho \\approx 10^{17} \\text{ кг/м}^3$$",
    description:
      "Плотность вещества нейтронной звезды достигает 100 триллионов кг на кубический метр. Это означает, что один кубический сантиметр весит столько же, сколько все здания Нью-Йорка вместе взятые.",
    color: "from-green-400 to-emerald-400",
  },
  {
    title: "Гравитационное ускорение",
    formula: "$$g \\approx 2 \\times 10^{12} \\text{ м/с}^2$$",
    description:
      "Поверхностная гравитация в 200 миллиардов раз сильнее земной. При таких условиях даже атомы деформируются, принимая вытянутую форму вдоль силовых линий гравитационного поля.",
    color: "from-red-400 to-orange-400",
  },
  {
    title: "Релятивистская скорость убегания",
    formula: "$$v_{esc} \\approx 0.5c$$",
    description:
      "Вторая космическая скорость составляет около половины скорости света (150 000 км/с). Это означает, что свет заметно искривляется вблизи поверхности из-за сильного гравитационного линзирования.",
    color: "from-yellow-400 to-amber-400",
  },
  {
    title: "Магнитная индукция",
    formula: "$$B \\approx 10^{8}-10^{15} \\text{ Тл}$$",
    description:
      "Обычные пульсары имеют поле около 100 миллионов Тесла, а магнетары — до квадриллиона Тесла. Для сравнения, самые мощные магниты на Земле создают поля около 45 Тесла.",
    color: "from-pink-400 to-rose-400",
  },
]

export function FormulasSection() {
  const [visibleFormulas, setVisibleFormulas] = useState<boolean[]>(new Array(formulas.length).fill(false))
  const formulasRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    script.async = true
    document.head.appendChild(script)

    const observers = formulasRef.current.map((formula, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFormulas((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        },
        { threshold: 0.1 },
      )

      if (formula) observer.observe(formula)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      if (script) document.head.removeChild(script)
    }
  }, [])

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <h2
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"
            style={{ fontFamily: "var(--font-cosmic)" }}
          >
            Физические Формулы
          </h2>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Математическое описание экстремальных характеристик нейтронных звёзд
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {formulas.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                formulasRef.current[index] = el
              }}
              className={`glass-card-premium p-8 hover:scale-[1.03] transition-all duration-700 group relative overflow-hidden ${
                visibleFormulas[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
              />

              <div className="space-y-4">
                <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                  {item.title}
                </h3>

                <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
                  <div className="text-2xl md:text-3xl text-white font-mono text-center overflow-x-auto">
                    {item.formula}
                  </div>
                </div>

                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">{item.description}</p>
              </div>

              {/* Decorative corner glow */}
              <div
                className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${item.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
