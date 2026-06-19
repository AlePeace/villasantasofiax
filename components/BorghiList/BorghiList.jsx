"use client";

import { useRef } from "react";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const BorghiList = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const borghi = innerBlocks.filter((b) => b.name === "core/group");

  useGSAP(
    (self) => {
      const splits = [];
      let cancelled = false;

      const build = self.add(null, () => {
        if (cancelled || !container.current) return;
        const cards = container.current.querySelectorAll(".cartolina");

        if (cards?.length) {
          gsap.from(cards, {
            y: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: container.current, start: "top 78%" },
          });
        }

        cards?.forEach((card) => {
          const headingEl = card.querySelector(".cartolina-heading");
          const metas = card.querySelectorAll(".cartolina-meta");
          const desc = card.querySelector(".cartolina-desc");

          if (headingEl) {
            headingEl.style.visibility = "hidden";
            const split = new SplitText(headingEl, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 100,
              duration: 0.85,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 75%" },
            });
            headingEl.style.visibility = "";
          }

          const textEls = [...Array.from(metas), desc].filter(Boolean);
          if (textEls.length) {
            gsap.from(textEls, {
              y: 16,
              opacity: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 72%" },
            });
          }
        });

        ScrollTrigger.refresh();
      });

      document.fonts.ready.then(() => {
        if (!cancelled) build();
      });

      return () => {
        cancelled = true;
        splits.forEach((s) => s.revert());
      };
    },
    { scope: container },
  );

  const rotations = ["-rotate-[2deg]", "rotate-[1.5deg]"];

  return (
    <section
      ref={container}
      className="relative z-20 w-full py-24 lg:py-36"
      style={{ background: "#f3eadf" }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-12 px-5 max-w-7xl mx-auto">
        {borghi.map((borgo, i) => {
          const image = borgo.innerBlocks?.find((b) => b.name === "core/image");
          const heading = borgo.innerBlocks?.find((b) => b.name === "core/heading");
          const paragraphs = borgo.innerBlocks?.filter((b) => b.name === "core/paragraph") || [];
          const distance = paragraphs[0];
          const description = paragraphs[1];

          return (
            <div
              key={i}
              className={`cartolina relative bg-white w-full max-w-[480px] lg:max-w-none lg:w-[50%] shadow-[0_30px_80px_rgba(0,0,0,0.18)] ${rotations[i] ?? ""}`}
            >
              <div className="p-3 pb-0">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {image && (
                    <Image
                      src={image.attributes?.url}
                      alt={image.attributes?.alt || ""}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  )}

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0) 100%)",
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 flex flex-col gap-2">
                    <span className="cartolina-meta font-nunito text-white/55 text-[10px] tracking-[0.22em] uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {heading && (
                      <Heading
                        level={heading.attributes?.level}
                        content={heading.attributes?.content}
                        className="cartolina-heading font-montecatini font-normal text-3xl lg:text-4xl text-white leading-tight"
                      />
                    )}

                    {distance && (
                      <p className="cartolina-meta font-nunito text-white/60 text-[10px] tracking-[0.18em] uppercase">
                        {distance.attributes?.content?.replace(/<[^>]*>/g, "")}
                      </p>
                    )}

                    {description && (
                      <div className="cartolina-desc">
                        <Paragraph
                          content={description.attributes?.content}
                          className="font-nunito font-light text-white/80 text-sm leading-relaxed"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between px-4 py-4 overflow-hidden">
                <span className="font-nunito text-[9px] text-gray/35 tracking-[0.25em] uppercase">
                  Cilento · Italia
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/deco-cartolina.svg"
                  alt=""
                  aria-hidden="true"
                  width={72}
                  height={58}
                  style={{ filter: "invert(1) opacity(0.09)" }}
                  className="pointer-events-none select-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
