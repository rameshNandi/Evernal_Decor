"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem("hasSeenPopup")
    const isPageReload = performance.navigation.type === 1

    if (isFirstVisit || isPageReload) {
      const callback = () => {
        const timer = setTimeout(() => {
          setIsOpen(true)
          sessionStorage.setItem("hasSeenPopup", "true")
        }, 3000)
        return () => clearTimeout(timer)
      }

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(callback)
      } else {
        callback()
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh]"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close popup"
              className="absolute top-3 right-3 rounded-full hover:bg-primary/10 hover:text-primary z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto">
              <img
                src="/pexels-nncapture-1679014.jpg"
                alt="Room Design"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 overflow-y-auto">
              <div className="mb-4">
                <p className="uppercase text-xs font-semibold text-gray-500">
                  Early Access 4th of July
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
                  <span className="text-3xl sm:text-4xl font-bold text-[#583804]">
                    20% OFF
                  </span>
                  <br />
                  <span className="text-base font-light">Your New Room Design</span>
                </h2>
                <p className="text-xs uppercase text-gray-500 mt-1">Limited Time Only</p>
              </div>

              <div id="popup-form">
                <p className="text-sm font-medium mb-3 text-center">
                  Fill the form and we’ll reach out within 24 hours:
                </p>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
