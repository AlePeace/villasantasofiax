"use client";

import { useRef } from "react";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Buttons } from "components/Buttons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const IntroPool = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];

  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const paragraph = innerBlocks.find((b) => b.name === "core/paragraph");
  const buttons = innerBlocks.find((b) => b.name === "core/buttons");
  const image = innerBlocks.find((b) => b.name === "core/image");

  useGSAP(
    () => {
      const heading = container.current?.querySelector(".intro-pool-heading");
      const para = container.current?.querySelector(".intro-pool-para");
      const btn = container.current?.querySelector(".intro-pool-btn");
      const img = container.current?.querySelector(".intro-pool-img");
      const accent = container.current?.querySelector(".intro-pool-accent");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      if (heading)
        tl.from(heading, {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      if (para)
        tl.from(
          para,
          { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        );
      if (btn)
        tl.from(
          btn,
          { y: 15, opacity: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4",
        );

      if (accent) {
        gsap.from(accent, {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }

      if (img) {
        gsap.from(img, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden bg-white"
    >
      {/* Peach accent block */}
      <div className="intro-pool-accent absolute right-0 top-1/4 h-1/2 w-1/3 lg:w-1/4 bg-peach z-0 pointer-events-none" />

      <div className="px-5 lg:px-24 xl:px-32 py-16 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: content */}
          <div className="flex flex-col gap-8">
            {headingBlock && (
              <Heading
                level={headingBlock.attributes?.level}
                content={headingBlock.attributes?.content}
                className="intro-pool-heading font-montecatini font-normal text-4xl lg:text-5xl xl:text-6xl text-blue leading-tight"
              />
            )}
            {paragraph && (
              <div className="intro-pool-para pl-7 border-l border-gray/30">
                <Paragraph
                  content={paragraph.attributes?.content}
                  className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
                />
              </div>
            )}
            {buttons?.innerBlocks?.length > 0 && (
              <div className="intro-pool-btn">
                <Buttons
                  blocks={buttons.innerBlocks}
                  variant="CilentoHome"
                  target="_blank"
                />
              </div>
            )}
          </div>

          {/* Right: image */}
          {image && (
            <div className="intro-pool-img relative w-full overflow-hidden">
              <Image
                src={image.attributes?.url}
                alt={image.attributes?.alt || "Pool & Relax"}
                width={image.attributes?.width}
                height={image.attributes?.height}
                className="w-full object-cover aspect-[4/5] lg:aspect-auto lg:h-[70vh]"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
