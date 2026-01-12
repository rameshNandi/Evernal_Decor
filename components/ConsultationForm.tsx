"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"
import { sendContactForm } from "@/app/actions/contact"
import { Navigation } from "@/components/navigation"

export default function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    zip: "",
    phone: "",
    budget: "",
    source: "",
    otherSource: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const res = await sendContactForm(formData)

    if (res.success) {
      setFormData({
        name: "",
        zip: "",
        phone: "",
        budget: "",
        source: "",
        otherSource: "",
        description: "",
      })
      setShowSuccessModal(true)
    } else {
      alert("Failed to send message. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="relative w-full bg-white py-12 px-4 md:px-10 flex flex-col items-center">
     <Navigation />
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-[#b49a66] mb-2">Thank you!</h2>
            <p className="text-gray-600">Your form has been successfully submitted. We'll be in touch soon.</p>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-[#b49a66] hover:bg-[#a08955] text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-5xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 pt-20">Tell Us Your Story</h2>
        <p className="text-gray-500">So we can help create your dream space.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl border border-gray-100 w-full max-w-6xl p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Form */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your first name" />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="block mb-1 font-medium">Zip Code*</label>
                <Input name="zip" value={formData.zip} onChange={handleChange} placeholder="Enter your postal code" />
              </div>
              <div className="w-full">
                <label className="block mb-1 font-medium">Phone Number</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="block mb-1 font-medium">Estimated Budget</label>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="appearance-none w-full bg-white border border-gray-300 rounded px-4 py-2"
                  >
                    <option>Budget for furniture & decor</option>
                    <option>₹50,000–₹1,00,000</option>
                    <option>₹1,00,000–₹3,00,000</option>
                    <option>₹3,00,000+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="w-full">
                <label className="block mb-1 font-medium">Where did you hear about us?</label>
                <div className="relative">
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="appearance-none w-full bg-white border border-gray-300 rounded px-4 py-2"
                  >
                    <option>Choose a source</option>
                    <option>Google</option>
                    <option>Instagram</option>
                    <option>Friend Referral</option>
                    <option>Social Media</option>
                    <option>Steet Media</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {formData.source === "Other" && (
                  <div className="mt-3">
                    <Input
                      name="otherSource"
                      value={formData.otherSource}
                      onChange={handleChange}
                      placeholder="Please specify"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Enter a brief description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your decor needs"
                className="w-full h-32"
              />
            </div>
          </div>

          {/* Right Side Info */}
          <div className="bg-gradient-to-br from-[#fdf8f2] via-[#f5e8d8] to-[#fae6ca] rounded-xl p-6 shadow-md">
            <h3 className="text-center font-semibold text-gray-700 text-lg mb-6">
              Why You'll <span className="text-red-500">❤️</span> Evernal Decor
            </h3>
            <ul className="space-y-6 text-gray-600 text-sm">
              <li className="flex items-start gap-3"><span className="text-xl">👩‍🎨</span> <span>An accomplished interior designer at your fingertips</span></li>
              <li className="flex items-start gap-3"><span className="text-xl">🌟</span> <span>Complete satisfaction guaranteed</span></li>
              <li className="flex items-start gap-3"><span className="text-xl">🏷️</span> <span>No markups or brand-loyalties</span></li>
              <li className="flex items-start gap-3"><span className="text-xl">💸</span> <span>Exclusive furniture & decor discounts</span></li>
              <li className="flex items-start gap-3"><span className="text-xl">🔒</span> <span>We respect your privacy</span></li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#8c5c05] hover:bg-[#583804] text-white text-lg px-10 py-6 transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Sending..." : "CONTINUE"}
          </Button>
          <p className="text-sm text-gray-500 mt-3">Get a design you'll love – guaranteed!</p>
        </div>
      </form>
    </div>
  )
}
