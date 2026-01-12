"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { sendQuotationEmail, sendOTP, verifyOTP } from "../app/actions/quotation"
import { useToast } from "@/hooks/use-toast"
import {
  Download,
  Calculator,
  ArrowLeft,
  ArrowRight,
  Check,
  Building,
  Home,
  Sparkles,
  Crown,
  Star,
  Mail,
  Shield,
} from "lucide-react"

interface QuotationData {
  name: string
  email: string
  phone: string
  category: "residential" | "commercial" | ""
  features: { [key: string]: number }
  style: "basic" | "standard" | "luxury" | ""
  totalPrice: number
  isEmailVerified: boolean
}

const residentialFeatures = {
  "Modular Kitchen": 150000,
  "Dining Room": 80000,
  "Master Bedroom": 120000,
  "Guest Bedroom": 90000,
  "Living Room": 100000,
  Washroom: 60000,
  "Study Room": 70000,
  Balcony: 40000,
}

const commercialFeatures = {
  "Office Workstation": 25000,
  "Director Cabin": 80000,
  "Reception Desk": 45000,
  "Employee Desks": 15000,
  "Conference Room": 100000,
  "Break Room": 35000,
  "Storage Area": 20000,
  "Waiting Area": 50000,
}

const styleMultipliers = {
  basic: 1,
  standard: 1.5,
  luxury: 2.2,
}

const styleDescriptions = {
  basic: "Essential design with quality materials and functional layouts",
  standard: "Enhanced design with premium finishes and custom elements",
  luxury: "Ultra-luxury design with high-end materials and bespoke craftsmanship",
}

const styleIcons = {
  basic: Star,
  standard: Sparkles,
  luxury: Crown,
}

