"use client"

import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-col md:flex-row w-full pt-16">
      
      {/* Image section */}
      <div className="w-full md:w-2/5 h-[350px] ">
        <img
          src="/videos/HighEnd-Online-Interior-Design-Help.webp"
          alt="Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text section */}
      <div className="w-full md:w-3/5 bg-[#f7f7f7] flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Think you can't afford <br />
            beautiful interior design? <br />
            <span className="font-semibold text-[#583804]">Think again.</span>
          </h2>
          <button
            onClick={() => router.push("/contact")}
            className="mt-4 bg-[#8c5c05] text-white px-6 py-3 rounded hover:bg-[#583804] transition"
          >
            SCHEDULE A CONSULTATION
          </button>
        </div>
      </div>
    </div>
  )
}
