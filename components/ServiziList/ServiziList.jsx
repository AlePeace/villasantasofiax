"use client";

import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const ServiziList = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const servizi = innerBlocks.filter((b) => b.name === "core/group");

  useGSAP(
    () => {
      const splits = [];
      const rows = container.current?.querySelectorAll(".servizio-row");

      rows?.forEach((row) => {
        const number = row.querySelector(".servizio-number");
        const headingEl = row.querySelector(".servizio-heading");
        const text = row.querySelector(".servizio-text");

        if (headingEl) {
          const split = new SplitText(headingEl, { type: "lines", mask: "lines" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 100,
            duration: 0.9,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          });
        }

        const fadeEls = [number, text].filter(Boolean);
        if (fadeEls.length) {
          gsap.from(fadeEls, {
            y: 16,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 76%" },
          });
        }
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative z-20 w-full bg-white py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {servizi.map((servizio, i) => {
          const heading = servizio.innerBlocks?.find((b) => b.name === "core/heading");
          const paragraph = servizio.innerBlocks?.find((b) => b.name === "core/paragraph");

          return (
            <div
              key={i}
              className="servizio-row flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-16 py-12 lg:py-16 border-b border-blue/10 last:border-b-0"
            >
              <div className="servizio-number flex-shrink-0 w-12">
                <span className="font-nunito text-[11px] tracking-[0.3em] uppercase text-blue/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {heading && (
                  <Heading
                    level={heading.attributes?.level}
                    content={heading.attributes?.content}
                    className="servizio-heading font-montecatini font-normal text-2xl lg:text-3xl text-blue leading-snug"
                  />
                )}
                {paragraph && (
                  <div className="servizio-text">
                    <Paragraph
                      content={paragraph.attributes?.content}
                      className="font-nunito font-light text-blue/65 text-base leading-relaxed"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