export function QuotationGenerator() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [shakeStep, setShakeStep] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingOTP, setIsSendingOTP] = useState(false)
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [quotationPdf, setQuotationPdf] = useState<string | null>(null)
  const [showDownload, setShowDownload] = useState(false)

  const [quotationData, setQuotationData] = useState<QuotationData>({
    name: "",
    email: "",
    phone: "",
    category: "",
    features: {},
    style: "",
    totalPrice: 0,
    isEmailVerified: false,
  })

  const calculateTotal = () => {
    const featuresTotal = Object.values(quotationData.features).reduce((sum, price) => sum + price, 0)
    const styleMultiplier = styleMultipliers[quotationData.style as keyof typeof styleMultipliers] || 1
    return featuresTotal * styleMultiplier
  }

  const handleFeatureToggle = (feature: string, price: number) => {
    const newFeatures = { ...quotationData.features }
    if (newFeatures[feature]) {
      delete newFeatures[feature]
    } else {
      newFeatures[feature] = price
    }
    setQuotationData({ ...quotationData, features: newFeatures })
  }

  const triggerShake = (step: number) => {
    setShakeStep(step)
    setTimeout(() => setShakeStep(null), 600)
  }

  const handleNext = () => {
    if (currentStep === 1 && !quotationData.category) {
      triggerShake(1)
      toast({
        title: "Please select a category",
        description: "Choose either Residential or Commercial to continue.",
        variant: "destructive",
      })
      return
    }
    if (currentStep === 2 && Object.keys(quotationData.features).length === 0) {
      triggerShake(2)
      toast({
        title: "Please select features",
        description: "Choose at least one feature to continue.",
        variant: "destructive",
      })
      return
    }
    if (currentStep === 3 && !quotationData.style) {
      triggerShake(3)
      toast({
        title: "Please select a style",
        description: "Choose a design style to continue.",
        variant: "destructive",
      })
      return
    }
    if (currentStep === 4 && (!quotationData.name || !quotationData.email)) {
      triggerShake(4)
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email to continue.",
        variant: "destructive",
      })
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSendOTP = async () => {
    if (!quotationData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      })
      return
    }

    setIsSendingOTP(true)
    try {
      const result = await sendOTP(quotationData.email)
      if (result.success) {
        setOtpSent(true)
        toast({
          title: "OTP Sent! 📧",
          description: "Please check your email for the verification code.",
        })
      } else {
        toast({
          title: "Error Sending OTP",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingOTP(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: "OTP Required",
        description: "Please enter the verification code.",
        variant: "destructive",
      })
      return
    }

    setIsVerifyingOTP(true)
    try {
      const result = await verifyOTP(quotationData.email, otp)
      if (result.success) {
        setQuotationData({ ...quotationData, isEmailVerified: true })
        toast({
          title: "Email Verified! ✅",
          description: "You can now generate your quotation.",
        })
      } else {
        toast({
          title: "Invalid OTP",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifyingOTP(false)
    }
  }

  const handleGenerateQuote = async () => {
    if (!quotationData.isEmailVerified) {
      toast({
        title: "Email Not Verified",
        description: "Please verify your email first.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    const finalData = {
      ...quotationData,
      totalPrice: calculateTotal(),
    }

    try {
      const result = await sendQuotationEmail(finalData)
      if (result.success) {
        setQuotationPdf(result.pdfBase64)
        setShowDownload(true)
        toast({
          title: "Quote Generated Successfully! 🎉",
          description: "Your professional quotation has been sent to your email and is ready for download.",
        })
      } else {
        toast({
          title: "Error Generating Quote",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate quotation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadPdf = () => {
    if (quotationPdf) {
      const link = document.createElement("a")
      link.href = `data:application/pdf;base64,${quotationPdf}`
      link.download = `Quotation_${quotationData.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setQuotationData({
      name: "",
      email: "",
      phone: "",
      category: "",
      features: {},
      style: "",
      totalPrice: 0,
      isEmailVerified: false,
    })
    setOtpSent(false)
    setOtp("")
    setQuotationPdf(null)
    setShowDownload(false)
  }

  const features = quotationData.category === "residential" ? residentialFeatures : commercialFeatures

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#583804] mb-6">Get Your Project Quote</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow our streamlined 5-step process to receive a detailed, professional quotation for your interior design
            project
          </p>
        </motion.div>

        {/* Enhanced Step Indicator */}
        <div className="flex justify-center mb-10">
          <div className="relative flex items-center bg-white/80 backdrop-blur-sm p-3 md:p-6 rounded-2xl shadow-xl border border-[#8c5c05]">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-[#7f5405] via-[#7f5405] to-[#7f5405] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((currentStep - 1) / 4) * 90}%` }}
              />
            </div>

            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="relative flex items-center">
                <motion.div
                  className={`w-5 md:w-10 md:h-10 h-5 rounded-full flex items-center justify-center text-white font-bold border-3 transition-all duration-500 ${
                    step < currentStep
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/30"
                      : step === currentStep
                        ? "bg-[linear-gradient(to_right,_#7f5405,_#583804)] border-[#7f5405] shadow-xl shadow-[#8c5c05]/40 scale-110"
                        : "bg-gray-300 border-gray-200 text-gray-500"
                  }`}
                  whileHover={{ scale: step <= currentStep ? 1.15 : 1 }}
                  animate={
                    step === currentStep
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(245, 158, 11, 0.4)",
                            "0 0 0 10px rgba(245, 158, 11, 0)",
                            "0 0 0 0 rgba(245, 158, 11, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {step < currentStep ? <Check className="h-6 w-6" /> : step}
                </motion.div>
                {step < 5 && <div className="w-20 h-1 bg-transparent" />}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={shakeStep === currentStep ? "animate-pulse" : ""}
        >
          <Card className="backdrop-blur-sm bg-white/90 border border-amber-200/50 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="text-white bg-[linear-gradient(to_right,_#7f5405,_#583804)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              <CardTitle className="text-3xl font-bold flex items-center gap-4 relative z-10">
                <Calculator className="h-10 w-10" />
                Step {currentStep} of 5
              </CardTitle>
            </CardHeader>

            <CardContent className="md:p-10 p-6">
              {/* Step 1: Category Selection */}
              {currentStep === 1 && (
                <motion.div
                  className="space-y-8"
                  animate={shakeStep === 1 ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-[#583804] mb-8 text-center">Choose Your Project Category</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-500 border-3 rounded-2xl overflow-hidden h-full ${
                          quotationData.category === "residential"
                            ? "border-[#8c5c05] shadow-2xl shadow-[#8c5c05]/20 bg-[linear-gradient(to_bottom_right,_#fdf6e3,_#fae4c7)]"
                            : "border-gray-200 hover:border-amber-400 hover:shadow-xl bg-white hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-orange-50/50"
                        }`}
                        onClick={() => setQuotationData({ ...quotationData, category: "residential" })}
                      >
                        <CardContent className="p-10 text-center h-full flex flex-col justify-center border-2 border-[#8c5c05] rounded-2xl">
                          <div className="mb-6">
                            <Home
                              className={`h-14 w-14 mx-auto transition-all duration-300 ${
                                quotationData.category === "residential" ? "text-[#8c5c05]" : "text-gray-400"
                              }`}
                            />
                          </div>
                          <h4 className="text-2xl font-bold text-[#583804] mb-4">Residential</h4>
                          <p className="text-[#7f5405]/80 text-lg leading-relaxed">
                            Homes, apartments, and residential spaces designed for comfort and style
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-500 border-3 rounded-2xl overflow-hidden h-full ${
                          quotationData.category === "commercial"
                            ? "border-[#8c5c05] shadow-2xl shadow-[#8c5c05]/20 bg-[linear-gradient(to_bottom_right,_#fdf6e3,_#fae4c7)]"
                            : "border-gray-200 hover:border-amber-400 hover:shadow-xl bg-white hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-orange-50/50"
                        }`}
                        onClick={() => setQuotationData({ ...quotationData, category: "commercial" })}
                      >
                        <CardContent className="p-10 text-center h-full flex flex-col justify-center border-2 border-[#8c5c05] rounded-2xl">
                          <div className="mb-6">
                            <Building
                              className={`h-14 w-14 mx-auto transition-all duration-300 ${
                                quotationData.category === "commercial" ? "text-[#8c5c05]" : "text-gray-400"
                              }`}
                            />
                          </div>
                          <h4 className="text-2xl font-bold text-[#583804] mb-4">Commercial</h4>
                          <p className="text-[#7f5405]/80 text-lg leading-relaxed">
                            Offices, retail spaces, and commercial buildings designed for productivity
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Features Selection */}
              {currentStep === 2 && (
                <motion.div
                  className="space-y-8"
                  animate={shakeStep === 2 ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-[#583804] mb-8 text-center">
                    Select Features ({quotationData.category === "residential" ? "Residential" : "Commercial"})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 xs-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(features).map(([feature, price]) => (
                      <motion.div
                        key={feature}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-500 border-2 rounded-xl h-full ${
                            quotationData.features[feature]
                              ? "border-[#8c5c05] bg-[linear-gradient(to_bottom_right,_#fdf6e3,_#fae4c7)] shadow-xl shadow-[#8c5c05]/20"
                              : "border-gray-200 hover:border-amber-400 hover:shadow-lg bg-white hover:bg-gradient-to-br hover:from-amber-50/30 hover:to-orange-50/30"
                          }`}
                          onClick={() => handleFeatureToggle(feature, price)}
                        >
                          <CardContent className="p-3 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start gap-3 flex-1">
                                <div
                                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mt-1 transition-all duration-300 ${
                                    quotationData.features[feature]
                                      ? "border-[#8c5c05] bg-[#8c5c05] shadow-lg"
                                      : "border-gray-300 hover:border-amber-400"
                                  }`}
                                >
                                  {quotationData.features[feature] && <Check className="h-4 w-4 text-white" />}
                                </div>
                                <h6 className="font-bold text-[#583804] text-md leading-tight">{feature}</h6>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[#8c5c05] font-bold text-lg">Contact for pricing</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-10 p-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-amber-300 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#583804] mb-2">
                        {Object.keys(quotationData.features).length} feature(s) selected
                      </p>
                      <p className="text-[#7f5405] text-lg">
                        Detailed pricing will be provided in your personalized quotation
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Style Selection */}
              {currentStep === 3 && (
                <motion.div
                  className="space-y-8"
                  animate={shakeStep === 3 ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-[#583804] mb-8 text-center">Choose Your Style Package</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(styleMultipliers).map(([style, multiplier]) => {
                      const isSelected = quotationData.style === style
                      const IconComponent = styleIcons[style as keyof typeof styleIcons]
                      return (
                        <motion.div
                          key={style}
                          whileHover={{ scale: 1.03, y: -8 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card
                            className={`cursor-pointer border-2 transition-all duration-500 border-3 rounded-2xl h-full overflow-hidden
                              ${
                                isSelected
                                  ? "border-[#8c5c05] bg-[linear-gradient(to_bottom_right,_#fdf6e3,_#fae4c7)] shadow-2xl shadow-[#8c5c05]/20"
                                  : "border-gray-200 bg-white hover:shadow-xl hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50/30 hover:to-orange-50/30"
                              }`}
                            onClick={() => setQuotationData({ ...quotationData, style: style as any })}
                          >
                            <CardContent className="p-8 border-2 rounded-2xl border-[#8c5c05] text-center h-full flex flex-col justify-between">
                              <div>
                                <div className="mb-6">
                                  <IconComponent
                                    className={`h-12 w-12 mx-auto transition-all duration-300 ${
                                      isSelected ? "text-[#8c5c05]" : "text-gray-400"
                                    }`}
                                  />
                                </div>
                                <h4 className="text-2xl font-bold text-[#583804] mb-4 capitalize">{style}</h4>
                                <p className="text-[#7f5405]/80 mb-6 text-base leading-relaxed">
                                  {styleDescriptions[style as keyof typeof styleDescriptions]}
                                </p>
                              </div>
                              <div className="mt-auto">
                                <div
                                  className={`inline-block px-6 py-3 rounded-full text-base font-bold transition-all duration-300 ${
                                    isSelected
                                      ? "bg-[#583804] text-white shadow-lg"
                                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                  }`}
                                >
                                  {style.charAt(0).toUpperCase() + style.slice(1)} Package
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact Details */}
              {currentStep === 4 && (
                <motion.div
                  className="space-y-10"
                  animate={shakeStep === 4 ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-[#583804] mb-8 text-center">Your Contact Information</h3>
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-[#7f5405] shadow-lg">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="name" className="text-[#7f5405] font-semibold text-base">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={quotationData.name}
                            onChange={(e) => setQuotationData({ ...quotationData, name: e.target.value })}
                            required
                            className="mt-2 border-2 border-[#583804] focus:border-[#7f5405] focus:ring-[#7f5405] rounded-xl h-12 text-base"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-[#7f5405] font-semibold text-base">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={quotationData.email}
                            onChange={(e) => setQuotationData({ ...quotationData, email: e.target.value })}
                            required
                            className="mt-2 border-2 border-[#7f5405] focus:border-[#7f5405] focus:ring-[#7f5405] rounded-xl h-12 text-base"
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-[#7f5405] font-semibold text-base">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={quotationData.phone}
                            onChange={(e) => setQuotationData({ ...quotationData, phone: e.target.value })}
                            className="mt-2 border-2 border-[#7f5405] focus:border-[#7f5405] focus:ring-[#7f5405] rounded-xl h-12 text-base"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Email Verification & Quote Generation OR Success Screen */}
              {currentStep === 5 && !showDownload && (
                <motion.div
                  className="space-y-10"
                  animate={shakeStep === 5 ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-[#583804] mb-8 text-center">
                    Email Verification & Quote Summary
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Email Verification Section */}
                    <div className="space-y-6">
                      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-[#7f5405] shadow-lg">
                        <h4 className="text-xl font-bold text-[#583804] mb-6 flex items-center gap-2">
                          <Shield className="h-6 w-6" />
                          Email Verification
                        </h4>

                        {!quotationData.isEmailVerified ? (
                          <div className="space-y-4">
                            {!otpSent ? (
                              <div>
                                <p className="text-[#7f5405] mb-4">
                                  We'll send a verification code to: <strong>{quotationData.email}</strong>
                                </p>
                                <Button
                                  onClick={handleSendOTP}
                                  disabled={isSendingOTP}
                                  className="w-full bg-[linear-gradient(to_right,_#7f5405,_#583804)] hover:bg-[linear-gradient(to_right,_#6b4504,_#4a2f03)] text-white rounded-xl h-12"
                                >
                                  {isSendingOTP ? (
                                    <>
                                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                      Sending OTP...
                                    </>
                                  ) : (
                                    <>
                                      <Mail className="h-5 w-5 mr-2" />
                                      Send Verification Code
                                    </>
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <p className="text-green-600 font-semibold">
                                  ✅ Verification code sent to {quotationData.email}
                                </p>
                                <div>
                                  <Label htmlFor="otp" className="text-[#7f5405] font-semibold">
                                    Enter Verification Code
                                  </Label>
                                  <Input
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                    className="mt-2 border-2 border-[#7f5405] focus:border-[#7f5405] focus:ring-[#7f5405] rounded-xl h-12 text-center text-lg font-mono"
                                  />
                                </div>
                                <div className="flex gap-3">
                                  <Button
                                    onClick={handleVerifyOTP}
                                    disabled={isVerifyingOTP || otp.length !== 6}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-12"
                                  >
                                    {isVerifyingOTP ? (
                                      <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                        Verifying...
                                      </>
                                    ) : (
                                      "Verify Code"
                                    )}
                                  </Button>
                                  <Button
                                    onClick={handleSendOTP}
                                    disabled={isSendingOTP}
                                    variant="outline"
                                    className="border-2 border-[#7f5405] text-[#7f5405] hover:bg-amber-50 rounded-xl h-12 bg-transparent"
                                  >
                                    Resend
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Check className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="text-green-600 font-semibold text-lg">Email Verified Successfully!</p>
                            <p className="text-[#7f5405] mt-2">You can now generate your quotation.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary Section */}
                    <div className="bg-[linear-gradient(to_bottom_right,_#fdf6e3,_#fae4c7)] p-8 rounded-2xl border-2 border-[#8c5c05] shadow-xl">
                      <h4 className="text-2xl font-bold text-[#583804] mb-8 text-center">Quote Summary</h4>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center py-3 border-b-2 border-[#8c5c05]">
                          <span className="font-semibold text-[#7f5405] text-lg">Category:</span>
                          <span className="text-[#583804] capitalize font-bold">{quotationData.category}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b-2 border-[#8c5c05]">
                          <span className="font-semibold text-[#7f5405] text-lg">Style Package:</span>
                          <span className="text-[#583804] capitalize font-bold">{quotationData.style}</span>
                        </div>
                        <div className="py-3">
                          <span className="font-semibold text-[#7f5405] block mb-4 text-lg">Selected Features:</span>
                          <div className="space-y-3">
                            {Object.keys(quotationData.features).map((feature) => (
                              <div
                                key={feature}
                                className="flex justify-between items-center bg-white/70 p-3 rounded-lg border border-[#8c5c05]"
                              >
                                <span className="text-[#7f5405] font-medium">{feature}</span>
                                <span className="text-[#583804] font-bold">Included</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t-3 border-amber-300 pt-6 mt-8">
                          <div className="bg-[linear-gradient(to_right,_#8c5c05,_#d4af37)] text-white p-6 rounded-xl text-center">
                            <div className="text-sm font-semibold mb-2 opacity-90">Professional Quotation</div>
                            <div className="text-2xl font-bold">Will be sent to your email</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Success Screen with Download Option */}
              {showDownload && (
                <motion.div
                  className="space-y-10 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-3xl border-2 border-green-200">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-4xl font-bold text-green-700 mb-4">Quotation Generated Successfully!</h3>
                    <p className="text-xl text-green-600 mb-8">
                      Your professional quotation has been sent to <strong>{quotationData.email}</strong>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                      <Button
                        onClick={handleDownloadPdf}
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download PDF
                      </Button>

                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="w-full sm:w-auto border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl text-lg font-semibold bg-transparent"
                      >
                        Create New Quote
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Enhanced Navigation Buttons */}
              <div className="sm:flex row justify-center text-center items-center mt-12 pt-8 border-t-2 border-[#7f5405]">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="rounded-full mb-2 px-8 py-4 text-lg font-semibold
                              border-2 border-[#7f5405] 
                              text-[#8c5c05]
                              bg-white 
                              hover:bg-amber-50 
                              hover:text-[#8c5c05]
                              transition-all duration-300
                              shadow-lg hover:shadow-xl"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Previous
                  </Button>
                )}

                <div className="ml-auto">
                  {currentStep < 5 ? (
                    <Button
                      onClick={handleNext}
                      className="rounded-full mb-2 px-8 py-4 text-lg font-semibold
                                bg-[linear-gradient(to_right,_#7f5405,_#583804)] 
                                hover:bg-[linear-gradient(to_right,_#6b4504,_#4a2f03)] 
                                text-white shadow-xl hover:shadow-2xl 
                                transition-all duration-300 transform hover:scale-105"
                    >
                      Next
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleGenerateQuote}
                      disabled={isGenerating || !quotationData.isEmailVerified}
                      className="rounded-full px-8 py-4 text-lg font-semibold
                                bg-gradient-to-r from-green-600 to-emerald-600 
                                hover:from-green-700 hover:to-emerald-700 
                                text-white shadow-xl hover:shadow-2xl 
                                transition-all duration-300 transform hover:scale-105
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          Generate Quote PDF
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
