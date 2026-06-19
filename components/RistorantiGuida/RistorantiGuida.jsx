"use client";

import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const RistorantiGuida = ({ blocks }) => {
  const container = useRef(null);
  const innerBlocks = blocks?.innerBlocks || [];
  const titleBlock = innerBlocks.find((b) => b.name === "core/heading");
  const aree = innerBlocks.filter((b) => b.name === "core/group");

  useGSAP(
    (self) => {
      const splits = [];
      let cancelled = false;

      const build = self.add(null, () => {
        if (cancelled || !container.current) return;

        const titleEl = container.current.querySelector(".guida-title");
        if (titleEl) {
          titleEl.style.visibility = "hidden";
          const split = new SplitText(titleEl, { type: "lines", mask: "lines" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 100,
            duration: 1,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: titleEl, start: "top 80%" },
          });
          titleEl.style.visibility = "";
        }

        const sections = container.current.querySelectorAll(".area-section");
        sections?.forEach((section) => {
          const areaLabel = section.querySelector(".area-label");
          const ristoranti = section.querySelectorAll(".ristorante-row");

          if (areaLabel) {
            areaLabel.style.visibility = "hidden";
            const split = new SplitText(areaLabel, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 100,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: section, start: "top 82%" },
            });
            areaLabel.style.visibility = "";
          }

          if (ristoranti?.length) {
            gsap.from(ristoranti, {
              y: 20,
              opacity: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: section, start: "top 78%" },
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

  return (
    <section
      ref={container}
      className="relative z-20 w-full bg-white py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12">
        {titleBlock && (
          <div className="mb-16 lg:mb-24">
            <Heading
              level={titleBlock.attributes?.level}
              content={titleBlock.attributes?.content}
              className="guida-title font-montecatini font-normal text-4xl lg:text-6xl text-blue"
            />
            <div className="mt-6 h-px w-full bg-gray/15" />
          </div>
        )}

        <div className="space-y-0">
          {aree.map((area, i) => {
            const areaHeading = area.innerBlocks?.find((b) => b.name === "core/heading");
            const distancePara = area.innerBlocks?.find((b) => b.name === "core/paragraph");
            const ristoranti = area.innerBlocks?.filter((b) => b.name === "core/group") || [];

            return (
              <div
                key={i}
                className="area-section flex flex-col lg:flex-row gap-0 py-12 lg:py-16 border-t border-gray/15"
              >
                <div className="lg:w-1/4 lg:pr-12 mb-8 lg:mb-0">
                  <span className="font-nunito text-lightblue text-xs tracking-[0.2em] uppercase block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {areaHeading && (
                    <Heading
                      level={areaHeading.attributes?.level}
                      content={areaHeading.attributes?.content}
                      className="area-label font-montecatini font-normal text-2xl lg:text-3xl text-blue leading-tight"
                    />
                  )}
                  {distancePara && (
                    <p className="font-nunito text-xs text-gray/55 tracking-[0.15em] uppercase mt-3">
                      {distancePara.attributes?.content?.replace(/<[^>]*>/g, "")}
                    </p>
                  )}
                </div>

                <div className="lg:w-3/4 lg:border-l lg:border-gray/15 lg:pl-12">
                  {ristoranti.map((ristorante, j) => {
                    const nomeBlock = ristorante.innerBlocks?.find(
                      (b) => b.name === "core/heading",
                    );
                    const paragrafi =
                      ristorante.innerBlocks?.filter((b) => b.name === "core/paragraph") || [];
                    const categoria = paragrafi[0];
                    const descrizione = paragrafi[1];

                    return (
                      <div
                        key={j}
                        className="ristorante-row flex flex-col lg:flex-row lg:gap-10 py-6 border-b border-gray/10 last:border-b-0"
                      >
                        <div className="lg:w-2/5 mb-2 lg:mb-0">
                          {nomeBlock && (
                            <Heading
                              level={nomeBlock.attributes?.level}
                              content={nomeBlock.attributes?.content}
                              className="font-montecatini font-normal text-lg lg:text-xl text-blue leading-snug"
                            />
                          )}
                          {categoria && (
                            <p className="font-nunito text-[11px] text-gray/55 tracking-wide mt-1">
                              {categoria.attributes?.content?.replace(/<[^>]*>/g, "")}
                            </p>
                          )}
                        </div>

                        <div className="lg:w-3/5">
                          {descrizione && (
                            <Paragraph
                              content={descrizione.attributes?.content}
                              className="font-nunito font-light text-text text-sm lg:text-base leading-relaxed"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
