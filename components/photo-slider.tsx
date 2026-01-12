"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"

const photos = [
  "/videos/home_page_pic_1.jpeg",
  "/videos/home_page_pic_2.jpg",
  "/videos/home_page_pic_3.jpg",
  "/videos/home_page_pic_4.jpg",
]

const headingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const headingLetter = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function PhotoSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fromLeft, setFromLeft] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFromLeft(true)
      setActiveIndex((prev) => (prev + 1) % photos.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const nextPhoto = () => {
    setFromLeft(true)
    setActiveIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setFromLeft(false)
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const onThumbnailClick = (index: number) => {
    setFromLeft(index < activeIndex)
    setActiveIndex(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden text-white bg-gradient-to-b from-[#7a5010] to-[#b3791a]">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={photos[activeIndex]}
          alt={`Background ${activeIndex}`}
          initial={{
            x: fromLeft ? -100 : 100,
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            x: fromLeft ? 100 : -100,
            opacity: 0,
            scale: 1.05,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover z-0"
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-black/60" />
      </div>
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          variants={headingContainer}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-5xl md:text-7xl font-bold drop-shadow-lg flex flex-wrap justify-center"
        >
          <>
            {"Evernal".split("").map((char, index) => (
              <motion.span
                key={`evernal-${index}`}
                variants={headingLetter}
                className="inline-block text-white"
              >
                {char}
              </motion.span>
            ))}
            <motion.span className="inline-block w-2" />
            {"Decor".split("").map((char, index) => (
              <motion.span
                key={`decor-${index}`}
                variants={headingLetter}
                className="inline-block text-white"
              >
                {char}
              </motion.span>
            ))}
          </>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/90"
        >
          We specialize in creating beautifully designed spaces that harmoniously blend style,
          functionality and creativity.
        </motion.p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="bg-[#8c5c05] hover:bg-[#583804] text-white px-8 py-2 text-lg rounded-full shadow-md transition">
              Get Free Consultation
            </button>
          </Link>
          <Link href="/projects">
            <button className="border border-white text-white px-8 py-2 text-lg rounded-full shadow-md hover:bg-white/10 transition">
              View Our Portfolio
            </button>
          </Link>
        </div>
      </div>

      {/* Thumbnails Box */}
      <div
        className={`
          hidden md:flex
          absolute z-30 bg-[#583804]/80 rounded-md shadow-xl
          items-center justify-center
          p-2 gap-2 flex-wrap
          bottom-[88px] left-1/2 -translate-x-1/2
          md:flex-col md:space-y-4 md:space-x-0
          md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0
        `}
      >
        {photos.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Thumbnail ${i + 1}`}
            onClick={() => onThumbnailClick(i)}
            whileHover={{ scale: 1.1 }}
            className={`w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full object-cover border-4 transition cursor-pointer ${
              activeIndex === i ? "border-yellow-400" : "border-transparent"
            }`}
            draggable={false}
          />
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        <button
          onClick={prevPhoto}
          className="bg-[#8c5c05] hover:bg-[#583804] text-white p-3 rounded-full shadow-lg transition"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextPhoto}
          className="bg-[#8c5c05] hover:bg-[#583804] text-white p-3 rounded-full shadow-lg transition"
          aria-label="Next Photo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}
