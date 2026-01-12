"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"



const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Mumbai",
    content:
      "Evernal gave our flat a complete makeover. The team understood our needs perfectly and delivered beyond expectations.",
    rating: 5,
    photo: "/images/testimonials/rajesh-sharma.webp",
  },
  {
    name: "Priya Patel",
    role: "Cafe Owner, Delhi",
    content:
      "Our cafe's new interior design attracted 40% more customers. The ambiance is now perfect for our target audience.",
    rating: 4,
    photo: "/images/testimonials/priya-patel.webp",
  },
  {
    name: "Arjun Das",
    role: "Office Manager, Bangalore",
    content:
      "The modern workspace design has boosted employee morale. Professional execution with minimal disruption.",
    rating: 5,
    photo: "/images/testimonials/arjun-das.webp",
  },
  {
    name: "Ananya Dasgupta",
    role: "Boutique Owner, Kolkata",
    content:
      "Beautiful color combinations and space utilization. Customers keep complimenting the store's new look.",
    rating: 4,
    photo: "/images/testimonials/ananya-dasgupta.webp",
  },
  {
    name: "Vikram Dutta",
    role: "Hotel Owner, Goa",
    content:
      "Complete renovation done before deadline. The coastal theme implementation was exceptional.",
    rating: 5,
    photo: "/images/testimonials/vikram-dutta.webp",
  },
  {
    name: "Nikita Roy",
    role: "Homeowner, Pune",
    content:
      "Budget-friendly yet premium looking interior solutions. Will definitely recommend to friends and family.",
    rating: 4,
    photo: "/images/testimonials/nikita-roy.webp",
  },
]

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="h-full border border-[var(--yellow-metal)] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? "fill-[var(--rusty-nail)] text-[var(--rusty-nail)]"
                  : "text-[var(--dusty-gray)]"
              }`}
            />
          ))}
        </div>
        <p className="text-[var(--brown-bramble)] mb-6 italic text-base line-clamp-4">
          "{testimonial.content}"
        </p>
        <div className="flex items-center mt-auto">
          {testimonial.photo ? (
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8c5c05] to-[#583804] flex items-center justify-center text-white font-bold mr-3">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-[var(--brown-bramble)] line-clamp-1">
              {testimonial.name}
            </h4>
            <p className="text-sm text-[var(--rusty-nail)] line-clamp-1">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function Testimonials() {
  return (
    <>
      <section className="pt-16 px-4 bg-gradient-to-br from-[var(--quill-gray)]/20 to-[var(--nobel)]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 "
            >
              Client Experiences
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-[var(--brown-bramble)] max-w-2xl mx-auto"
            >
              Stories of satisfaction from across India
            </motion.p>
          </div>

          {/* Mobile Slider */}
          <div className="block sm:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              modules={[Autoplay]}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
    </>
  )
}
