"use client";

import { useRef } from "react";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const AperitivoPool = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];

  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const paragraph = innerBlocks.find((b) => b.name === "core/paragraph");
  const image = innerBlocks.find((b) => b.name === "core/image");

  useGSAP(
    () => {
      const img = container.current?.querySelector(".aperitivo-img");
      const heading = container.current?.querySelector(".aperitivo-heading");
      const para = container.current?.querySelector(".aperitivo-para");

      if (img) {
        gsap.from(img, {
          scale: 1.06,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top 65%" },
      });

      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 1, ease: "power2.out" });
      if (para) tl.from(para, { y: 20, opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.5");
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden pb-16 lg:pb-28"
      style={{ background: "linear-gradient(to bottom, #f3eadf, #ffffff)" }}
    >
      {/* Full-width image */}
      {image && (
        <div className="aperitivo-img relative w-full h-[55vh] lg:h-[70vh] overflow-hidden">
          <Image
            src={image.attributes?.url}
            alt={image.attributes?.alt || "Aperitivo Cilentano"}
            fill
            className="object-cover object-center"
            quality={100}
          />
          {/* Gradient overlay bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </div>
      )}

      {/* Content below image */}
      <div className="px-5 lg:px-24 xl:px-32 py-24 lg:py-40">
        <div className="max-w-3xl">
          {headingBlock && (
            <Heading
              level={headingBlock.attributes?.level}
              content={headingBlock.attributes?.content}
              className="aperitivo-heading font-montecatini font-normal text-4xl lg:text-5xl xl:text-6xl text-blue mb-8 leading-tight"
            />
          )}
          {paragraph && (
            <div className="aperitivo-para pl-7 border-l border-gray/30">
              <Paragraph
                content={paragraph.attributes?.content}
                className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
