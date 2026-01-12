"use client"

import { Navigation } from "@/components/navigation"
// import { VideoBanner } from "@/components/video-banner"  <-- remove this import
import { PhotoSlider } from "@/components/photo-slider"
import { ServicesSection } from "@/components/services-section"
import { Testimonials } from "@/components/testimonials"
import { ClientLogos } from "@/components/client-logos"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Gallery } from "@/components/gallery"
import { InteriorDesignShowcase } from "@/components/how-it-works-section"
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider"
import WhyChooseUs from "@/components/WhyChooseUs"
import StatsWithProgress from "@/components/StatsWithProgress"
import HeroSection from "@/components/HeroSection"
import { motion } from "framer-motion"



export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PhotoSlider />  
       <InteriorDesignShowcase/> {/* Added here */}
    <StatsWithProgress/>  
       <BeforeAfterSlider /> 
      
      <ServicesSection />
       <WhyChooseUs />
      <Gallery />
      <Testimonials /> 
       <ClientLogos />
    
      <FAQSection />
    
     <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <HeroSection />
    </motion.main>


    </main>
  )
}
