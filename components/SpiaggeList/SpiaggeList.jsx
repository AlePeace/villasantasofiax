"use client";

import { useRef } from "react";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Buttons } from "components/Buttons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const SpiaggeList = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const beaches = innerBlocks.filter((b) => b.name === "core/group");

  useGSAP(
    () => {
      const splits = [];
      const items = container.current?.querySelectorAll(".spiaggia-item");

      items?.forEach((item, i) => {
        const isReversed = i % 2 !== 0;
        const img = item.querySelector(".spiaggia-img");
        const headingEl = item.querySelector(".spiaggia-heading");
        const metas = item.querySelectorAll(".spiaggia-meta");
        const desc = item.querySelector(".spiaggia-desc");
        const btn = item.querySelector(".spiaggia-btn");

        if (img) {
          gsap.from(img, {
            clipPath: isReversed ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: item, start: "top 82%" },
          });
        }

        if (headingEl) {
          const split = new SplitText(headingEl, { type: "lines", mask: "lines" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 100,
            duration: 0.8,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: headingEl, start: "top 85%" },
          });
        }

        const textEls = [...Array.from(metas), desc, btn].filter(Boolean);
        if (textEls.length) {
          gsap.from(textEls, {
            y: 22,
            opacity: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          });
        }
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden py-20 lg:py-32"
      style={{ background: "linear-gradient(to bottom, #f3eadf, #ffffff)" }}
    >
      <div className="max-w-7xl mx-auto">
        {beaches.map((beach, i) => {
          const isReversed = i % 2 !== 0;
          const image = beach.innerBlocks?.find((b) => b.name === "core/image");
          const heading = beach.innerBlocks?.find((b) => b.name === "core/heading");
          const paragraphs = beach.innerBlocks?.filter((b) => b.name === "core/paragraph") || [];
          const distance = paragraphs[0];
          const description = paragraphs[1];
          const button = beach.innerBlocks?.find(
            (b) =>
              b.name === "core/buttons" &&
              b.innerBlocks?.some(
                (btn) =>
                  btn.name === "core/button" &&
                  (btn.attributes?.url || btn.attributes?.content),
              ),
          );

          return (
            <div
              key={i}
              className={`spiaggia-item flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch mb-16 lg:mb-28 last:mb-0`}
            >
              {image && (
                <div className="spiaggia-img relative w-full lg:w-[52%] overflow-hidden min-h-[260px] lg:min-h-[480px]">
                  <Image
                    src={image.attributes?.url}
                    alt={image.attributes?.alt || ""}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                </div>
              )}

              <div
                className={`relative flex flex-col justify-center gap-5 px-8 py-12 lg:py-16 ${
                  image
                    ? `lg:w-[48%] ${isReversed ? "lg:pr-16 lg:pl-12" : "lg:pl-16 lg:pr-12"}`
                    : "w-full max-w-4xl mx-auto"
                }`}
              >
                <span className="absolute top-4 right-6 font-montecatini text-[100px] lg:text-[180px] text-blue/[0.04] font-normal select-none pointer-events-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="spiaggia-meta font-nunito text-lightblue text-xs tracking-[0.2em] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {heading && (
                  <Heading
                    level={heading.attributes?.level}
                    content={heading.attributes?.content}
                    className="spiaggia-heading font-montecatini font-normal text-3xl lg:text-4xl xl:text-5xl text-blue leading-tight"
                  />
                )}

                {distance && (
                  <p className="spiaggia-meta font-nunito text-xs text-gray/60 tracking-[0.18em] uppercase">
                    {distance.attributes?.content?.replace(/<[^>]*>/g, "")}
                  </p>
                )}

                {description && (
                  <div className="spiaggia-desc pl-5 border-l border-gray/25">
                    <Paragraph
                      content={description.attributes?.content}
                      className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
                    />
                  </div>
                )}

                <div className="spiaggia-btn">
                  {button && (
                    <Buttons blocks={button.innerBlocks} variant="SpiaggeList" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
