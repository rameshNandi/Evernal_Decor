"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Trash2,
  Briefcase,
  GalleryHorizontal,
  Phone,
  Receipt,
  Star,
  MapPin,
  Calculator,
  BotMessageSquare,
  X,
} from "lucide-react"

const options = [
  {
    label: "Services we offer",
    response: `**🏠 COMPREHENSIVE INTERIOR DESIGN SERVICES**

At Evernal Decor, we're your complete design partner, transforming spaces into extraordinary experiences. Here's what sets us apart:

**🎨 FULL-SERVICE INTERIOR DESIGN**
• Complete home makeovers from concept to completion
• 3D visualization and virtual walkthroughs before execution
• Custom mood boards and design presentations
• Coordination with contractors, electricians, and vendors

**📐 SPACE PLANNING & OPTIMIZATION**
• Intelligent layout design maximizing every square foot
• Traffic flow analysis and furniture placement
• Storage solutions and built-in organizational systems
• Multi-functional space design for modern living

**🏡 RESIDENTIAL EXPERTISE**
• Luxury apartments and penthouses
• Independent houses and villas
• Studio apartments and compact homes
• Vacation homes and weekend retreats

**🏢 COMMERCIAL SPACES**
• Corporate offices and co-working spaces
• Retail stores and showrooms
• Restaurants, cafes, and hospitality venues
• Healthcare facilities and educational institutions

**🛋️ CUSTOM FURNITURE & FIXTURES**
• Bespoke furniture design and manufacturing
• Custom cabinetry and storage solutions
• Unique lighting fixtures and installations
• Handcrafted decorative elements

**💡 SPECIALIZED SERVICES**
• Smart home integration and automation
• Sustainable and eco-friendly design solutions
• Vastu-compliant layouts and arrangements
• Project management and timeline coordination

**Why choose us?**
✅ 10+ years of industry experience
✅ 500+ successful projects completed
✅ In-house team of certified designers
✅ End-to-end project management
✅ Post-completion support and maintenance

Ready to transform your space? Let's discuss your vision!`,
    icon: <Briefcase size={14} />,
  },
  {
    label: "View our projects",
    response: `**🎯 OUR AWARD-WINNING PORTFOLIO**

Discover how we've transformed over 500 spaces across India, each telling a unique story of design excellence:

**🏆 LUXURY RESIDENTIAL PROJECTS**
• **The Penthouse Paradise** - 4BHK modern luxury apartment in Salt Lake
  - Contemporary minimalist design with smart home integration
  - Custom Italian marble flooring and designer lighting
  - Featured in Architectural Digest India 2023

• **Heritage Villa Restoration** - Colonial bungalow in Alipore
  - Preserved original architecture while adding modern amenities
  - Antique furniture restoration and custom period pieces
  - Winner of Bengal Heritage Conservation Award

**🏢 COMMERCIAL SUCCESS STORIES**
• **TechCorp Headquarters** - 15,000 sq ft office space
  - Biophilic design with living walls and natural lighting
  - Collaborative spaces and quiet zones for productivity
  - 40% increase in employee satisfaction post-renovation

• **Boutique Hotel Makeover** - 25-room luxury property
  - Each room uniquely designed with local cultural elements
  - Rooftop restaurant with panoramic city views
  - 95% occupancy rate within 6 months of reopening

**🎨 DESIGN STYLES WE EXCEL IN**
• **Modern Contemporary** - Clean lines, neutral palettes
• **Traditional Indian** - Rich textures, cultural motifs
• **Scandinavian Minimalism** - Functional beauty, natural materials
• **Industrial Chic** - Exposed elements, urban aesthetics
• **Eclectic Fusion** - Bold combinations, personality-driven

**📊 PROJECT STATISTICS**
• Average project completion: 12-16 weeks
• Client satisfaction rate: 98.5%
• Repeat client rate: 65%
• Projects featured in design magazines: 25+

**🎬 VIRTUAL TOURS AVAILABLE**
Experience our projects through immersive 360° virtual tours and detailed case studies showing before/after transformations.

Want to see your space featured in our next showcase?

[Explore Full Portfolio](/projects) | [Schedule Site Visit](/contact)`,
    icon: <GalleryHorizontal size={14} />,
  },
  {
    label: "Contact information",
    response: `**📞 GET IN TOUCH WITH EVERNAL DECOR**

We're here to bring your design dreams to life! Multiple ways to connect with our expert team:

**🏢 HEADQUARTERS & DESIGN STUDIO**
📍 **Address:** PS ABACUS, 640, 6th Floor
NH12, Action Area IIE, Newtown, New Town, West Bengal 700157

🚗 **How to Reach:**
• 5 minutes from CC2
• Ample parking available
• Landmark: Opposite Decathlon Mall, Newtown

**📱 DIRECT CONTACT**
📞 **Primary:** +91 98765 43211
📞 **WhatsApp:** +91 98765 43211
✉️ **Email:** info@evernaldecor.com
✉️ **Projects:** projects@evernaldecor.com

**⏰ BUSINESS HOURS**
• **Monday - Saturday:** 10:00 AM - 7:00 PM
• **Emergency Support:** 24/7 for ongoing projects

**🌐 DIGITAL PRESENCE**
• **Website:** www.evernaldecor.com
• **Instagram:** @evernaldecor
• **Facebook:** Evernal Decor Official

**📅 CONSULTATION OPTIONS**
• **Visit:** Free 1-hour consultation
• **Virtual Consultation:** Free video call
• **WhatsApp Consultation:** Quick queries answered within 2 hours

**🎯 QUICK RESPONSE GUARANTEE**
• Phone calls answered within 3 rings during business hours
• WhatsApp messages replied within 30 minutes
• Emails responded within 4 hours
• Emergency project issues addressed immediately

**🚀 READY TO START?**
Don't wait! Our calendar fills up quickly. Book your consultation today and take the first step toward your dream space.

`,
    icon: <Phone size={14} />,
  },
  {
    label: "Get a quote",
    response: `**💰 TRANSPARENT PRICING & INSTANT QUOTES**

Get accurate estimates tailored to your specific needs. Our pricing is transparent, competitive, and value-driven:

**📊 PRICING STRUCTURE BREAKDOWN**

**🏠 RESIDENTIAL PROJECTS (Per Sq Ft)**
• **Essential Package:**
  - Basic space planning and color consultation
  - Standard materials and fixtures
  - 2 design revisions included

• **Premium Package:**
  - Complete design with 3D visualization
  - Mid-range materials and custom elements
  - 4 design revisions + project management

• **Luxury Package:**
  - High-end materials and bespoke furniture
  - Smart home integration options
  - Unlimited revisions + white-glove service

**🏢 COMMERCIAL PROJECTS**
• **Office Spaces:**
• **Retail Stores:**
• **Restaurants:**
• **Hotels:**

**📋 WHAT'S INCLUDED IN OUR QUOTES**
✅ Detailed design concepts and 3D renderings
✅ Complete material specifications and sourcing
✅ Labor costs and project timeline
✅ Furniture and fixture recommendations
✅ Project management and coordination
✅ Quality assurance and final styling

**⚡ INSTANT QUOTE PROCESS**
1. **Share Basic Details** (5 minutes)
   - Space type, size, and current condition
   - Budget range and timeline preferences
   - Style preferences and special requirements

2. **Free Consultation** (30-60 minutes)
   - Virtual or in-person site assessment
   - Detailed requirement discussion
   - Preliminary design ideas

3. **Detailed Proposal** (24-48 hours)
   - Comprehensive quote with breakdown
   - Timeline and milestone schedule
   - Terms and payment structure

**💡 COST-SAVING TIPS**
• Book during off-peak seasons for discount
• Bundle multiple rooms for package discounts
• Flexible payment plans available (0% interest)


**📞 GET YOUR QUOTE TODAY**
Ready for a detailed estimate? Our team will provide a comprehensive quote within 24 hours!
`,
    icon: <Receipt size={14} />,
  },

  {
    label: "Design process",
    response: `**🎨 OUR PROVEN 6-PHASE DESIGN METHODOLOGY**

Experience our systematic approach that has delivered 500+ successful projects with 98.5% client satisfaction:

**📋 PHASE 1: DISCOVERY & CONSULTATION (Week 1)**
🔍 **What We Do:**
• Comprehensive site analysis and measurements
• Lifestyle assessment and family needs evaluation
• Budget discussion and timeline planning
• Style preference exploration through mood boards
• Technical feasibility study

📝 **Deliverables:**
• Detailed site survey report
• Client requirement document
• Preliminary budget estimate
• Project timeline proposal

**🎯 PHASE 2: CONCEPT DEVELOPMENT (Week 2-3)**
💡 **What We Do:**
• Multiple design concept presentations
• Space planning and layout optimization
• Color palette and material selection
• Furniture and fixture recommendations
• Lighting design strategy

📊 **Deliverables:**
• 3-4 distinct design concepts
• Detailed floor plans and layouts
• Material and color boards
• Preliminary 3D visualizations
• Concept presentation meeting

**✏️ PHASE 3: DESIGN REFINEMENT (Week 4-5)**
🔧 **What We Do:**
• Client feedback incorporation
• Detailed technical drawings
• Photorealistic 3D renderings
• Material sourcing and vendor coordination
• Final budget confirmation

📐 **Deliverables:**
• Refined design drawings
• High-quality 3D visualizations
• Complete material specifications
• Detailed cost breakdown
• Project contract and timeline

**🛒 PHASE 4: PROCUREMENT & COORDINATION (Week 6-8)**
📦 **What We Do:**
• Material ordering and quality checks
• Vendor coordination and scheduling
• Custom furniture manufacturing oversight
• Permit applications (if required)
• Site preparation coordination

✅ **Deliverables:**
• Material delivery schedule
• Vendor contact information
• Quality assurance certificates
• Project milestone calendar
• Regular progress updates

**🔨 PHASE 5: IMPLEMENTATION & EXECUTION (Week 9-14)**
⚡ **What We Do:**
• Daily site supervision and quality control
• Coordination between multiple trades
• Regular progress reporting to clients
• Problem-solving and quick decision making
• Safety and timeline management

📈 **Deliverables:**
• Weekly progress reports with photos
• Quality checkpoint approvals
• Change order documentation
• Timeline adjustments (if needed)
• Client communication updates

**🎉 PHASE 6: FINAL REVEAL & HANDOVER (Week 15-16)**
🏆 **What We Do:**
• Final styling and accessory placement
• Comprehensive quality inspection
• Client walkthrough and feedback
• Documentation and warranty handover
• Post-completion support setup

📋 **Deliverables:**
• Complete project documentation
• Maintenance guidelines and warranties
• Vendor contact list for future needs
• Professional photography of completed space
• Client satisfaction survey

**🔄 POST-COMPLETION SUPPORT**
• **30-Day Follow-up:** Address any minor adjustments
• **6-Month Check-in:** Ensure everything functions perfectly
• **Annual Maintenance:** Optional service packages available
• **Lifetime Consultation:** Design advice for future changes

**📊 PROJECT MANAGEMENT TOOLS**
• **Client Portal:** Real-time project tracking
• **Mobile App:** Progress photos and updates
• **WhatsApp Group:** Instant communication
• **Weekly Meetings:** In-person or virtual check-ins

**⏰ TYPICAL TIMELINES**
• **Studio Apartment:** 8-10 weeks
• **2-3 BHK Apartment:** 12-16 weeks
• **Independent House:** 16-20 weeks
• **Commercial Space:** 14-18 weeks

Ready to experience our proven process? Let's start your transformation journey!
`,
    icon: <MapPin size={14} />,
  },

  {
    label: "FAQ",
    response: `**❓ FREQUENTLY ASKED QUESTIONS**

Get instant answers to the most common questions about our services, process, and policies:

**🏠 PROJECT & DESIGN QUESTIONS**

**Q: How long does a typical interior design project take?**
A: Timeline varies by project scope:
• Studio/1BHK: 8-10 weeks
• 2-3BHK Apartment: 12-16 weeks  
• Independent House: 16-20 weeks
• Commercial Space: 14-18 weeks
Factors affecting timeline: approvals, custom work, material availability, and client decision speed.

**Q: Can you work with furniture and items I already own?**
A: We love incorporating your existing pieces that have sentimental value. Our designers will:
• Assess which items work with the new design
• Suggest refurbishment or reupholstering options
• Seamlessly blend old and new elements
• Provide storage solutions for items not being used

**Q: Do you provide 3D visualizations before starting work?**
A: Yes! Every project includes:
• Detailed 3D renderings of all spaces
• Virtual walkthroughs and 360° views
• Multiple design options to choose from
• Photorealistic visualizations showing exact materials and colors
• VR experience available for premium projects

**💰 PRICING & PAYMENT QUESTIONS**

**Q: What's included in your quoted price?**
A: Our comprehensive quotes include:
• Complete design development and drawings
• All materials, furniture, and fixtures
• Labor, installation, and project management
• Quality checks and final styling
• Post-completion support for 30 days
• No hidden charges or surprise costs

**Q: Do you offer payment plans or financing?**
A: Yes, multiple flexible options:
• 0% interest EMI up to 12 months
• 30-40-30 payment structure (booking-progress-completion)
• Bank loan assistance with pre-approved partners
• Separate financing for furniture and fixtures
• Corporate payment terms for business clients

**Q: What if the project goes over budget?**
A: We maintain strict budget discipline:
• 94% of projects completed within ±5% of quoted price
• Any changes require written approval with cost implications
• Regular budget updates throughout the project
• Transparent change order process
• Client approval required for any additional expenses

**🔧 PROCESS & EXECUTION QUESTIONS**

**Q: How do you handle project delays or issues?**
A: Our proactive approach minimizes delays:
• Detailed project planning with buffer time
• Daily site supervision and quality control
• Immediate communication about any challenges
• Alternative solutions provided quickly
• Timeline adjustments with client consultation
• Penalty clauses for vendor-related delays

**Q: What areas do you serve?**
A: Primary service areas:
• **Kolkata & Suburbs:** Full service with daily supervision
• **West Bengal:** Selected projects with local partnerships
• **Pan-India:** Luxury projects and commercial spaces
• **Consultation Services:** Available nationwide via video calls

**Q: Can I make changes during the project?**
A: Yes, but with structured process:
• Minor changes: Accommodated without cost impact
• Major changes: Assessed for timeline and budget implications
• Change orders documented and approved in writing
• Impact on overall project timeline communicated clearly
• Additional costs (if any) discussed upfront

**🏆 QUALITY & WARRANTY QUESTIONS**

**Q: What warranty do you provide?**
A: Comprehensive warranty coverage:
• **Workmanship:** 2-10 years based on package tier
• **Materials:** Manufacturer warranty passed to client
• **Custom Furniture:** 5-year structural warranty
• **Electrical/Plumbing:** 2-year comprehensive coverage
• **Paint Work:** 3-year warranty against peeling/fading

**Q: What if I'm not satisfied with the final result?**
A: Your satisfaction is guaranteed:
• Multiple design revisions during planning phase
• Regular client approvals at each milestone
• 30-day post-completion adjustment period
• Professional mediation for any disputes
• Commitment to resolve issues to your satisfaction

**🎯 GETTING STARTED QUESTIONS**

**Q: How do I begin the design process?**
A: Simple 4-step process:
1. **Initial Consultation:** Free 30-60 minute discussion
2. **Site Visit:** Detailed assessment and measurements
3. **Proposal:** Comprehensive quote and timeline
4. **Contract:** Agreement signing and project kickoff

**Q: What should I prepare before our first meeting?**
A: Helpful preparation:
• Inspiration images and style preferences
• Budget range and timeline expectations
• List of must-haves and deal-breakers
• Current space photos and measurements
• Family lifestyle and usage patterns

**Q: Do you work on partial home renovations?**
A: We handle projects of all sizes:
• Single room makeovers
• Kitchen or bathroom renovations
• Living area redesigns
• Home office setups
• Balcony and outdoor spaces

**📞 STILL HAVE QUESTIONS?**
Our expert team is ready to provide personalized answers to your specific queries!

[Ask Our Experts](/contact) | [Schedule Consultation](/book) | [Live Chat Support](https://wa.me/919876543211)`,
    icon: <Calculator size={14} />,
  },
]

