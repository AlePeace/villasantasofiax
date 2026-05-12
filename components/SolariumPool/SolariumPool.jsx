"use client";

import { useRef } from "react";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const SolariumPool = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];

  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const paragraphs = innerBlocks.filter((b) => b.name === "core/paragraph");
  const image = innerBlocks.find((b) => b.name === "core/image");

  useGSAP(
    () => {
      const img = container.current?.querySelector(".solarium-img");
      const heading = container.current?.querySelector(".solarium-heading");
      const paras = container.current?.querySelectorAll(".solarium-para");

      if (img) {
        gsap.from(img, {
          clipPath: "inset(0 0 0 100%)",
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top 70%" },
      });

      if (heading) tl.from(heading, { x: 40, opacity: 0, duration: 1, ease: "power2.out" }, 0.3);
      if (paras?.length) {
        tl.from(paras, {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }, "-=0.5");
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden pb-16 lg:pb-28"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f3eadf)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-stretch min-h-[70vh]">
        {/* Left: tall image */}
        {image && (
          <div className="solarium-img relative w-full min-h-[50vh] lg:min-h-full overflow-hidden">
            <Image
              src={image.attributes?.url}
              alt={image.attributes?.alt || "Solarium"}
              fill
              className="object-cover object-center"
              quality={100}
            />
          </div>
        )}

        {/* Right: content */}
        <div className="flex flex-col justify-center gap-8 px-5 lg:px-14 xl:px-20 py-16 lg:py-24">
          {headingBlock && (
            <Heading
              level={headingBlock.attributes?.level}
              content={headingBlock.attributes?.content}
              className="solarium-heading font-montecatini font-normal text-4xl lg:text-5xl text-blue leading-tight"
            />
          )}
          {paragraphs.map((p, i) => (
            <div key={i} className="solarium-para pl-7 border-l border-gray/30">
              <Paragraph
                content={p.attributes?.content}
                className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
