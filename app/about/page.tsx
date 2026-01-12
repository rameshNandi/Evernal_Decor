"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { TrendingUp, Brush, Layers, Smile } from "lucide-react"
const cardData = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Proven Results",
    desc: "Delivering impactful designs with consistent client satisfaction.",
  },
  {
    icon: <Brush className="h-6 w-6" />,
    title: "Custom Designs",
    desc: "No templates — only tailored design made just for you.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Multi-Disciplinary",
    desc: "We blend interior, architecture, and styling seamlessly.",
  },
  {
    icon: <Smile className="h-6 w-6" />,
    title: "Client-Centric",
    desc: "Your happiness is our success — we design for your lifestyle.",
  },
];


export default function About() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
<section className=" pt-32 pb-12 md:pb-20 px-4 bg-gradient-to-br from-[var(--quill-gray)]/20 to-[var(--nobel)]/20">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-5 md:mb-8 glow-text">
      About Evernal Decor
    </h1>
    <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
      We specialized in creating beautifully designed spaces that harmoniously blend style, functionality and creativity.
    </p>
  </div>
</section>




      {/* Story Section */}
   <section className="pt-10 px-4 bg-gradient-to-br from-[var(--quill-gray)]/10 to-[var(--nobel)]/10">
  <motion.div
    className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 tracking-tight">
        Our Story
      </h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Founded by visionary designer <span className="font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)]">Gulam Rasul</span>, Evernal Decor was born with a dream: to craft breathtaking spaces that blend modern elegance, functional precision, and timeless creativity.
      </p>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Under the expert leadership of <span className="font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)]">Gulam Rasul</span>, we have grown from a passionate boutique firm to a full-service interior design powerhouse. Every project reflects not just design — but also emotions, stories, and experiences tailored to our clients' lifestyles.
      </p>
   
      <p className="text-muted-foreground leading-relaxed">
        Our commitment remains unwavering — excellence, innovation, and creating designs that leave a lasting impression.
      </p>
    </div>
    
<div className="relative border border-[#8c5c05] rounded-lg p-2">
  <img
    src="/ownerimage.jpeg?height=600&width=500"
    alt="Our founder Gulam Rasul"
    className="rounded-lg shadow-xl glassmorphic"
  />
</div>
  </motion.div>
</section>


      {/* Values Section */}
 <section className="pt-20 px-4 bg-gradient-to-br from-[var(--quill-gray)]/10 to-[var(--nobel)]/10">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 tracking-tight">
        Our Values
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        These core principles guide everything we do and shape every project we undertake.
      </p>
    </motion.div>

    {/* Responsive Card Data */}
    {[
      { icon: <Heart className="w-8 h-8" />, title: "Passion", desc: "We pour our heart into every projects." },
      { icon: <Users className="w-8 h-8" />, title: "Collaboration", desc: "We work closely with our clients to bring visions to life." },
      { icon: <Award className="w-8 h-8" />, title: "Excellence", desc: "We strive for perfection in every detail." },
      { icon: <Clock className="w-8 h-8" />, title: "Reliability", desc: "We deliver on time and within budget, every time." },
    ].map((value, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="md:hidden snap-center min-w-[85%] mb-4"
      >
        <Card className="glassmorphic futuristic-card text-center shadow-xl border border-muted backdrop-blur-md bg-white/10 dark:bg-black/20">
          <CardContent className="p-6 relative z-10">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--rusty-nail)] to-[var(--antique-bronze)] flex items-center justify-center text-white mb-4 mx-auto shadow-md"
            >
              {value.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-2">
              {value.title}
            </h3>
            <p className="text-muted-foreground text-sm">{value.desc}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}

    {/* Desktop Grid View */}
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { icon: <Heart className="w-8 h-8" />, title: "Passion", desc: "We pour our heart into every projects." },
        { icon: <Users className="w-8 h-8" />, title: "Collaboration", desc: "We work closely with our clients to bring visions to life." },
        { icon: <Award className="w-8 h-8" />, title: "Excellence", desc: "We strive for perfection in every detail." },
        { icon: <Clock className="w-8 h-8" />, title: "Reliability", desc: "We deliver on time and within budget, every time." },
      ].map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="glassmorphic futuristic-card text-center shadow-lg border border-muted backdrop-blur-md bg-white/10 dark:bg-black/20 hover:scale-105 transition-transform">
            <CardContent className="p-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--rusty-nail)] to-[var(--antique-bronze)] flex items-center justify-center text-white mb-4 mx-auto shadow-md"
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm">{value.desc}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>



{/* Why Choose Us Section */}
<section className="pt-20 px-4 bg-gradient-to-br from-[var(--quill-gray)]/10 to-[var(--nobel)]/10">
  <div className="max-w-7xl mx-auto">
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 tracking-tight">
        Why Choose Us
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Here’s what sets Evernal Decor apart and makes us the right choice for your next transformation.
      </p>
    </motion.div>

    {/* Mobile Scroll Cards */}
    <div className="md:hidden">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-1">
        {cardData.map((item, index) => (
          <motion.div 
            key={index}
            className="snap-center min-w-[85%]"
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-zinc-900 border border-[var(--rusty-nail)] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300">
              <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-[var(--antique-bronze)] text-white text-2xl shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Desktop Grid Cards with Modern UI */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {cardData.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative group bg-white dark:bg-zinc-900 border border-[var(--antique-bronze)] rounded-3xl p-6 shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--rusty-nail)] to-[var(--yellow-metal)] flex items-center justify-center text-white shadow-lg">
              {item.icon}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


     
    </main>
  )
}
