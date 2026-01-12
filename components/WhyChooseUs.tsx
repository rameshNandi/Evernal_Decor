"use client"

import { motion } from "framer-motion"
import {
  CalendarCheck,
  HandCoins,
  PackageCheck,
} from "lucide-react"
import { useState } from "react"

const benefits = [
  {
    icon: CalendarCheck,
    title: "Save Time",
    description:
      "Realistic 3D model & top professional help to take the guesswork out of the designing process.",
  },
  {
    icon: HandCoins,
    title: "Save Money",
    description:
      "Top talent for up to 80% less than traditional interior design & trade discounts of 5% to 45% at the top vendors.",
  },
  {
    icon: PackageCheck,
    title: "Convenient & Stress Free",
    description:
      "A fun and easy white-glove service including everything from design to convenient ordering.",
  },
]

// Animated dots just below icon inside circle
function DotBurstBelowIcon() {
  const dots = Array.from({ length: 12 })

  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-0">
      {dots.map((_, i) => {
        const angle = Math.random() * 2 * Math.PI
        const distance = 8 + Math.random() * 12
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const delay = Math.random() * 0.3

        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#8c5c05] rounded-full opacity-70"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x,
              y,
              opacity: 0,
              transition: {
                duration: 1.2,
                delay,
                ease: "easeOut",
              },
            }}
          />
        )
      })}
    </div>
  )
}

export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="bg-white  px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
        {benefits.map((item, index) => {
          const Icon = item.icon
          const isHovered = hoveredCard === index

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative flex justify-center mb-4">
                <div className="relative w-20 h-20 rounded-full bg-[#f5e6cc] border-2 border-[#8c5c05] flex items-center justify-center">
                  <motion.div
                    animate={isHovered ? { x: [0, 8, -8, 0] } : {}}
                    transition={{ duration: 1 }}
                    className="z-10"
                  >
                    <Icon className="w-8 h-8 text-[#8c5c05]" />
                  </motion.div>
                  {isHovered && <DotBurstBelowIcon />}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#583804] mb-3">{item.title}</h3>
              <p className="text-sm text-[#5e5e5e]">{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
