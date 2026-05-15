"use client";

import { useRef } from "react";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const IntroMare = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const paragraphs = innerBlocks.filter((b) => b.name === "core/paragraph");

  useGSAP(
    () => {
      const paras = container.current?.querySelectorAll(".intro-mare-para");

      if (paras?.length) {
        gsap.from(paras, {
          y: 25,
          opacity: 0,
          duration: 1,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        });
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden py-20 lg:py-32"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f3eadf)" }}
    >
      <div className="px-5 lg:px-24 xl:px-32 max-w-4xl">
        {paragraphs.map((p, i) => (
          <div key={i} className="intro-mare-para pl-7 border-l border-gray/30 mb-10 last:mb-0">
            <Paragraph
              content={p.attributes?.content}
              className="font-nunito font-light text-text text-base lg:text-lg xl:text-xl leading-relaxed"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
