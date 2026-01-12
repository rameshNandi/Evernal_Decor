import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicesSection } from "@/components/services-section"
import { QuotationGenerator } from "@/components/quotation-generator"
import { FAQSection } from "@/components/faq-section"

export default function Services() {
  return (
    <main className="pt-16">
      <Navigation />
      <ServicesSection />
     <QuotationGenerator />
      <FAQSection />
   
    </main>
  )
}
