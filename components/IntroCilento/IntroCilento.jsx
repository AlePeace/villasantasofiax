"use client";

import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const IntroCilento = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const paragraphs = innerBlocks.filter((b) => b.name === "core/paragraph");
  const headingBlock = innerBlocks.find((b) => b.name === "core/heading");
  const images = innerBlocks.filter((b) => b.name === "core/image");
  const img0 = images[0];

  useGSAP(
    () => {
      const heading = container.current?.querySelector(".intro-heading");
      const lines = container.current?.querySelectorAll(".intro-line");
      const paras = container.current?.querySelectorAll(".intro-para");

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

      if (lines?.length) {
        gsap.from(lines, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        });
      }

      if (paras?.length) {
        gsap.from(paras, {
          y: 25,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        });
      }

      const img = container.current?.querySelector(".intro-img");
      if (img) {
        gsap.from(img, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          },
        });
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-20 w-full overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f3eadf)" }}
    >
      {/* Watermark SVG logo */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-0 opacity-[0.04] translate-x-1/4">
        <svg
          width="600"
          height="100%"
          viewBox="0 0 820 1797"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-auto"
        >
          <path
            d="M565.682 664.396C489.165 675.116 457.888 801.837 457.888 738.583C457.888 557.836 790.8 659.355 790.8 409.178C790.8 328.53 737.038 239.86 618.169 239.86H589.308C535.411 239.86 487.555 276.563 470.909 330.802L410.434 652.54L349.96 330.802C333.247 276.563 285.458 239.86 231.561 239.86H202.699C83.7637 239.86 30.001 328.459 30.001 409.178C30.001 659.355 362.914 557.907 362.914 738.583C362.914 801.766 331.435 676.323 255.12 664.396C52.5531 632.591 35.3034 872.404 35.3034 872.404H241.427C323.917 872.404 380.499 866.654 410.367 811.705C440.235 866.583 496.884 872.404 579.307 872.404H785.431C785.431 872.404 771.604 635.502 565.615 664.325L565.682 664.396Z"
            fill="#1f5189"
          />
          <path
            d="M410.4 268.199C410.4 181.184 366.254 134.099 284.863 134.099C366.321 134.099 410.4 86.9427 410.4 0C410.4 87.0142 454.545 134.099 535.937 134.099C454.478 134.099 410.4 181.256 410.4 268.199Z"
            fill="#1f5189"
          />
          <path
            d="M255.118 1132.21C331.634 1121.49 362.912 994.767 362.912 1058.02C362.912 1238.77 29.9994 1137.25 29.9994 1387.43C29.9994 1468.07 83.7621 1556.74 202.631 1556.74L231.492 1556.74C285.389 1556.74 333.245 1520.04 349.891 1465.8L410.366 1144.06L470.84 1465.8C487.553 1520.04 535.342 1556.74 589.239 1556.74L618.1 1556.74C737.036 1556.74 790.799 1468.15 790.799 1387.43C790.799 1137.25 457.886 1238.7 457.886 1058.02C457.886 994.838 489.365 1120.28 565.68 1132.21C768.247 1164.01 785.496 924.2 785.496 924.2L579.372 924.2C496.883 924.2 440.301 929.951 410.433 984.899C380.565 930.022 323.916 924.2 241.493 924.2L35.3689 924.2C35.3689 924.2 49.1955 1161.1 255.185 1132.28L255.118 1132.21Z"
            fill="#1f5189"
          />
          <path
            d="M410.399 1528.41C410.399 1615.42 454.544 1662.51 535.936 1662.51C454.477 1662.51 410.399 1709.66 410.399 1796.61C410.399 1709.59 366.253 1662.51 284.862 1662.51C366.32 1662.51 410.399 1615.35 410.399 1528.41Z"
            fill="#1f5189"
          />
        </svg>
      </div>

      <div className="px-5 lg:px-24 xl:px-32 py-16 lg:py-32 relative z-10">
        {headingBlock && (
          <Heading
            level={headingBlock.attributes?.level}
            content={headingBlock.attributes?.content}
            className="intro-heading font-montecatini font-normal text-5xl lg:text-6xl xl:text-7xl text-blue mb-12"
          />
        )}

        <div className="flex flex-col gap-8 max-w-3xl">
          {paragraphs.map((p, i) => (
            <div key={i} className="flex gap-0">
              <div className="intro-line w-px bg-gray/30 shrink-0 mr-7" />
              <div className="intro-para">
                <Paragraph
                  content={p.attributes?.content}
                  className="font-nunito font-light text-text text-base lg:text-lg leading-relaxed"
                />
              </div>
            </div>
          ))}

          {img0 && (
            <div className="intro-img w-full pt-4">
              <Image
                src={img0.attributes?.url}
                alt={img0.attributes?.alt || ""}
                width={img0.attributes?.width}
                height={img0.attributes?.height}
                className="w-full object-cover"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
