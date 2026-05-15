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

export const EsperienzeList = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const esperienze = innerBlocks.filter((b) => b.name === "core/group");

  useGSAP(
    () => {
      const splits = [];
      const items = container.current?.querySelectorAll(".esp-item");

      items?.forEach((item, i) => {
        const isReversed = i % 2 !== 0;
        const img = item.querySelector(".esp-img");
        const headingEl = item.querySelector(".esp-heading");
        const metas = item.querySelectorAll(".esp-meta");
        const desc = item.querySelector(".esp-desc");
        const info = item.querySelector(".esp-info");
        const btn = item.querySelector(".esp-btn");

        if (img) {
          gsap.from(img, {
            clipPath: isReversed ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: item, start: "top 82%" },
          });
        }

        if (headingEl) {
          const split = new SplitText(headingEl, { type: "lines", mask: "lines" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 100,
            duration: 0.9,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: headingEl, start: "top 85%" },
          });
        }

        const textEls = [...Array.from(metas), desc, info, btn].filter(Boolean);
        if (textEls.length) {
          gsap.from(textEls, {
            y: 28,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
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
      className="relative z-20 w-full overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #f3eadf, #ffffff)" }}
    >
      {esperienze.map((esperienza, i) => {
        const isReversed = i % 2 !== 0;
        const image = esperienza.innerBlocks?.find((b) => b.name === "core/image");
        const heading = esperienza.innerBlocks?.find((b) => b.name === "core/heading");
        const paragraphs =
          esperienza.innerBlocks?.filter((b) => b.name === "core/paragraph") || [];
        const distance = paragraphs[0];
        const description = paragraphs[1];
        const practicalInfo = paragraphs[2];
        const button = esperienza.innerBlocks?.find(
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
            className={`esp-item flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch min-h-[60vh] lg:min-h-[70vh] border-t border-gray/10 first:border-t-0`}
          >
            {image && (
              <div className="esp-img relative w-full lg:w-[58%] overflow-hidden min-h-[300px]">
                <Image
                  src={image.attributes?.url}
                  alt={image.attributes?.alt || ""}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            )}

            <div
              className={`relative flex flex-col justify-center gap-7 px-8 py-16 lg:py-20 ${
                image
                  ? `lg:w-[42%] ${isReversed ? "lg:pr-16 lg:pl-12" : "lg:pl-16 lg:pr-12"}`
                  : "w-full max-w-4xl mx-auto"
              }`}
            >
              <span className="absolute bottom-8 right-8 font-montecatini text-[160px] lg:text-[260px] text-blue/[0.03] font-normal select-none pointer-events-none leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="esp-meta font-nunito text-lightblue text-xs tracking-[0.2em] uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>

              {heading && (
                <Heading
                  level={heading.attributes?.level}
                  content={heading.attributes?.content}
                  className="esp-heading font-montecatini font-normal text-3xl lg:text-4xl xl:text-5xl text-blue leading-tight"
                />
              )}

              {distance && (
                <p className="esp-meta font-nunito text-xs text-gray/60 tracking-[0.18em] uppercase">
                  {distance.attributes?.content?.replace(/<[^>]*>/g, "")}
                </p>
              )}

              {description && (
                <div className="esp-desc pl-5 border-l border-gray/25">
                  <Paragraph
                    content={description.attributes?.content}
                    className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
                  />
                </div>
              )}

              {practicalInfo && (
                <p className="esp-info font-nunito text-xs text-gray/50 italic leading-relaxed">
                  {practicalInfo.attributes?.content?.replace(/<[^>]*>/g, "")}
                </p>
              )}

              <div className="esp-btn">
                {button && (
                  <Buttons blocks={button.innerBlocks} variant="SpiaggeList" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
