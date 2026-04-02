"use client";
// Mappa tema per camera — chiave = classe CSS assegnata al gruppo in WordPress

import { useRef } from "react";
import { Heading } from "components/Heading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

// es. blocco gruppo con classe "positano" → usa il tema "positano"
// Le classi Tailwind devono essere stringhe complete per essere rilevate dal JIT
const CAMERA_THEMES = {
  positano: {
    bg: "bg-[#C53452]",
    text: "text-[#C53452]",
  },
  leucosya: {
    bg: "bg-[#57A691]",
    text: "text-[#57A691]",
  },
  camerota: {
    bg: "bg-[#EFAC53]",
    text: "text-[#EFAC53]",
  },
  acciaroli: {
    bg: "bg-[#1F5189]",
    text: "text-[#1F5189]",
  },
  velia: {
    bg: "bg-[#A0B898]",
    text: "text-[#A0B898]",
  },
  // Aggiungi altre camere seguendo lo stesso schema
  pioppi: {
    bg: "bg-[#FFAB67]",
    text: "text-[#FFAB67]",
  },
  palinuro: {
    bg: "bg-[#00ABD5]",
    text: "text-[#00ABD5]",
  },
  default: {
    bg: "bg-[#6C6C6C]",
    text: "text-white",
  },
};

const getTheme = (group) => {
  // metadata.name identifica il componente (es. "SummaryCamere"), non il tema
  // il tema camera (es. "positano") è sempre nella className
  const key = group?.attributes?.className || "";
  return CAMERA_THEMES[key] ?? CAMERA_THEMES.default;
};

export const SummaryCamere = ({ blocks }) => {
  const swiperRef = useRef(null);
  const theme = getTheme(blocks);
  const { innerBlocks = [] } = blocks;

  const imageBlocks = innerBlocks.filter((b) => b.name === "core/image");
  const headingBlocks = innerBlocks.filter((b) => b.name === "core/heading");

  const images = imageBlocks.map((b) => b.attributes).filter(Boolean);
  const title = headingBlocks[0]?.attributes || null;
  const subtitle = headingBlocks[1]?.attributes || null;

  return (
    <section className="relative">
      <div className="absolute w-full h-full inset-0">
        <svg
          width="803"
          height="885"
          viewBox="0 0 803 885"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M565.394 673.661C484.634 684.53 451.621 813.019 451.621 748.883C451.621 565.615 803 668.55 803 414.884C803 333.112 746.255 243.205 620.793 243.205H590.331C533.444 243.205 482.934 280.42 465.365 335.415L401.535 661.64L337.706 335.415C320.066 280.42 269.627 243.205 212.74 243.205H182.278C56.7449 243.205 0 333.04 0 414.884C0 668.55 351.379 565.687 351.379 748.883C351.379 812.947 318.154 685.754 237.606 673.661C23.8031 641.413 5.59656 884.57 5.59656 884.57H223.154C310.219 884.57 369.94 878.739 401.465 823.025C432.99 878.667 492.781 884.57 579.775 884.57H797.333C797.333 884.57 782.739 644.364 565.323 673.589L565.394 673.661Z"
            fill="#EE954C"
            fillOpacity="0.03"
          />
          <path
            d="M401.5 271.939C401.5 183.711 354.906 135.969 269 135.969C354.977 135.969 401.5 88.1551 401.5 0C401.5 88.2276 448.094 135.969 534 135.969C448.023 135.969 401.5 183.783 401.5 271.939Z"
            fill="#EE954C"
            fillOpacity="0.03"
          />
          <path
            d="M565.394 673.661C484.634 684.53 451.621 813.019 451.621 748.883C451.621 565.615 803 668.55 803 414.884C803 333.112 746.255 243.205 620.793 243.205H590.331C533.444 243.205 482.934 280.42 465.365 335.415L401.535 661.64L337.706 335.415C320.066 280.42 269.627 243.205 212.74 243.205H182.278C56.7449 243.205 0 333.04 0 414.884C0 668.55 351.379 565.687 351.379 748.883C351.379 812.947 318.154 685.754 237.606 673.661C23.8031 641.413 5.59656 884.57 5.59656 884.57H223.154C310.219 884.57 369.94 878.739 401.465 823.025C432.99 878.667 492.781 884.57 579.775 884.57H797.333C797.333 884.57 782.739 644.364 565.323 673.589L565.394 673.661Z"
            fill="#EE954C"
            fillOpacity="0.03"
          />
          <path
            d="M401.5 271.939C401.5 183.711 354.906 135.969 269 135.969C354.977 135.969 401.5 88.1551 401.5 0C401.5 88.2276 448.094 135.969 534 135.969C448.023 135.969 401.5 183.783 401.5 271.939Z"
            fill="#EE954C"
            fillOpacity="0.03"
          />
        </svg>
      </div>
      <div className="pb-10 px-5 max-w-7xl mx-auto relative">
        {images.length > 0 && (
          <div className="relative w-full">
            <Swiper
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              modules={[Navigation]}
              loop={images.length > 1}
              className="w-full h-[70vh]"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img.url}
                    alt={img.alt || "Image"}
                    className="object-cover w-full h-full pointer-events-none will-change-transform"
                    width={img.width}
                    height={img.height}
                    priority={i === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {images.length > 1 && (
              <>
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F0E8]/70 hover:bg-[#F5F0E8] transition-colors"
                  aria-label="Slide precedente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B5E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F0E8]/70 hover:bg-[#F5F0E8] transition-colors"
                  aria-label="Slide successivo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B5E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
        <div className="pt-5 space-y-5">
          {title && (
            <Heading
              level={title.level}
              content={title.content}
              className={theme.text + " font-nunito font-light text-base"}
            />
          )}
          {subtitle && (
            <Heading
              level={subtitle.level}
              content={subtitle.content}
              className={
                theme.text +
                " font-montecatini font-normal text-5xl lg:text-7xl"
              }
            />
          )}
        </div>
      </div>
    </section>
  );
};
