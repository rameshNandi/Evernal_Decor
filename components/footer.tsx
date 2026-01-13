"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Home,
  Info,
  Hammer,
  Folder,
  Contact,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="glassmorphic py-16 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Branding and Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="py-5">
              <Image
                src="/evernal decor 0nly logo.png"
                alt="evernal decor logo"
                width={70}
                height={70}
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We specialize in beautifully designed spaces that harmonize style, functionality, and creativity.
            </p>
            <div className="flex space-x-3">
  <Link
    href="https://www.facebook.com/evernaldecore/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-transform transform hover:scale-110 bg-white/10 hover:bg-[var(--rusty-nail)] text-[var(--rusty-nail)] hover:text-white shadow-md backdrop-blur"
  >
    <Facebook className="h-5 w-5" />
  </Link>
  <Link
    href="https://www.instagram.com/evernaldecor_/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-transform transform hover:scale-110 bg-white/10 hover:bg-[var(--rusty-nail)] text-[var(--rusty-nail)] hover:text-white shadow-md backdrop-blur"
  >
    <Instagram className="h-5 w-5" />
  </Link>
  <Link
    href="https://twitter.com/evernaldecor"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-transform transform hover:scale-110 bg-white/10 hover:bg-[var(--rusty-nail)] text-[var(--rusty-nail)] hover:text-white shadow-md backdrop-blur"
  >
    <Twitter className="h-5 w-5" />
  </Link>
  <Link
    href="https://www.linkedin.com/company/evernaldecor"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-transform transform hover:scale-110 bg-white/10 hover:bg-[var(--rusty-nail)] text-[var(--rusty-nail)] hover:text-white shadow-md backdrop-blur"
  >
    <Linkedin className="h-5 w-5" />
  </Link>
</div>

          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <FooterLink icon={Home} text="Home" href="/" />
              <FooterLink icon={Info} text="About Us" href="/about" />
              <FooterLink icon={Hammer} text="Services" href="/services" />
              <FooterLink icon={Folder} text="Projects" href="/projects" />
              <FooterLink icon={Contact} text="Contact Us" href="/contact" />
              <FooterLink icon={HelpCircle} text="FAQ" href="/faq" />
            </ul>
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)]">
              Services
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <FooterLink icon={ChevronRight} text="Residential Design" href="/services#residential" />
              <FooterLink icon={ChevronRight} text="Commercial Design" href="/services#commercial" />
              <FooterLink icon={ChevronRight} text="Renovation" href="/services#renovation" />
              <FooterLink icon={ChevronRight} text="Consultation" href="/services#consultation" />
              <FooterLink icon={ChevronRight} text="3D Visualization" href="/services#3d" />
              <FooterLink icon={ChevronRight} text="Turnkey Solutions" href="/services#turnkey" />
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)]">
              Contact Info
            </h4>
            <div className="space-y-3 text-muted-foreground text-sm">
              <ContactItem icon={MapPin} text="Ecospace Buisness Towers, 5A-1105, AA II, Newtown, Kolkata, Chakpachuria, West Bengal 700160" />
              <ContactItem icon={Phone} text="+91 8697891111" />
              <ContactItem icon={Globe} text="www.evernaldecor.com" />
              <ContactItem icon={Mail} text="info@evernaldecor.com" />
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border/20 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>
            © {year} Evernal Decor. All rights reserved. |{" "}
            <Link href="/privacy-policy" className="hover:text-[var(--rusty-nail)]">Privacy Policy</Link> |{" "}
            <Link href="/terms-of-service" className="hover:text-[var(--rusty-nail)]">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

// Reusable Footer Link Item
function FooterLink({ icon: Icon, text, href }: { icon: any; text: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center space-x-2 hover:text-[var(--rusty-nail)] transition-colors"
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span>{text}</span>
      </Link>
    </li>
  )
}

// Reusable Contact Item
function ContactItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-start">
      <Icon className="h-5 w-5 mr-3 text-[var(--rusty-nail)] mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </div>
  )
}
