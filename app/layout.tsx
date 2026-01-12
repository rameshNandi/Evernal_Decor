import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Loader from "@/components/loader"
import { Footer } from "@/components/footer"
import ContactPopup from "@/components/contact-popup"
import Chatbot from "@/components/Chatbot" // Global Chatbot component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Evernal Decor - Premium Interior Design Services",
  description:
    "Transform your space with Evernal Decor's expert interior design services. Specializing in residential and commercial design, renovation, and custom solutions.",
  keywords:
    "interior design, home renovation, commercial design, residential design, space planning, furniture customization",
  authors: [{ name: "Evernal Decor" }],
  creator: "Evernal Decor",
  publisher: "Evernal Decor",
  openGraph: {
    title: "Evernal Decor - Premium Interior Design Services",
    description: "Transform your space with expert interior design services",
    url: "https://evernaldecor.com",
    siteName: "Evernal Decor",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Evernal Decor Interior Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evernal Decor - Premium Interior Design Services",
    description: "Transform your space with expert interior design services",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {/* <Loader /> */}
        {children}

         <Toaster />
        {/* <ContactPopup /> */}
       
      <Chatbot /> {/* Global Chatbot */}


       
        <Footer />
      </body>
    </html>
  )
}
