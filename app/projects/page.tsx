"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, ZoomIn } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    category: "Residential",
    image: "/projects/images/evernal_decor_projects_1.webp",
    video: "/projects/videos/evernal_decor_projects_video_1.mp4",
    description: "A stunning modern villa featuring clean lines, natural materials, and panoramic views.",
    tags: [ "Evernal Decor","Modern",  "Luxury", "Villa"],
  },
  {
    id: 2,
    title: "Corporate Headquarters",
    category: "Commercial",
    image: "/projects/images/evernal_decor_projects_2.webp",
    video: "/projects/videos/evernal_decor_projects_video_2.mp4",
    description: "Contemporary office space designed to inspire creativity and collaboration.",
    tags: ["Evernal Decor","Corporate", "Modern", "Office"],
  },
  {
    id: 3,
    title: "Boutique Hotel Lobby",
    category: "Commercial",
    image: "/projects/images/evernal_decor_projects_3.webp",
    video: "/projects/videos/evernal_decor_projects_video_3.mp4",
    description: "Elegant hotel lobby combining luxury with comfort for an unforgettable experience.",
    tags: ["Evernal Decor","Hotel", "Luxury", "Hospitality"],
  },
  {
    id: 4,
    title: "Family Home Renovation",
    category: "Residential",
    image: "/projects/images/evernal_decor_projects_4.webp",
    video: "projects/videos/evernal_decor_projects_video_4.mp4",
    description: "Complete renovation of a family home, blending with modern functionality.",
    tags: ["Evernal Decor", "Renovation", "Family"],
  },
  {
    id: 5,
    title: "Restaurant Interior",
    category: "Commercial",
    image: "/projects/images/evernal_decor_projects_5.webp",
    video: "projects/videos/evernal_decor_projects_video_5.mp4",
    description: "Warm and inviting restaurant design that enhances the dining experience.",
    tags: ["Evernal Decor","Restaurant", "Hospitality", "Warm"],
  },
  {
    id: 6,
    title: "Penthouse Apartment",
    category: "Residential",
    image: "/projects/images/evernal_decor_projects_6.webp",
    video: "projects/videos/evernal_decor_projects_video_6.mp4",
    description: "Sophisticated penthouse design with breathtaking city views and premium finishes.",
    tags: ["Evernal Decor", "Penthouse", "Luxury", "City"],
  },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [mediaType, setMediaType] = useState<"image" | "video">("image")

  const categories = ["All", "Residential", "Commercial"]

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const openModal = (project: (typeof projects)[0], type: "image" | "video") => {
    setSelectedProject(project)
    setMediaType(type)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className=" pt-32 px-4 bg-gradient-to-br from-[var(--quill-gray)]/20 to-[var(--nobel)]/2 ">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-6 ">
            Our Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of stunning interior design projects across residential and commercial spaces
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[var(--rusty-nail)] hover:bg-[var(--antique-bronze)]"
                    : "border-[var(--rusty-nail)] text-[var(--rusty-nail)] hover:bg-[var(--rusty-nail)] hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glassmorphic overflow-hidden group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={() => openModal(project, "image")}
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          <ZoomIn className="h-5 w-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={() => openModal(project, "video")}
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          <Play className="h-5 w-5" />
                        </Button>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-[var(--rusty-nail)]">{project.category}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full glassmorphic rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="aspect-video">
                {mediaType === "image" ? (
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video src={selectedProject.video} controls autoPlay className="w-full h-full object-cover" />
                )}
              </div>

          <div className="p-6 bg-white/10 text-white">
  <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
  <p className="mb-4 text-gray-300">{selectedProject.description}</p>
  <div className="flex flex-wrap gap-2 ">
    {selectedProject.tags.map((tag) => (
      <Badge key={tag} variant="outline" className="border-white text-gray-300">
        {tag}
      </Badge>
    ))}
  </div>
</div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     
    </main>
  )
}
