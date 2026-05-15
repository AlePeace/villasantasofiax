"use client";

import { useRef } from "react";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const DescriptionCamere = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const paragraphBlock = innerBlocks.find((b) => b.name === "core/paragraph");

  useGSAP(
    () => {
      const border = container.current?.querySelector(".desc-border");
      const para = container.current?.querySelector(".desc-para");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });

      if (border) tl.from(border, { y: 20, opacity: 0, duration: 0.9, ease: "power2.out" });
      if (para) tl.from(para, { y: 15, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");
    },
    { scope: container },
  );

  return (
    <section ref={container} className="py-10 lg:py-40 relative z-30">
      <div className="px-5 max-w-7xl mx-auto">
        <div className="desc-border pl-7 border-l border-gray/30">
          <div className="desc-para">
            <Paragraph
              content={paragraphBlock?.attributes?.content}
              className="font-nunito font-light text-gray text-base lg:text-lg xl:text-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
