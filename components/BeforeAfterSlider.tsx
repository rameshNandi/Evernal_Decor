"use client"

import { useState } from "react"
import { transformations } from "@/lib/transformations"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after")
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = transformations[currentIndex]
  const router = useRouter()

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1 >= transformations.length ? 0 : prev + 1))
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 < 0 ? transformations.length - 1 : prev - 1))

  const handleViewDetails = () => {
    router.push(`/transformations/${current.id}`)
  }

  return (
    <section className="relative max-w-6xl mx-auto pt-16 px-4">
      <h2 className="text-2xl font-bold mb-6 text-[#583804]">{current.title}</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {["before", "after"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "before" | "after")}
            className={`uppercase text-sm ${activeTab === tab ? "font-bold underline" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* XL Arrows */}
      <button onClick={goPrev} className="hidden xl:flex absolute -left-16 top-1/2 transform -translate-y-1/2 bg-[#f6f0e6] hover:bg-[#8c5c05] transition-colors shadow-lg p-4 rounded-full z-10">
        <ChevronLeft className="text-[#583804]" size={32} />
      </button>

      <button onClick={goNext} className="hidden xl:flex absolute -right-16 top-1/2 transform -translate-y-1/2 bg-[#f6f0e6] hover:bg-[#8c5c05] transition-colors shadow-lg p-4 rounded-full z-10">
        <ChevronRight className="text-[#583804]" size={32} />
      </button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-12 items-start bg-white p-6 md:p-8 rounded-xl shadow-xl relative z-0">


        <div className="w-full md:w-2/3 relative">
          <Image src={activeTab === "before" ? current.beforeImage : current.afterImage} alt={`${activeTab} view`} width={900} height={600} className="rounded-lg shadow-md object-cover w-full" />
          <div className="block md:hidden h-[2px] w-full bg-[#8c5c05] mt-4 rounded-full" />
        </div>

        <div className="w-full md:w-1/3 space-y-6 mt-6 md:mt-0">
          <div>
            <h4 className="font-semibold text-[#583804] mb-1">Client's Challenge</h4>
            <p className="text-gray-700 text-sm">{current.challenge}</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#583804] mb-1">Result</h4>
            <p className="text-gray-700 text-sm">{current.result}</p>
            <p className="text-sm mt-1 italic">– {current.client}</p>
          </div>
          <div className="flex items-center">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="#8c5c05" stroke="#8c5c05" />
            ))}
          </div>
          {/* <button onClick={handleViewDetails} className="group mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 bg-[#8c5c05] text-white rounded hover:bg-[#583804] transition-all duration-300">
            View More Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="mt-8 overflow-x-auto no-scrollbar">
        <div className="flex justify-center gap-2 px-2 min-w-max">
          {transformations.map((item, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-xl/30 ${currentIndex === index ? "border-[#8c5c05] border-4" : "border-transparent"} transition-all duration-300 shadow-md hover:shadow-lg`}>
              <Image src={item.afterImage} alt="thumb" width={40} height={40} className="w-full h-full object-cover rounded-full" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
