"use client";

import Image from "next/image";

interface ImageItem {
  id: number;
  category: string;
  image: string;
}

export default function ImageGrid({ images }: { images: ImageItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-10 px-6">
      {images.map((img) => (
        <div key={img.id} className="overflow-hidden rounded-lg shadow hover:shadow-xl transition-all duration-300">
          <div className="relative group">
            <Image
              src={img.image}
              alt="Interior"
              width={400}
              height={300}
              className="rounded-md w-full h-auto group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
