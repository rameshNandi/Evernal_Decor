"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "What services does Evernal Decor offer?",
    answer:
      "We offer comprehensive interior design services including residential design, commercial design, renovation services, project management, lighting design, space planning, furniture customization, concept development, and color consultation.",
  },
  {
    question: "How long does a typical interior design project take?",
    answer:
      "Project timelines vary depending on scope and complexity. Residential projects typically take 6-12 weeks, while commercial projects can range from 8-16 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you work with existing furniture and decor?",
    answer:
      "We love incorporating your existing pieces that have sentimental value or are in good condition. We'll work around your favorite items and suggest new pieces that complement your existing decor.",
  },
  {
    question: "What is your design process?",
    answer:
      "Our process includes: 1) Initial consultation and site visit, 2) Concept development and design proposal, 3) Detailed planning and material selection, 4) Project execution and management, 5) Final styling and handover.",
  },
  {
    question: "Do you provide 3D visualizations?",
    answer:
      "Yes, we provide detailed 3D renderings and visualizations for all our projects. This helps you visualize the final result before we begin implementation, ensuring you're completely satisfied with the design.",
  },
  {
    question: "What is included in your project management service?",
    answer:
      "Our project management includes coordination with contractors, timeline management, quality control, budget tracking, regular progress updates, and ensuring all work meets our high standards.",
  },
  {
    question: "Do you work on both residential and commercial projects?",
    answer:
      "Yes, we specialize in both residential and commercial interior design. Our team has extensive experience in homes, offices, restaurants, hotels, retail spaces, and other commercial establishments.",
  },
  {
    question: "How do you determine project costs?",
    answer:
      "Project costs depend on scope, materials, timeline, and complexity. We provide detailed quotes after our initial consultation and site assessment. We're transparent about all costs and work within your budget.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="pt-10 px-4 bg-gradient-to-br from-[var(--quill-gray)]/10 to-[var(--nobel)]/10">
      <div className="max-w-4xl mx-auto">
  

        <section className=" pb-20 px-4 bg-gradient-to-br from-[var(--quill-gray)]/20 to-[var(--nobel)]/20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-6 glow-text">
          Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about our interior design services and process
          </p>
        </div>
      </section>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="faq-item">
                <CardContent className="p-0 relative z-10">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg"
                  >
                    <h3 className="text-lg font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-[var(--rusty-nail)]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
