"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Star, Award, CheckCircle, Users, Heart, ThumbsUp, Shield, Target } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Real Indian companies as per your requirements
const clients = [
  // Building Materials Companies
  { name: "Greenply", logo: "/about_img/Greenply_logo.png" },
  { name: "Centuryply", logo: "/about_img/Centuryply_logo.png" },
  { name: "Asian Paints", logo: "/about_img/asian-paints_logo.png" },
  { name: "Berger Paints", logo: "/about_img/maxresdefault_logo.png" },
  
  // Furniture & Hardware
  { name: "Godrej", logo: "/about_img/Godrej_Logo.png" },
  { name: "Hettich", logo: "/about_img/Logo_of_Hettich.png" },
  
  // Construction & Real Estate
  { name: "PS Group", logo: "/about_img/ps-group-logo.png" },
  { name: "Ambuja Cement", logo: "/about_img/ambuja-logo.png" },
  { name: "ACC Cement", logo: "/about_img/ACC_Limited_logo.png" },
  { name: "UltraTech Cement", logo: "/about_img/Ultratech_Cement_vector_Logo.png" },
  
  // Real Estate Developers
  { name: "Lodha Group", logo: "/about_img/Lodha_logo.png" },
  { name: "DLF", logo: "/about_img/images.png" },
  { name: "Sobha Limited", logo: "/about_img/Sobha-Developers-logo-1-removebg-preview.png" },
  { name: "Brigade Group", logo: "/about_img/images__1_-removebg-preview.png" },
  
  // Adhesives & Chemicals
  { name: "Pidilite", logo: "/about_img/pidilite-logo.png" },
  { name: "Fevicol", logo: "/about_img/fevicol-logo.png" },
  
  // Steel & Metals
  { name: "Jindal", logo: "/about_img/Jindal_logo.png" },
  
  // Glass & Windows
  { name: "Saint-Gobain", logo: "/about_img/SentGobin_logo.png" },
  { name: "Merlin", logo: "/about_img/images.png" },
  { name: "Orbit", logo: "/about_img/Orbit+logo.jpg" },
  
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    company: "Sharma Constructions",
    text: "Evernal Decor transformed our corporate office beyond expectations. Their attention to detail and professionalism is unmatched.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    company: "Patel Residence",
    text: "Our home feels like a luxury resort now! The team understood our vision and delivered perfection.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    company: "Verma Industries",
    text: "The commercial space design boosted our employee productivity by 40%. Truly remarkable work!",
    rating: 4,
  },
];

const values = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Client-Centric Approach",
    description: "Your vision is our blueprint. We listen, understand, and execute."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Quality Assurance",
    description: "Premium materials and craftsmanship that stand the test of time."
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Innovation",
    description: "Blending traditional techniques with modern design trends."
  },
  {
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Reliability",
    description: "On-time delivery and transparent communication throughout."
  },
];

// Animated counter component
const AnimatedCounter = ({ end, label, icon }: { end: number; label: string; icon: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="flex flex-col items-center p-6 glassmorphic rounded-2xl border border-[var(--rusty-nail)]/20 hover:border-[var(--rusty-nail)] transition-colors">
        <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--rusty-nail)] to-[var(--yellow-metal)] flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="text-3xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-2">
          {count.toLocaleString()}{label.includes('%') ? '%' : '+'}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};

export default function ClientsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[var(--quill-gray)]/20 to-[var(--nobel)]/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Valued Clients
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Building lasting relationships with India's leading brands and delivering exceptional design experiences
          </motion.p>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="px-4 bg-gradient-to-br from-[var(--quill-gray)]/10 to-[var(--nobel)]/10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter end={500} label="Happy Clients" icon={<Users className="h-6 w-6" />} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter end={1200} label="Projects Completed" icon={<CheckCircle className="h-6 w-6" />} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter end={50} label="Industry Awards" icon={<Award className="h-6 w-6" />} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter end={98} label="Client Satisfaction" icon={<Star className="h-6 w-6" />} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos Grid Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[var(--quill-gray)]/5 to-[var(--nobel)]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4">
              Brands we are working with
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partnering with India's leading companies to bring you the finest materials and innovative solutions
            </p>
          </motion.div>

          {/* Client Logos Grid - 4 columns on desktop, 2 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="glassmorphic bg-white/80 dark:bg-black/40 rounded-xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--quill-gray)] hover:border-[var(--rusty-nail)] hover:-translate-y-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-20 md:h-24 flex items-center justify-center p-4">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={80}
                    className="w-full h-full object-contain max-h-[80px]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'flex flex-col items-center justify-center';
                        fallback.innerHTML = `
                          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--rusty-nail)] to-[var(--yellow-metal)] flex items-center justify-center text-white font-bold text-xl mb-2">
                            ${client.name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2)}
                          </div>
                          <span class="text-sm font-medium text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] text-center">
                            ${client.name}
                          </span>
                        `;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}