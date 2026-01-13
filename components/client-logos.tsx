"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import Image from "next/image";

const clients = [
  { name: "Greenply", logo: "/about_img/Greenply_logo.png" },
    { name: "Century", logo: "/about_img/century-logo.png" },
    { name: "Godrej", logo: "/about_img/Godrej_Logo.png" },
    { name: "Hettich", logo: "/about_img/Logo_of_Hettich.png" },
    { name: "SaintGobin", logo: "/about_img/SentGobin_logo.png" },
    { name: "Jindal", logo: "/about_img/Jindal_logo.png" },
    { name: "Centuryply", logo: "/about_img/Centuryply_logo.png" },
    { name: "Febocol", logo: "/about_img/fevicol-logo.png" },
    { name: "Pidilite", logo: "/about_img/pidilite-logo.png" },
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
