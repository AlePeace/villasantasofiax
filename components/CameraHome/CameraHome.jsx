"use client";

import { useRef } from "react";
import { Buttons } from "components/Buttons";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const CameraHome = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const paragraphBlock = innerBlocks.find((b) => b.name === "core/paragraph");
  const button = innerBlocks.find((b) => b.name === "core/buttons");
  const img = innerBlocks.filter((b) => b.name === "core/image");
  const imageRight = img[1];
  const imgLeft = img[0];

  useGSAP(
    () => {
      const para = container.current?.querySelector(".camera-para");
      const btn = container.current?.querySelector(".camera-btn");
      const imgL = container.current?.querySelector(".camera-img-left");
      const imgR = container.current?.querySelector(".camera-img-right");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });

      if (para) tl.from(para, { y: 25, opacity: 0, duration: 0.9, ease: "power2.out" });
      if (btn) tl.from(btn, { y: 15, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");

      if (imgL) {
        gsap.from(imgL, {
          x: -40,
          opacity: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }

      if (imgR) {
        gsap.from(imgR, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      }

    },
    { scope: container },
  );

  return (
    <section ref={container} className="w-full px-5 lg:px-10 overflow-hidden">
      <div className="pt-10 xl:pt-20 pl-5 lg:pl-40 w-full lg:w-1/2 xl:w-1/3">
        {paragraphBlock && (
          <div className="camera-para pl-7 border-l border-gray/30">
            <Paragraph
              content={paragraphBlock?.attributes?.content}
              className="font-nunito font-light text-gray text-base lg:text-lg xl:text-xl"
            />
          </div>
        )}
      </div>
      <div className="py-10 lg:py-36 px-5 lg:px-10 xl:px-20 relative flex flex-col gap-20 justify-center lg:justify-end items-end">
        {imgLeft && (
          <div className="camera-img-left hidden lg:block absolute left-40 bottom-40 lg:w-[15%]">
            <Image
              src={imgLeft?.attributes?.url}
              alt={imgLeft?.attributes?.alt || "Camera Home"}
              width={imgLeft?.attributes?.width}
              height={imgLeft?.attributes?.height}
              className={`object-cover w-[${imgLeft?.attributes?.width}px] h-[${imgLeft?.attributes?.height}px] aspect-[${imgLeft?.attributes?.width}/${imgLeft?.attributes?.height}] pointer-events-none will-change-transform relative z-10`}
              priority
            />
          </div>
        )}
        {button && (
          <div className="camera-btn w-full flex justify-center relative z-20">
            <Buttons blocks={button.innerBlocks} variant="CameraHome" />
          </div>
        )}
        <div className="camera-img-right lg:w-[35%] xl:w-[40%] z-0 lg:-mt-[15%] xl:-mt-[10%]">
          {imageRight && (
            <div className="relative z-10">
              <Image
                src={imageRight?.attributes?.url}
                alt={imageRight?.attributes?.alt || "Camera Home"}
                width={imageRight?.attributes?.width}
                height={imageRight?.attributes?.height}
                className={`object-cover w-[${imageRight?.attributes?.width}px] h-[${imageRight?.attributes?.height}px] aspect-[${imageRight?.attributes?.width}/${imageRight?.attributes?.height}] pointer-events-none will-change-transform relative z-10`}
                priority
              />
              <div className="absolute -inset-10 bg-peach h-[100%]"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
