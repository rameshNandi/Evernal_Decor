"use client";
import Link from 'next/link';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, ClipboardList, Lightbulb, Home, Building, Palette, Layout, Sofa, Pipette, X } from "lucide-react";
import renovationImg from "@/public/images/services/evernal-decor-renovation-interior-design-service-1.webp";
import projectImg from "@/public/images/services/evernal-decor-project-management-interior-design-service-2.webp";
import lightingImg from "@/public/images/services/evernal-decor-lighting-interior-design-service-3.webp";
import residentialImg from "@/public/images/services/evernal-decor-residential-interior-design-service-4.webp";
import commercialImg from "@/public/images/services/evernal-decor-commercial-office-interior-design-service-5.webp";
import conceptImg from "@/public/images/services/evernal-decor-conecept-interior-design-service-6.webp";
import spaceImg from "@/public/images/services/evernal-decor-3d-service-7.webp";
import furnitureImg from "@/public/images/services/evernal-decor-furniture-design-service-7.webp";
import colorImg from "@/public/images/services/evernal-decor-colour-selection-service-7.webp";
import Image from "next/image";

const services = [
  { icon: <Wrench className="h-6 w-6" />, title: "Renovation Services", description: "Elevate your property with Evernal Decor's renovation services...", image: renovationImg, color: "from-amber-500 to-amber-700", details: "Our comprehensive renovation services transform your existing space..." },
  { icon: <ClipboardList className="h-6 w-6" />, title: "Project Management", description: "At Evernal Decor we ensures seamless project management...", image: projectImg, color: "from-emerald-500 to-emerald-700", details: "From initial planning to final execution, our project management team..." },
  { icon: <Lightbulb className="h-6 w-6" />, title: "Lighting Design", description: "Brighten up your space with Evernal Decor's lighting design...", image: lightingImg, color: "from-violet-500 to-violet-700", details: "Lighting is the jewelry of interior design..." },
  { icon: <Home className="h-6 w-6" />, title: "Residential Design", description: "At Evernal Decor we transform your houses into dream homes...", image: residentialImg, color: "from-rose-500 to-rose-700", details: "We create homes that reflect your personality..." },
  { icon: <Building className="h-6 w-6" />, title: "Commercial Design", description: "At Evernal Decor we deliver innovative commercial designs...", image: commercialImg, color: "from-blue-500 to-blue-700", details: "Your commercial space should work as hard as you do..." },
  { icon: <Palette className="h-6 w-6" />, title: "Concept Development", description: "At Evernal Decor we transform visions into reality...", image: conceptImg, color: "from-purple-500 to-purple-700", details: "Every great design begins with a strong concept..." },
  { icon: <Layout className="h-6 w-6" />, title: "Space Planning", description: "Optimize your property with Evernal Decor's space planning services...", image: spaceImg, color: "from-teal-500 to-teal-700", details: "Good space planning is the foundation..." },
  { icon: <Sofa className="h-6 w-6" />, title: "Furniture Customization", description: "At Evernal Decor we crafts bespoke furniture solutions...", image: furnitureImg, color: "from-amber-500 to-amber-700", details: "Our custom furniture service creates one-of-a-kind pieces..." },
  { icon: <Pipette className="h-6 w-6" />, title: "Colour Consultation", description: "At Evernal Decor, our expert colour consultation transforms spaces...", image: colorImg, color: "from-pink-500 to-pink-700", details: "Color has the power to transform moods and perceptions..." }
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="px-4 bg-white dark:from-gray-900 dark:to-gray-800 lg:pt-12 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Comprehensive interior design solutions tailored for your space</p>
        </div>

        {/* Mobile Scroll Cards */}
        <div className="sm:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory px-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="min-w-[90%] snap-center"
            >
              <Card
                onClick={() => openModal(service)}
                className="group relative cursor-pointer h-full rounded-xl border bg-white dark:bg-gray-800 shadow-lg transition hover:shadow-2xl"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="p-6 rounded-b-xl">
                  <motion.div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4`} whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    {service.icon}
                  </motion.div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                  </CardContent>
                  <div className="mt-6 text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] font-medium">Learn More →</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }}>
              <Card onClick={() => openModal(service)} className="group relative cursor-pointer h-full rounded-xl border bg-white dark:bg-gray-800 shadow-lg transition hover:shadow-2xl">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="p-6 rounded-b-xl">
                  <motion.div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4`} whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    {service.icon}
                  </motion.div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                  </CardContent>
                  <div className="mt-6 text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] font-medium">Learn More →</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedService && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.3 }} className="relative bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <button onClick={closeModal} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none overflow-hidden">
                    <Image src={selectedService.image} alt={selectedService.title} fill className="object-cover" />
                  </div>

                  <div className="p-8">
                    <motion.div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${selectedService.color} flex items-center justify-center text-white mb-6`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      {selectedService.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedService.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedService.description}</p>
                    <div className="prose text-gray-700 dark:text-gray-300"><p>{selectedService.details}</p></div>

                    <div className="mt-8">
                      <Link href="/contact">
                        <button className="px-6 py-3 bg-[var(--brown-bramble)] dark:bg-[var(--yellow-metal)] text-white rounded-lg hover:opacity-90 transition">
                          Contact Us About This Service
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
