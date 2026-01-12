"use client";

import { useEffect, useState } from "react";
import CategoryTabs from "../../components/CategoryTabs";
import ImageGrid from "../../components/ImageGrid";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("Living Room");

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setFiltered(data.filter((img: any) => img.category === "Living Room"));
      });
  }, []);

  useEffect(() => {
    setFiltered(images.filter((img: any) => img.category === selected));
  }, [selected, images]);

  return (
    <div className="max-w-[1440px] mx-auto py-10">
      <h2 className="text-center text-3xl font-serif text-[#583804]">Explore Real Spaces We've Transformed</h2>
      <CategoryTabs selected={selected} onSelect={setSelected} />
      <ImageGrid images={filtered} />
    </div>
  );
}
