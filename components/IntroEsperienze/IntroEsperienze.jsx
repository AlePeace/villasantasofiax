"use client";

import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const IntroEsperienze = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const paragraphBlock = innerBlocks.find((b) => b.name === "core/paragraph");

  useGSAP(
    () => {
      const heading = container.current?.querySelector(".intro-esp-heading");
      const line = container.current?.querySelector(".intro-esp-line");
      const para = container.current?.querySelector(".intro-esp-para");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });

      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 1, ease: "power2.out" });
      if (line) tl.from(line, { scaleX: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
      if (para) tl.from(para, { y: 20, opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.4");
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden py-20 lg:py-32"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f3eadf)" }}
    >
      <div className="px-5 max-w-3xl mx-auto text-center">
        {headingBlock && (
          <Heading
            level={headingBlock.attributes?.level}
            content={headingBlock.attributes?.content}
            className="intro-esp-heading font-montecatini font-normal text-5xl lg:text-7xl text-blue tracking-wide"
          />
        )}

        <div
          className="intro-esp-line mx-auto mt-6 mb-8 h-px w-16 bg-gray/30"
          style={{ transformOrigin: "left center" }}
        />

        {paragraphBlock && (
          <Paragraph
            content={paragraphBlock.attributes?.content}
            className="intro-esp-para font-nunito font-light text-text text-base lg:text-xl leading-relaxed"
          />
        )}
      </div>
    </section>
  );
};
