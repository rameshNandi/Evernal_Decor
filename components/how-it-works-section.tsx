"use client"

import {
  Sofa,
  PaintRoller,
  Ruler,
  Sparkles,
  ClipboardCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function InteriorDesignShowcase() {
  const services = [
    { icon: Sofa, title: "Furniture Selection", description: "Perfect pieces for your space" },
    { icon: PaintRoller, title: "Color Consultation", description: "Harmonious color schemes" },
    { icon: Ruler, title: "Space Planning", description: "Optimal furniture arrangement" },
    { icon: Sparkles, title: "Decor Styling", description: "Finishing touches that wow" },
    { icon: ClipboardCheck, title: "Project Management", description: "Seamless execution" },
  ]

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate)
      return () => video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#583804] mb-3">
          Transform Your Space
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover our interior design process that brings your vision to life
        </p>
      </div>

      {/* Compact Video Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-lg overflow-hidden shadow-md aspect-video bg-gray-100">
            <video
              ref={videoRef}
              src="/videos/office6.mp4"
              poster="/images/design-poster.jpg"
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="h-1.5 w-full bg-gray-500/50 mb-2 rounded-full">
                <div 
                  className="h-full bg-[#8c5c05] rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  onClick={togglePlay}
                  className="text-white hover:text-[#f5e6cc] transition"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-[#f5e6cc] transition"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-semibold text-[#583804] mb-4">
            Our Design Philosophy
          </h3>
          <p className="text-gray-700 mb-6">
            At Eternal Decor, we believe every space tells a story. Our 3-step process ensures 
            your interior reflects your personality while maximizing functionality and aesthetic appeal.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-[#8c5c05] text-white rounded-full p-2 mr-3 flex-shrink-0">
                <Sparkles size={16} />
              </span>
              <div>
                <h4 className="font-medium text-[#583804]">Concept Development</h4>
                <p className="text-sm text-gray-600">We translate your ideas into cohesive design concepts</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-[#8c5c05] text-white rounded-full p-2 mr-3 flex-shrink-0">
                <Ruler size={16} />
              </span>
              <div>
                <h4 className="font-medium text-[#583804]">Detailed Planning</h4>
                <p className="text-sm text-gray-600">Precise measurements and material selections</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-[#8c5c05] text-white rounded-full p-2 mr-3 flex-shrink-0">
                <ClipboardCheck size={16} />
              </span>
              <div>
                <h4 className="font-medium text-[#583804]">Execution</h4>
                <p className="text-sm text-gray-600">Flawless implementation with quality assurance</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Services Grid */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-[#583804] mb-2">
          Our Interior Design Services
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Comprehensive solutions tailored to your unique style and needs
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {services.map(({ icon: Icon, title, description }, idx) => (
          <div 
            key={idx} 
            className="bg-white p-4 rounded-lg border border-[#f5e6cc] hover:border-[#8c5c05] transition-colors shadow-sm hover:shadow-md"
          >
            <div className="bg-[#f9f5eb] w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
              <Icon size={20} className="text-[#8c5c05]" />
            </div>
            <h4 className="font-medium text-[#583804] mb-1">{title}</h4>
            <p className="text-xs text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}