export default function EnhancedChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `**🏠 Welcome to Evernal Decor!**

I'm your AI design assistant, here to help you create extraordinary spaces. I can provide detailed information about:

• **🎨 Our comprehensive design services**
• **📸 Portfolio of 500+ completed projects**
• **💰 Transparent pricing and instant quotes**
• **⭐ Client testimonials and success stories**
• **📞 Contact information and consultation booking**
• **🔧 Our proven 6-phase design process**
• **💡 Budget planning and cost optimization**
• **❓ Answers to frequently asked questions**

**What would you like to explore first?** Choose from the options below or ask me anything about interior design!

*Response time: Instant • Available 24/7*`,
    },
  ])
  const [typingIndex, setTypingIndex] = useState<number | null>(null)
  const [displayedText, setDisplayedText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Auto-scroll when messages change or typing updates
  useEffect(() => {
    scrollToBottom()
  }, [messages, displayedText])

  const clearMessages = () => {
    setMessages([
      {
        sender: "bot",
        text: `**🏠 Welcome back to Evernal Decor!**

I'm ready to help you with any interior design questions. What would you like to know about today?

• Design services and specializations
• Project portfolio and case studies  
• Pricing and budget planning
• Our design process and timeline
• Client testimonials and reviews
• Contact information and booking

**How can I assist you?**`,
      },
    ])
    setTypingIndex(null)
    setDisplayedText("")
  }

  const handleOptionClick = (option: (typeof options)[0]) => {
    const userMsg = { sender: "user", text: option.label }
    setMessages((prev) => [...prev, userMsg])

    // Start typing animation
    const newBotMessageIndex = messages.length + 1
    setTypingIndex(newBotMessageIndex)
    setDisplayedText("")

    // Add bot message after a short delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: option.response }])
    }, 500)
  }

  // Enhanced typing effect
  useEffect(() => {
    if (typingIndex !== null) {
      const msg = messages[typingIndex]
      if (msg?.sender === "bot") {
        let i = 0
        const interval = setInterval(() => {
          setDisplayedText(msg.text.slice(0, i + 1))
          i++
          if (i >= msg.text.length) {
            clearInterval(interval)
            setTypingIndex(null)
          }
        }, 15) // Faster typing speed

        return () => clearInterval(interval)
      }
    }
  }, [messages, typingIndex])

  // Format message text with better styling
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-[#8c5c05]">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      .replace(/•/g, '<span class="text-[#8c5c05] font-bold">•</span>')
      .replace(/✅/g, '<span class="text-green-600">✅</span>')
      .replace(
        /📞|📍|✉️|⏰|🌐|📅|🎯|🚀|💰|📊|🏠|🏢|📋|⚡|💡|🎯|📈|🏆|📋|🔄|📊|⏰|🧮|📐|⭐|💎|🥉|🥈|🥇|🔍|📱|❓|🔧|💰|🏆|🎯/g,
        '<span class="text-lg">$&</span>',
      )
  }

  return (
    <>
      {/* Floating Icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <button onClick={() => setOpen(!open)} className="relative p-0 bg-transparent border-none shadow-none">
          {!open && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-10 -left-6 text-sm font-semibold bg-white text-[#8c5c05] px-3 py-2 rounded-full shadow-lg border border-[#8c5c05] animate-bounce"
            >
              Hi..👋
            </motion.span>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`transition-all duration-300 ease-in-out ${
              open ? "w-12 h-12" : "w-16 h-16"
            } bg-gradient-to-r from-[#8c5c05] to-[#b8750a] rounded-full flex items-center justify-center text-white shadow-lg`}
          >
            <BotMessageSquare className={open ? "w-6 h-6" : "w-8 h-8"} />
          </motion.div>
        </button>
      </div>

      {/* Enhanced Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-24 right-4 w-[95vw] max-w-[400px] h-[550px] bg-white shadow-2xl rounded-2xl p-0 z-50 flex flex-col border border-[#8c5c05] overflow-hidden"
        >
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#8c5c05] to-[#b8750a] text-white rounded-t-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 mt-1 bg-white/20 rounded-full flex items-center justify-center">
                <BotMessageSquare size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Evernal Decor AI</h2>
                <div className="flex items-center text-sm text-white/90 mt-0.5">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    className="relative flex h-2 w-2 mr-2"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </motion.span>
                  Online • Instant Response
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearMessages}
                className="text-white/80 hover:text-white p-1 rounded"
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
                title="Close"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Enhanced Messages Container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto space-y-3 p-4 text-sm bg-gray-50"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((msg, idx) => {
              const isBotTyping = idx === typingIndex && msg.sender === "bot"
              const displayText = isBotTyping ? displayedText : msg.text

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "bot" ? "" : "flex-row-reverse"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-6 h-6 bg-[#8c5c05] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <BotMessageSquare size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl whitespace-pre-line break-words leading-relaxed ${
                        msg.sender === "bot"
                          ? "bg-white text-gray-800 shadow-sm border border-gray-200 rounded-tl-sm"
                          : "bg-gradient-to-r from-[#8c5c05] to-[#b8750a] text-white rounded-tr-sm"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(displayText),
                        }}
                      />
                      {isBotTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                          className="inline-block w-2 h-4 bg-[#8c5c05] ml-1"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Option Buttons */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 mb-2">
              {options.slice(0, 6).map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(opt)}
                  className="flex items-center justify-center gap-2 text-xs px-3 py-2.5 rounded-xl border border-[#8c5c05] text-[#8c5c05] hover:bg-gradient-to-r hover:from-[#8c5c05] hover:to-[#b8750a] hover:text-white transition-all duration-200 font-medium"
                >
                  <span className="flex-shrink-0">{opt.icon}</span>
                  <span className="truncate">{opt.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options.slice(6).map((opt, idx) => (
                <motion.button
                  key={idx + 6}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(opt)}
                  className="flex items-center justify-center gap-2 text-xs px-3 py-2.5 rounded-xl border border-[#8c5c05] text-[#8c5c05] hover:bg-gradient-to-r hover:from-[#8c5c05] hover:to-[#b8750a] hover:text-white transition-all duration-200 font-medium"
                >
                  <span className="flex-shrink-0">{opt.icon}</span>
                  <span className="truncate">{opt.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
