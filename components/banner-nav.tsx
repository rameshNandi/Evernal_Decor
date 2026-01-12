"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, Briefcase, FolderOpen, Phone, Menu, X } from "lucide-react"
import { GlassButton } from "@/components/ui/glass-button"
import Image from "next/image"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  iconColor: string
}

const menuItems: MenuItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Home", href: "/", iconColor: "text-white/80" },
  { icon: <Users className="h-5 w-5" />, label: "About Us", href: "/about", iconColor: "text-white/80" },
  { icon: <Briefcase className="h-5 w-5" />, label: "Services", href: "/services", iconColor: "text-white/80" },
  { icon: <FolderOpen className="h-5 w-5" />, label: "Projects", href: "/projects", iconColor: "text-white/80" },
  { icon: <Phone className="h-5 w-5" />, label: "Contact Us", href: "/contact", iconColor: "text-white/80" },
]

const navItemVariants = {
  initial: { opacity: 0.8, scale: 1 },
  hover: { opacity: 1, scale: 1.05, transition: { duration: 0.2 } },
}

export function BannerNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative top-0 left-0 right-0 z-50 p-3 md:p-4">
      <motion.nav
        className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 ">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <motion.div
              whileHover={{
                rotate: [-2, 2, -2],
                transition: { duration: 1.2, repeat: Infinity, repeatType: "reverse" },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center"
            >
              <Image
                src="/evernal decor 0nly logo.png"
                alt="Eternal Decor"
                width={80}
                height={80}
                priority
                className="object-contain p-2 w-14 h-14 md:w-20 md:h-20 transition-transform duration-300"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-3">
            {menuItems.map((item) => (
              <motion.li key={item.label} variants={navItemVariants} initial="initial" whileHover="hover">
                <Link href={item.href} className=" bg-transparent">
                  <GlassButton
                    variant="ghost"
                    icon={item.icon}
                    className="text-white bg-transparent hover:text-black rounded-lg "
                    iconColor={item.iconColor}
                  >
                    <span className="text-white">{item.label}</span>
                  </GlassButton>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <GlassButton
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </GlassButton>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden backdrop-blur-md px-4 pb-4 rounded-b-lg"
            >
              <ul className="space-y-2 mt-2">
                {menuItems.map((item) => (
                  <motion.li key={item.label} variants={navItemVariants} initial="initial" whileHover="hover">
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={item.iconColor}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
