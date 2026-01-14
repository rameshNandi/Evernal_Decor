"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sendContactForm } from "@/app/actions/contact"

const LOCATIONS = [
  {
    city: "Kolkata",
    address: "Ecospace Buisness Towers, 5A-1105, AA II, Newtown, Kolkata, Chakpachuria, West Bengal 700160",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.5884559497367!2d88.4611364!3d22.6189981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f7d6386d757%3A0x62eb713984ef7a28!2sEvernal%20Decor!5e1!3m2!1sen!2sin!4v1751460174832!5m2!1sen!2sin"
  },
  {
    city: "Bangalore",
    address: "1215, 22nd Cross Rd, Sector 3, HSR Layout, Bengaluru, Karnataka 560102",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3377.5325871427262!2d77.6383228!3d12.9094534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae155e8510f3b1%3A0xb211fbcbcf530b24!2sEvernal%20Group!5e1!3m2!1sen!2sin!4v1752300183368!5m2!1sen!2sin"
  },
  {
    city: "Pune",
    address: "Gera Imperium Rise, Hinjewadi Phase 2 Rd, Hinjawadi Phase II, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0487211784043!2d73.72141810000001!3d18.604065399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbde45f192f9%3A0x40b80e4901f5335a!2sEvernal%20Group%20Pune!5e1!3m2!1sen!2sin!4v1752300020213!5m2!1sen!2sin"
  },
  {
    city: "Mumbai",
    address: "Kolshet Rd, Kolshet Industrial Area, Thane West, Thane, Maharashtra 400607",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d209534.97199239722!2d72.74401316295538!3d19.118856067324774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9d5e8737a41%3A0xbd231851659a1466!2sLodha%20Signet%2C%20Kolshet%20Road%20Thane!5e1!3m2!1sen!2sin!4v1752300645274!5m2!1sen!2sin"
  },
  {
    city: "Bhubaneswar",
    address: "Idco Info Park, Technology Corridor, Chandaka Industrial Estate, Patia, Bhubaneswar, Odisha 751024",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8633291998203!2d85.8051611744928!3d20.349047410778347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1908e025984c55%3A0xee1fcd1f11e55141!2sDLF%20Cyber%20City!5e1!3m2!1sen!2sin!4v1752300541295!5m2!1sen!2sin"
  }
]

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    projectType: "",
    budget: "",
    message: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendContactForm(formData)
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        projectType: "",
        budget: "",
        message: "",
        timeline: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#583804] mb-3"
          >
            Contact Us
          </motion.h1>
          
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 px-4 flex-1">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <Card className="h-full shadow-xl rounded-lg border border-[#e0d6c2] bg-white">
              <CardHeader className="pb-1">
                <CardTitle className="text-xl font-bold text-[#583804]">
                  Project Inquiry Form
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-1">
                  {/* First Row - 3 inputs side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-[#583804]">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="border-[#e0d6c2] focus:ring-[#8c5c05]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-[#583804]">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="border-[#e0d6c2] focus:ring-[#8c5c05]"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-[#583804]">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="border-[#e0d6c2] focus:ring-[#8c5c05]"
                      />
                    </div>
                  </div>

                  {/* Second Row - 3 inputs side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="service" className="text-[#583804]">
                        Service Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => handleInputChange("service", value)}
                        required
                      >
                        <SelectTrigger className="border-[#e0d6c2] focus:ring-[#8c5c05]">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Design</SelectItem>
                          <SelectItem value="commercial">Commercial Design</SelectItem>
                          <SelectItem value="renovation">Renovation Services</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="projectType" className="text-[#583804]">
                        Project Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleInputChange("projectType", value)}
                        required
                      >
                        <SelectTrigger className="border-[#e0d6c2] focus:ring-[#8c5c05]">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-construction">New Construction</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="remodeling">Remodeling</SelectItem>
                          <SelectItem value="decoration">Decoration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="budget" className="text-[#583804]">
                        Budget Range <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange("budget", value)}
                        required
                      >
                        <SelectTrigger className="border-[#e0d6c2] focus:ring-[#8c5c05]">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-2l">Under ₹2,00,000</SelectItem>
                          <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                          <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                          <SelectItem value="10l-20l">₹10,00,000 - ₹20,00,000</SelectItem>
                          <SelectItem value="over-20l">Over ₹20,00,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Third Row - Timeline (full width) */}
                  <div className="space-y-1">
                    <Label htmlFor="timeline" className="text-[#583804]">
                      Project Timeline <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => handleInputChange("timeline", value)}
                      required
                    >
                      <SelectTrigger className="border-[#e0d6c2] focus:ring-[#8c5c05]">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-3-months">1-3 Months</SelectItem>
                        <SelectItem value="3-6-months">3-6 Months</SelectItem>
                        <SelectItem value="6-12-months">6-12 Months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fourth Row - Message (full width) */}
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-[#583804]">
                      Project Details <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe your project in detail..."
                      className="min-h-[120px] border-[#e0d6c2] focus:ring-[#8c5c05]"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#583804] hover:bg-[#8c5c05] text-white py-4 rounded-md"
                    >
                      {isSubmitting ? "Sending..." : "Submit Project Inquiry"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>


          <div className="py-12">
  {/* Contact Info and Map - Side by Side */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
  >
    {/* Contact Info Card - Left Side */}
    <Card className="shadow-sm rounded-lg border border-[#e0d6c2] bg-white h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-[#583804]">
          Our Nationwide Offices
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 h-full flex flex-col">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[#e0d6c2]">
          {LOCATIONS.map((location) => (
            <button
              key={location.city}
              onClick={() => setActiveLocation(location)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeLocation.city === location.city
                  ? "border-b-2 border-[#583804] text-[#583804]"
                  : "text-[#8c5c05] hover:text-[#583804]"
              }`}
            >
              {location.city}
            </button>
          ))}
        </div>
        
        <div className="p-4 space-y-4 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#583804] flex items-center justify-center text-white mt-1">
              <MapPin className="h-10 p-2 w-10" />
            </div>
            <div>
              <h3 className="font-medium text-[#583804]">
                {activeLocation.city} Office
              </h3>
              <p className="text-sm text-[#8c5c05] mt-1">
                {activeLocation.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "+91 8697891111",
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@evernaldecor.com",
              },
              {
                icon: Globe,
                title: "Website",
                content: "www.evernaldecor.com",
              },
              {
                icon: Clock,
                title: "Business Hours",
                content: "Mon-Sat: 10AM - 7PM",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#583804] flex items-center justify-center text-white">
                  <item.icon className="h-10 p-2 w-10" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#583804]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8c5c05]">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Map Card - Right Side */}
    <Card className="shadow-sm rounded-lg overflow-hidden border border-[#e0d6c2] h-full">
      <CardHeader className="pb-2 px-4 pt-4">
        <CardTitle className="text-lg font-bold text-[#583804]">
          {activeLocation.city} Location Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <div className="h-full w-full min-h-[300px]">
          <iframe
            src={activeLocation.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </CardContent>
    </Card>
  </motion.div>
</div>


         
        </div>
      </section>
    </main>
  )
}