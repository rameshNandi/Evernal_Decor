"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { X } from "lucide-react"

import { mockImages } from "@/app/gallery/api/images/route"

const categories = [
  "All",
  "Living Room",
  "Dining Room",
  "Bedroom",
  "Kitchen",
  "Hallway",
  "Kids",
  "Bathroom",
  "Office",
  "Outdoor",
  "Business",
  "Other",
]

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<{
    url: string
    category: string
  } | null>(null)

  const getOneImagePerCategory = () => {
    const uniqueImages = categories
      .filter((cat) => cat !== "All")
      .map((cat) => mockImages.find((img) => img.category === cat))
      .filter(Boolean)
      .slice(0, 12)
    return uniqueImages
  }

  const filteredImages =
    activeCategory === "All"
      ? getOneImagePerCategory()
      : mockImages.filter((img) => img.category === activeCategory).slice(0, 12)

  return (
    <section className="bg-white text-[#583804] pt-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-8">
        Explore Real Spaces We've Transformed
      </h2>

      {/* Category Filter */}
      <div className="mb-10 overflow-x-auto whitespace-nowrap scrollbar-none -mx-4 px-4 pt-7">
        <div className="inline-flex gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "px-4 py-2 rounded-full border border-[#8c5c05] text-sm font-medium transition-all shrink-0",
                activeCategory === category
                  ? "bg-[#8c5c05] text-white"
                  : "text-[#8c5c05] hover:bg-[#f8f1e9]"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Slider (max-width: 639px) */}
      <div className="block sm:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="custom-swiper"
        >
          {filteredImages.map((img) => (
            <SwiperSlide key={img!.id}>
              <motion.div
                className="relative group overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  setSelectedImage({ url: img!.url, category: img!.category })
                }
              >
                <Image
                  src={img!.url}
                  alt={img!.category}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-0 w-full p-3 text-center text-white text-base bg-[#8c5c05]/80 transition-all duration-300"
                >
                  {img!.category}
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid for Tablet & Desktop (≥640px) */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <motion.div
            key={img!.id}
            className="relative group overflow-hidden rounded-xl shadow-lg"
            whileHover={{ scale: 1.03 }}
            onClick={() =>
              setSelectedImage({ url: img!.url, category: img!.category })
            }
          >
            <Image
              src={img!.url}
              alt={img!.category}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute bottom-0 w-full p-3 text-center text-white text-base bg-[#8c5c05]/80 transition-all duration-300"
            >
              {img!.category}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.category}
                width={1200}
                height={800}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-white text-black rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center text-white mt-2 text-lg font-medium">
                {selectedImage.category}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
