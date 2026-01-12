"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const stats = [
  {
    value: "500+",
    title: "Projects Completed",
    description: "Successfully delivered projects across residential and commercial spaces.",
    progress: 90,
  },
  {
    value: "7+",
    title: "Years of Experience",
    description: "Bringing expertise and innovation to interior design since 2018.",
    progress: 70,
  },
  {
    value: "4.8",
    title: "Client Rating",
    description: "Consistently delivering exceptional service and results for our clients.",
    progress: 80,
  },
]

export default function StatsWithProgress() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoading(false)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-white px-4 py-16">
      <div className="text-center mb-12 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 "
        >
          Our Achievements
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-[#583804] max-w-2xl mx-auto"
        >
          Milestones that showcase our excellence in design
        </motion.p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#f5e6cc] border-t-[#8c5c05] rounded-full"
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, index) => {
            const isHovered = hoveredCard === index
            const radius = 36
            const circumference = 2 * Math.PI * radius
            const strokeDashoffset = circumference - (item.progress / 100) * circumference

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
                <div className="relative flex justify-center mb-6 h-28">
                  <svg className="w-28 h-28" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#f5e6cc"
                      strokeWidth="8"
                    />
                    {/* Progress circle - starts from top (12 o'clock) */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#8c5c05"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{
                        strokeDashoffset,
                        transition: { duration: 1.5, ease: "easeInOut" },
                      }}
                      transform="rotate(-90 50 50)" // Rotate to start from top
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className="text-xl font-bold text-[#583804]"
                    >
                      {item.value}
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#583804] mb-3">{item.title}</h3>
                <p className="text-sm text-[#5e5e5e]">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}