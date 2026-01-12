"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, Briefcase, FolderOpen, Phone, Menu, X } from "lucide-react"
import { GlassButton } from "@/components/ui/glass-button"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  iconColor: string
}

const menuItems: MenuItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Home", href: "/", iconColor: "text-black" },
  { icon: <Users className="h-5 w-5" />, label: "About Us", href: "/about", iconColor: "text-black" },
  { icon: <Briefcase className="h-5 w-5" />, label: "Services", href: "/services", iconColor: "text-black" },
  { icon: <FolderOpen className="h-5 w-5" />, label: "Projects", href: "/projects", iconColor: "text-black" },
  { icon: <Phone className="h-5 w-5" />, label: "Contact Us", href: "/contact", iconColor: "text-black" },
]

const navItemVariants = {
  initial: { opacity: 0.8, scale: 1 },
  hover: { opacity: 1, scale: 1.05, transition: { duration: 0.2 } },
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setShowMobileNav(currentY < lastScrollY || currentY < 50)
      setLastScrollY(currentY)
    }

    const debounce = (func: () => void, delay: number) => {
      let timer: ReturnType<typeof setTimeout>
      return () => {
        clearTimeout(timer)
        timer = setTimeout(func, delay)
      }
    }

    const handleScrollWithDelay = debounce(handleScroll, 100)

    window.addEventListener("scroll", handleScrollWithDelay)
    return () => window.removeEventListener("scroll", handleScrollWithDelay)
  }, [lastScrollY])

  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 p-3 md:p-4">
        <motion.nav
          className="max-w-7xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-4 md:px-6">
            {/* Logo + Brand Text */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{
                  rotate: [-2, 2, -2],
                  transition: { duration: 1.2, repeat: Infinity, repeatType: "reverse" },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/evernal decor 0nly logo.png"
                  alt="Evernal Decor"
                  width={80}
                  height={80}
                  priority
                  className="object-contain p-2 w-14 h-14 md:w-15 md:h-15 transition-transform duration-300"
                />
              </motion.div>
              {/* <h1 className="text-xl md:text-4xl font-bold flex gap-1 items-center">
                <span className="bg-gradient-to-r from-[#583804] to-[#8c5c05] bg-clip-text text-transparent">
                  Evernal
                </span>
                <span className="bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
                  Decor
                </span>
              </h1> */}
            </Link>

            {/* Desktop Menu */}
            <ul className="flex items-center gap-2">
              {menuItems.map((item) => (
                <motion.li key={item.label} variants={navItemVariants} initial="initial" whileHover="hover">
                  <Link href={item.href}>
                    <GlassButton
                      variant="ghost"
                      icon={item.icon}
                      className="transition-all shadow-2xl "
                      iconColor="text-black"
                    >
                      <span className="text-black">{item.label}</span>
                    </GlassButton>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Navigation */}
      <motion.header
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-500 ${
          showMobileNav ? "translate-y-0" : "-translate-y-full"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="bg-white/60 backdrop-blur-2xl rounded-xl p-3 shadow-2xl border border-gray-300">
          <div className="flex items-center justify-between">
            {/* Mobile Logo + Text */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/evernal decor 0nly logo.png"
                alt="Evernal Decor"
                width={50}
                height={50}
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-lg font-bold leading-none">
                <span className="bg-gradient-to-r from-[#583804] to-[#8c5c05] bg-clip-text text-transparent">Evernal</span>{" "}
                <span className="bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">Decor</span>
              </h1>
            </Link>

            {/* Menu Toggle */}
            <GlassButton
              variant="ghost"
              size="icon"
              className="text-black/10 bg-black/10 hover:bg-black/10 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </GlassButton>
          </div>

          {/* Mobile Menu Items */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.ul
                key="mobile-menu"
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="space-y-2 mt-4"
              >
                {menuItems.map((item) => (
                  <motion.li key={item.label} variants={navItemVariants} initial="initial" whileHover="hover">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-black hover:bg-black/10 transition-all"
                    >
                      {item.icon}
                      <span className="text-base font-medium">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
 