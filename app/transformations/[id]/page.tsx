"use client";

import { transformations } from "@/lib/transformations";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { List, ChevronUp, ChevronDown, Image as ImageIcon } from "lucide-react";

export default function TransformationDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const data = transformations.find((item) => item.id === id);

  // States
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const [selectedTab, setSelectedTab] = useState("Final Package");
  const [selectedBedroomImage, setSelectedBedroomImage] = useState<string | undefined>(
    data?.finalDesignBedroom?.[0]
  );
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [selectedLivingDining2Image, setSelectedLivingDining2Image] = useState<string | undefined>(
    data?.livingDining3DModel2?.mainImage
  );

  // Reset selected images if data changes (e.g. navigation to another id)
  useEffect(() => {
    if (data) {
      setSelectedBedroomImage(data.finalDesignBedroom?.[0]);
      setSelectedLivingDining2Image(data.livingDining3DModel2?.mainImage);
    }
  }, [data]);

  const toggleExpand = (idx: number) => {
    setExpandedSections((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  if (!data) {
    return <div className="text-center text-2xl py-20">Not Found</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-16">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {data.title}
      </motion.h1>

      {/* Before/After Tabs */}
      <div className="space-y-6">
        <div className="flex justify-center space-x-6">
          {["before", "after"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "before" | "after")}
              className={`uppercase text-lg px-4 py-2 border-b-2 transition-all duration-300 ${
                activeTab === tab
                  ? "font-bold border-[#8c5c05] text-[#8c5c05]"
                  : "border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <motion.div
          className="flex justify-center"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full md:w-2/3">
            <Image
              src={activeTab === "before" ? data.beforeImage : data.afterImage}
              alt={`${activeTab} Image`}
              width={800}
              height={500}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Designer Proposals Banner */}
      <div className="bg-[#f3f0e7] py-6 px-8 flex flex-col md:flex-row items-center justify-between rounded-lg shadow-sm w-full">
        <div className="flex items-center space-x-6">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                src="/images/testimonials/priya-patel.webp"
                alt={`Designer ${i}`}
                width={60}
                height={60}
                className="rounded-full border-2 border-white shadow-lg"
              />
            ))}
          </div>
          <p className="text-base text-gray-800">
            They received proposals from{" "}
            <span className="font-semibold">multiple professional designers</span> & their perfect design!
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-8 bg-[#e7e0d0] border border-[#d5cab6] rounded-md px-6 py-3 text-center">
          <p className="text-base font-semibold text-gray-800">
            Get a design you’ll <span className="text-red-600 text-lg">❤️</span> – Guaranteed!
          </p>
        </div>
      </div>

      {/* Main Tabs: Questionnaire, Initial Proposals, Final Package */}
      <div className="relative">
        {/* Tab Buttons */}
        <div className="absolute -top-6 left-6 z-10 flex space-x-2">
          {["Questionnaire", "Initial Proposals", "Final Package"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-t-md border border-gray-200 bg-white text-sm font-medium transition-all duration-300 ${
                selectedTab === tab ? "font-bold shadow-md text-black" : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6 pt-12 space-y-4 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <List className="w-6 h-6 text-[#8c5c05]" />
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedTab === "Questionnaire"
                ? "Project Questionnaire"
                : selectedTab === "Initial Proposals"
                ? "Initial Proposals"
                : "Master Bedroom Interior Design - 3D Model"}
            </h2>
          </div>

          {selectedTab === "Questionnaire" ? (
            // === Questionnaire Content ===
            <div className="space-y-6">
              {/* Overall Budget */}
              <div className="border rounded-lg shadow-sm p-4 bg-[#f9f6f1]">
                <h3 className="text-[#8c5c05] font-bold text-base mb-1">Overall Budget</h3>
                <hr className="border-t mb-3" />
                <div className="text-right">{data.questionnaire.overallBudget}</div>
              </div>
              {/* Rooms */}
              {data.questionnaire.rooms.map((room, idx) => {
                const isOpen = expandedSections.includes(idx);
                return (
                  <div key={idx} className="border rounded-lg shadow-sm bg-[#f9f6f1]">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="w-full flex justify-between items-center px-4 py-3 text-left"
                    >
                      <div className="flex items-center space-x-2 text-[#8c5c05] font-semibold">
                        <List className="w-5 h-5" />
                        <span>{room.roomLabel}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-700" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-700" />
                      )}
                    </button>
                    <hr className="border-t" />
                    {isOpen && (
                      <div className="px-6 py-4 space-y-2 text-right text-sm text-gray-800">
                        <p>
                          <span className="font-semibold">Room Type:</span> {room.roomType}
                        </p>
                        <p>
                          <span className="font-semibold">Focus:</span> {room.wantsToFocusOn}
                        </p>
                        <p>
                          <span className="font-semibold">Liked Inspiration:</span> {room.likedInspoImages}
                        </p>
                        <p>
                          <span className="font-semibold">Current Dislikes:</span> {room.currentDislikes}
                        </p>
                        <p>
                          <span className="font-semibold">Open to Changing Layout:</span> {room.openToChangeLayout}
                        </p>
                        <p>
                          <span className="font-semibold">Flooring Preference:</span> {room.flooringPreference}
                        </p>
                        <p>
                          <span className="font-semibold">Carpet Change:</span> {room.carpetChange}
                        </p>
                        <p>
                          <span className="font-semibold">Additional Comments:</span>
                          <br />
                          {room.additionalComments}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : selectedTab === "Initial Proposals" ? (
            // === Initial Proposals Content ===
            <div className="text-gray-700">
              <p>Initial proposals content goes here.</p>
            </div>
          ) : (
            // === Final Package Content ===
            <>
              {/* Final Design Image + Thumbnails */}
              <div className="flex justify-center">
                <Image
                  src={selectedBedroomImage!}
                  alt="Main Bedroom Final Design"
                  width={800}
                  height={500}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
              <div className="flex justify-center space-x-4 overflow-x-auto mt-4">
                {data.finalDesignBedroom.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedBedroomImage(img)}
                    className={`w-36 h-24 flex-shrink-0 focus:outline-none ${
                      selectedBedroomImage === img ? "ring-2 ring-[#8c5c05]" : ""
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Bedroom Final Design ${idx + 1}`}
                      width={144}
                      height={96}
                      className="rounded-lg object-cover shadow hover:opacity-80"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>


        {/* ========== Final Package Floorplan Section ========== */}           
                <div className="mt-8">
                <h3 className="text-[#8c5c05] font-bold text-lg mb-4">
                  {data.finalPackageFloorplan.title}
                </h3>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Floorplan Image */}
                  <div className="flex-1">
                    <div className="h-full min-h-[700px]">
                      <Image
                        src={data.finalPackageFloorplan.image}
                        alt={data.finalPackageFloorplan.title}
                        width={800}
                        height={800}
                        className="rounded-lg shadow-md object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  {/* Legend List */}
                  <div className="flex-1 bg-[#f9f6f1] p-4 rounded-lg shadow-inner">
                    <h4 className="text-[#8c5c05] font-semibold mb-3">Legend</h4>
                    <ul className="space-y-4 text-sm text-gray-700">
                      {data.finalPackageFloorplan.legend.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 min-w-[1.5rem] flex items-center justify-center rounded-full bg-[#8c5c05] text-white text-xs font-semibold">
                            {index + 1}
                          </div>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>


      {/* ========== Living/Dining 3D Model Section 1 (always under Final Package) ========== */}
      {selectedTab === "Final Package" && data.livingDining3DModel1 && (
        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <ImageIcon className="w-5 h-5 text-[#8c5c05]" />
            <h3 className="text-[#8c5c05] font-bold text-lg">
              {data.livingDining3DModel1.title}
            </h3>
          </div>
          <Image
            src={data.livingDining3DModel1.mainImage}
            alt={data.livingDining3DModel1.title}
            width={400}
            height={400}
            className="rounded-lg shadow-md object-cover w-full"
          />
        </div>
      )}

      {/* ========== Living/Dining 3D Model Section 2 with 3 Thumbnails ========= */}
{selectedTab === "Final Package" && data.livingDining3DModel2 && (
  <div className="mt-8 mb-16">
    {/* Header */}
    <div className="flex items-center space-x-2 mb-4">
      <ImageIcon className="w-5 h-5 text-[#8c5c05]" />
      <h3 className="text-[#8c5c05] font-bold text-lg">
        {data.livingDining3DModel2.title}
      </h3>
    </div>

    {/* Main Image (full-width, with increased height) */}
    <div className="flex justify-center">
      <div className="w-full">
        <Image
          src={selectedLivingDining2Image!}
          alt={data.livingDining3DModel2.title}
          // Larger intrinsic dimensions
          width={1200}
          height={800}
          // Force it to fill width, and set a fixed height for cropping if desired:
          className="rounded-lg shadow-md object-cover w-full h-[500px]"
        />
      </div>
    </div>

    {/* Thumbnails (original-ish size) */}
    {data.livingDining3DModel2.thumbnails && data.livingDining3DModel2.thumbnails.length > 0 && (
      <div className="flex justify-center space-x-4 overflow-x-auto mt-4">
        {data.livingDining3DModel2.thumbnails.map((thumbUrl, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedLivingDining2Image(thumbUrl)}
            className={`w-36 h-24 flex-shrink-0 focus:outline-none rounded-lg overflow-hidden ${
              selectedLivingDining2Image === thumbUrl ? "ring-2 ring-[#8c5c05]" : ""
            }`}
          >
            <Image
              src={thumbUrl}
              alt={`${data.livingDining3DModel2.title} thumb ${idx + 1}`}
              // Intrinsic size can be moderate; className will size it
              width={144}
              height={96}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    )}
  </div>
)}



                  {/* New floorplan section added */}
             <div className="mt-8">
  <h3 className="text-[#8c5c05] font-bold text-lg mb-4">
    {data.livingDiningFloorplanWithLegend.title}
  </h3>
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Floorplan Image */}
    <div className="flex-1">
      <div className="w-full">
        <Image
  src={data.livingDiningFloorplanWithLegend.image}
  alt={data.livingDiningFloorplanWithLegend.title}
  width={1200}
  height={600}
  className="rounded-lg shadow-md object-cover w-full h-[550px]" // ← Increased height
/>

      </div>
    </div>
    {/* Legend List */}
    <div className="flex-1 bg-[#f9f6f1] p-4 rounded-lg shadow-inner">
      <h4 className="text-[#8c5c05] font-semibold mb-3">Legend</h4>
      <ul className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700">
        {data.livingDiningFloorplanWithLegend.legend.map((item, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-6 h-6 min-w-[1.5rem] flex items-center justify-center rounded-full bg-[#8c5c05] text-white text-xs font-semibold">
              {index + 1}
            </div>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>



 
    </div>
  );
}
