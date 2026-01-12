"use client";

import { useState } from "react";

const categories = [
  "Living Room", "Dining Room", "Combined Living/Dining", "Bedroom",
  "Bathroom", "Office", "Kitchen", "Hallway", "Kids",
  "Outdoor", "Business", "Other"
];

export default function CategoryTabs({ selected, onSelect }: { selected: string, onSelect: (cat: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 text-sm transition-transform duration-300 hover:scale-105 rounded-full border ${
            selected === cat
              ? "bg-[#8c5c05] text-white border-[#583804]"
              : "bg-white text-[#583804] border-[#8c5c05]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
