"use client";

import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const MappaCilento = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const paragraphBlock = innerBlocks.find((b) => b.name === "core/paragraph");

  useGSAP(
    () => {
      const heading = container.current?.querySelector(".mappa-heading");
      const para = container.current?.querySelector(".mappa-para");
      const map = container.current?.querySelector(".mappa-iframe");

      if (heading) {
        gsap.from(heading, {
          x: -30,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          },
        });
      }

      if (para) {
        gsap.from(para, {
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: para,
            start: "top 85%",
          },
        });
      }

      if (map) {
        gsap.from(map, {
          y: 40,
          opacity: 0,
          scale: 0.98,
          transformOrigin: "center center",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: map,
            start: "top 80%",
          },
        });
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full"
      style={{ background: "linear-gradient(to bottom, #f3eadf, #ffffff)" }}
    >
      <div className="px-5 lg:px-24 xl:px-32 py-16 lg:py-32">
        {headingBlock && (
          <Heading
            level={headingBlock.attributes?.level}
            content={headingBlock.attributes?.content}
            className="mappa-heading font-montecatini font-normal text-5xl lg:text-6xl xl:text-7xl text-blue mb-4"
          />
        )}
        {paragraphBlock && (
          <div className="mappa-para mb-12 pl-7 border-l border-gray/30 max-w-2xl">
            <Paragraph
              content={paragraphBlock.attributes?.content}
              className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
            />
          </div>
        )}

        <iframe
          className="mappa-iframe w-full h-[300px] lg:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.966633315136!2d15.185067412364965!3d40.14302697213228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133eafba7cd699c9%3A0xca6845cadbc0aa6a!2sVilla%20Santa%20Sofia%20-%20Dimora%20Mediterranea%20con%20Piscina%20Idromassaggio%20e%20Solarium!5e0!3m2!1sit!2sit!4v1778581272918!5m2!1sit!2sit"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};
