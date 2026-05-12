"use client";

import { useRef } from "react";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ColazionePool = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];

  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const paragraphs = innerBlocks.filter((b) => b.name === "core/paragraph");
  const image = innerBlocks.find((b) => b.name === "core/image");

  useGSAP(
    () => {
      const heading = container.current?.querySelector(".colazione-heading");
      const paras = container.current?.querySelectorAll(".colazione-para");
      const img = container.current?.querySelector(".colazione-img");
      const accent = container.current?.querySelector(".colazione-accent");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top 70%" },
      });

      if (heading) tl.from(heading, { x: -40, opacity: 0, duration: 1, ease: "power2.out" });
      if (paras?.length) {
        tl.from(paras, {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }, "-=0.5");
      }

      if (accent) {
        gsap.from(accent, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }

      if (img) {
        gsap.from(img, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative z-20 w-full overflow-hidden bg-white pb-16 lg:pb-28">
      {/* Accent line top */}
      <div className="colazione-accent absolute top-0 left-0 w-2/3 h-1 bg-lightblue z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[60vh]">
        {/* Left: content */}
        <div className="flex flex-col justify-center gap-8 px-5 lg:px-24 xl:px-32 py-24 lg:py-40">
          {headingBlock && (
            <Heading
              level={headingBlock.attributes?.level}
              content={headingBlock.attributes?.content}
              className="colazione-heading font-montecatini font-normal text-4xl lg:text-5xl xl:text-6xl text-blue leading-tight"
            />
          )}
          {paragraphs.map((p, i) => (
            <div key={i} className="colazione-para pl-7 border-l border-gray/30">
              <Paragraph
                content={p.attributes?.content}
                className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
              />
            </div>
          ))}
        </div>

        {/* Right: image */}
        {image && (
          <div className="colazione-img relative w-full min-h-[50vh] overflow-hidden">
            <Image
              src={image.attributes?.url}
              alt={image.attributes?.alt || "Colazione"}
              fill
              className="object-cover object-center"
              quality={100}
            />
          </div>
        )}
      </div>
    </section>
  );
};
