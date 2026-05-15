"use client";

import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PlaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-blue shrink-0"
  >
    <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7h-4l-2 2H2l2-4-2-4h3l2 2h4l-2-7h3z" />
  </svg>
);

const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-blue shrink-0"
  >
    <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
    <path d="M5 11h15M9 11V6" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M9 17h6" />
  </svg>
);

const TrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-blue shrink-0"
  >
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <path d="M4 11h16M12 3v8M6 19l-2 3M18 19l2 3M7.5 19h9" />
    <circle cx="8.5" cy="15.5" r="1" />
    <circle cx="15.5" cy="15.5" r="1" />
  </svg>
);

const ICONS = [PlaneIcon, CarIcon, TrainIcon];

export const RaggiungerciCilento = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];

  const mainHeading = innerBlocks.find((b) => b.name === "core/heading");
  const transportSections = innerBlocks.filter((b) => b.name === "core/group");

  useGSAP(
    () => {
      const rows = container.current?.querySelectorAll(".transport-row");
      if (!rows?.length) return;

      gsap.from(rows, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative z-20 w-full bg-white">
      <div className="px-5 lg:px-24 xl:px-32 py-16 lg:py-32">
        {mainHeading && (
          <Heading
            level={mainHeading.attributes?.level}
            content={mainHeading.attributes?.content}
            className="font-montecatini font-normal text-5xl lg:text-6xl xl:text-7xl text-blue mb-16"
          />
        )}

        <div className="flex flex-col">
          {transportSections.map((section, i) => {
            const sectionInner = section.innerBlocks || [];
            const Icon = ICONS[i];

            /* split innerBlocks into: title heading (h3) and the rest */
            const titleBlock = sectionInner.find(
              (b) => b.name === "core/heading" && b.attributes?.level <= 3,
            );
            const contentBlocks = sectionInner.filter(
              (b) => b !== titleBlock,
            );

            return (
              <div
                key={i}
                className="transport-row border-t border-gray/20 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-20 items-start"
              >
                {/* Left: icon + transport label */}
                <div className="flex items-start gap-5">
                  {Icon && <Icon />}
                  {titleBlock && (
                    <Heading
                      level={titleBlock.attributes?.level}
                      content={titleBlock.attributes?.content}
                      className="font-montecatini font-normal text-3xl lg:text-4xl text-blue leading-tight"
                    />
                  )}
                </div>

                {/* Right: sub-headings + paragraphs */}
                <div className="flex flex-col gap-5">
                  {contentBlocks.map((block, j) => {
                    if (block.name === "core/heading") {
                      return (
                        <Heading
                          key={j}
                          level={block.attributes?.level}
                          content={block.attributes?.content}
                          className="font-nunito font-semibold text-sm uppercase tracking-widest text-blue/70 mt-4 first:mt-0"
                        />
                      );
                    }
                    if (block.name === "core/paragraph") {
                      return (
                        <div key={j} className="pl-5 border-l border-gray/20">
                          <Paragraph
                            content={block.attributes?.content}
                            className="font-nunito font-light text-text text-sm lg:text-base leading-relaxed"
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}

          {/* Bottom border line */}
          <div className="border-t border-gray/20" />
        </div>
      </div>
    </section>
  );
};
