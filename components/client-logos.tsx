"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import Image from "next/image";

const clients = [
  { name: "Modern Homes Inc", logo: "/images/clients/kfc.png" },
  { name: "Corporate Spaces", logo: "/images/clients/ruby.jpg" },
  { name: "Boutique Restaurants", logo: "/images/clients/idfc.png" },
  { name: "Elite Residences", logo: "/images/clients/bigbasket.png" },
  { name: "Commercial Properties", logo: "/images/clients/saburi.png" },
  { name: "Premium Offices", logo: "/images/clients/Bosch-logo.png" },
];

export function ClientLogos() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-[var(--quill-gray)]/10 to-[var(--nobel)]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
      
        <div className="max-w-7xl pb-20 mx-auto text-center">
          <h1 className="text-5xl font-bold text-[var(--brown-bramble)] dark:text-[var(--yellow-metal)] mb-4 ">
          Trusted by Leading Brands
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're proud to work with industry leaders and innovative companies
          </p>
        </div>
    

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          freeMode={{
            enabled: true,
            momentumBounce: false,
            sticky: false,
          }}
          className="w-full"
        >
          {[...clients, ...clients].map((client, index) => (
            <SwiperSlide
              key={index}
              className="!w-auto flex items-center justify-center px-4"
            >
              <div className="h-24 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={80}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
