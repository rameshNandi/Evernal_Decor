"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendContactForm } from "@/app/actions/contact"
import { Loader2, Send, CheckCircle2, XCircle } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string | null
  }>({ type: null, message: null })

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setStatus({ type: null, message: null })

    try {
      const result = await sendContactForm(formData)

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully!'
        })
        const form = document.getElementById("contactForm") as HTMLFormElement
        form.reset()
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send your message. Please try again.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id="contactForm"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        handleSubmit(new FormData(form))
      }}
      className="space-y-6"
    >
      {/* Status Message */}
      {status.type && (
        <div
          className={`p-3 rounded-md flex items-start gap-2 text-sm ${
            status.type === 'success'
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          )}
          <p>{status.message}</p>
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        <div className="flex flex-col space-y-1.5 w-full">
          <Label htmlFor="name" className="text-sm text-[var(--brown-bramble)]">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            disabled={isSubmitting}
            className="h-10 text-sm border-[var(--yellow-metal)] bg-[var(--quill-gray)] placeholder:text-[var(--dusty-gray)] focus-visible:ring-[var(--rusty-nail)]"
          />
        </div>

        <div className="flex flex-col space-y-1.5 w-full">
          <Label htmlFor="email" className="text-sm text-[var(--brown-bramble)]">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            disabled={isSubmitting}
            className="h-10 text-sm border-[var(--yellow-metal)] bg-[var(--quill-gray)] placeholder:text-[var(--dusty-gray)] focus-visible:ring-[var(--rusty-nail)]"
          />
        </div>

        <div className="flex flex-col space-y-1.5 w-full">
          <Label htmlFor="mobile" className="text-sm text-[var(--brown-bramble)]">Mobile</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="Your mobile"
            required
            disabled={isSubmitting}
            className="h-10 text-sm border-[var(--yellow-metal)] bg-[var(--quill-gray)] placeholder:text-[var(--dusty-gray)] focus-visible:ring-[var(--rusty-nail)]"
          />
        </div>

        {/* Message Field (Full Width) */}
        <div className="sm:col-span-2 lg:col-span-3 flex flex-col space-y-1.5 w-full">
          <Label htmlFor="message" className="text-sm text-[var(--brown-bramble)]">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            required
            disabled={isSubmitting}
            className="min-h-[120px] text-sm border-[var(--yellow-metal)] bg-[var(--quill-gray)] placeholder:text-[var(--dusty-gray)] focus-visible:ring-[var(--rusty-nail)]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full transition-all duration-300 bg-[var(--rusty-nail)] hover:bg-[var(--antique-bronze)] text-[var(--quill-gray)] shadow-md hover:shadow-lg text-sm h-10"
        style={{
          boxShadow: "0 4px 6px -1px rgba(140, 92, 5, 0.3), 0 2px 4px -1px rgba(140, 92, 5, 0.2)"
        }}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </div>
        )}
      </Button>
    </form>
  )
}
