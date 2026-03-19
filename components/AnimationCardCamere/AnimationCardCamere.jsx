"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { List } from "components/List";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fallbackPalette = [
  { bg: "#C53452", text: "#FFFFFF" },
  { bg: "#57A691", text: "#FFFFFF" },
  { bg: "#EFAC53", text: "#FFFFFF" },
  { bg: "#1F5189", text: "#FFFFFF" },
  { bg: "#A0B898", text: "#FFFFFF" },
  { bg: "#FFAB67", text: "#FFFFFF" },
  { bg: "#00ABD5", text: "#FFFFFF" },
];

const fallbackPaletteRight = [
  { bg: "#FFF3E9", text: "#6C6C6C" },
  { bg: "#ECF4F2", text: "#6C6C6C" },
  { bg: "#FFF6EE", text: "#6C6C6C" },
  { bg: "#E8EDF3", text: "#6C6C6C" },
  { bg: "#E2E9DF", text: "#6C6C6C" },
  { bg: "#FFE6D1", text: "#6C6C6C" },
  { bg: "#E5F6FB", text: "#6C6C6C" },
];

const parseCardFromGroup = (group, index) => {
  const { innerBlocks = [] } = group;

  const images = innerBlocks.filter((b) => b.name === "core/image");
  const imgvert = images[0] || null;
  const imgoriz = images[1] || null;
  const headings = innerBlocks.filter((b) => b.name === "core/heading");
  const paragraph = innerBlocks.find((b) => b.name === "core/paragraph");
  const list = innerBlocks.find((b) => b.name === "core/list");

  const leftColors = fallbackPalette[index % fallbackPalette.length];
  const rightColors = fallbackPaletteRight[index % fallbackPaletteRight.length];

  const leftBg = group?.attributes?.style?.color?.background || leftColors.bg;
  const leftText = group?.attributes?.style?.color?.text || leftColors.text;

  const rightBg =
    group?.attributes?.rightStyle?.color?.background || rightColors.bg;
  const rightText =
    group?.attributes?.rightStyle?.color?.text || rightColors.text;

  const linkBlock = headings[2];
  const rawLinkHref =
    linkBlock?.attributes?.content?.match(/href="([^"]+)"/)?.[1] || null;
  const linkHref = rawLinkHref ? relativeToAbsoluteUrls(rawLinkHref) : null;

  return {
    id: group?.clientId || `card-${index}`,
    imgvert,
    imgoriz,
    title: headings[0],
    subtitle: headings[1],
    paragraph,
    link: linkBlock,
    linkHref,
    list,
    bg: leftBg,
    text: leftText,
    rightBg,
    rightText,
  };
};

export const AnimationCardCamere = ({ blocks }) => {
  const { innerBlocks = [] } = blocks;
  const cardGroups = innerBlocks.filter((b) => b.name === "core/group");
  const cards = cardGroups.map(parseCardFromGroup);

  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = panelsRef.current.filter(Boolean);
        if (!panels.length) return;

        const lefts = panels
          .map((p) => p.querySelector("[data-card-left]"))
          .filter(Boolean);

        const rightReveals = panels
          .map((p) => p.querySelector("[data-card-right-reveal]"))
          .filter(Boolean);

        if (
          lefts.length !== panels.length ||
          rightReveals.length !== panels.length
        ) {
          return;
        }

        panels.forEach((panel, i) => {
          gsap.set(panel, {
            position: "absolute",
            inset: 0,
            zIndex: panels.length - i,
            force3D: true,
          });
        });

        gsap.set(lefts, {
          xPercent: -70,
          yPercent: 100,
          rotation: -25,
          transformOrigin: "0% 100%",
          willChange: "transform",
          force3D: true,
        });

        lefts.forEach((el, idx) => {
          const isFirst = idx === 0;
          // primo left parte già a metà animazione
          gsap.set(el, {
            xPercent: isFirst ? -35 : -70,
            yPercent: isFirst ? 50 : 100,
            rotation: isFirst ? -12.5 : -25,
            transformOrigin: "0% 100%",
            willChange: "transform",
            force3D: true,
          });
        });

        rightReveals.forEach((el, i) => {
          const clip = i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)";
          gsap.set(el, {
            clipPath: clip,
            WebkitClipPath: clip,
            willChange: "clip-path",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${panels.length * 180}%`,
            pin: true,
            scrub: 1,
            snap: false,
            invalidateOnRefresh: true,
          },
        });

        // Prima left entra come da richiesta
        tl.to(lefts[0], {
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          ease: "none",
          duration: 1,
          onComplete: () =>
            gsap.set(lefts[0], { willChange: "auto", force3D: false }),
        });

        // Ogni nuova card sale sopra e si anima (senza nascondere con opacity)
        for (let i = 0; i < panels.length - 1; i++) {
          const next = i + 1;

          tl.set(panels[next], { zIndex: panels.length + next }, "+=0")
            .to(
              rightReveals[next],
              {
                clipPath: "inset(0% 0% 0% 0%)",
                WebkitClipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                duration: 1,
              },
              "<",
            )
            .to(
              lefts[next],
              {
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                ease: "none",
                duration: 1,
              },
              "<",
            );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  if (!cards.length) return null;

  const imgAttr = (img) => img?.attributes || {};

  return (
    <>
      {/* Desktop animated section */}
      <section
        ref={sectionRef}
        id="cardScrollerCamere"
        className="relative hidden lg:block h-screen overflow-hidden"
      >
        {cards.map((card, i) => {
          const img = imgAttr(card.imgvert);
          const imgoriz = imgAttr(card.imgoriz);
          return (
            <div
              key={card.id}
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
              className="card-panel overflow-hidden pointer-events-none"
            >
              <div className="h-full flex">
                <Link
                  href={card.linkHref || "#"}
                  data-card-left
                  className="basis-1/2 h-full flex items-center justify-center pointer-events-auto cursor-pointer"
                  style={{ backgroundColor: card.bg, color: card.text }}
                  tabIndex={card.linkHref ? 0 : -1}
                  aria-disabled={!card.linkHref}
                  onClick={!card.linkHref ? (e) => e.preventDefault() : undefined}
                >
                  <div className="px-12 xl:px-20 py-12 space-y-6 text-center">
                    {card.title && (
                      <Heading
                        level={card.title.attributes?.level}
                        content={card.title.attributes?.content}
                        className="font-montecatini font-normal text-6xl xl:text-7xl"
                      />
                    )}

                    {card.subtitle && (
                      <Heading
                        level={card.subtitle.attributes?.level}
                        content={card.subtitle.attributes?.content}
                        className="font-montecatini font-normal uppercase text-base xl:text-lg"
                      />
                    )}

                    {card.paragraph && (
                      <Paragraph
                        content={card.paragraph.attributes?.content}
                        className="font-nunito font-light text-base xl:text-lg"
                      />
                    )}

                    {card.link && (
                      <Heading
                        level={card.link.attributes?.level}
                        content={card.link.attributes?.content}
                        className="font-montecatini uppercase text-lg xl:text-xl"
                      />
                    )}
                  </div>
                </Link>

                <div
                  data-card-right
                  className="basis-1/2 h-full overflow-hidden"
                >
                  <div
                    data-card-right-reveal
                    style={{
                      backgroundColor: card.rightBg,
                      color: card.rightText,
                    }}
                    className="h-full w-full pl-24 pr-18 py-10 flex flex-col justify-between"
                  >
                    <div>
                      {card.list && (
                        <List
                          className="space-y-5 pt-16 pl-10"
                          contentClassName="font-montecatini"
                          blocks={card.list.innerBlocks}
                        />
                      )}
                    </div>
                    <div className="relative">
                      {img && img.url && (
                        <Image
                          src={img.url}
                          alt={img.alt || "Card image"}
                          width={img.width || 1600}
                          height={img.height || 900}
                          className="absolute -top-[85%] right-0 translate-x-10 w-1/3 h-full !aspect-9/16 object-cover"
                          priority={i === 0}
                        />
                      )}
                      {imgoriz && imgoriz.url && (
                        <Image
                          src={imgoriz.url}
                          alt={imgoriz.alt || "Card image"}
                          width={imgoriz.width || 1600}
                          height={imgoriz.height || 900}
                          className="w-full h-full object-cover"
                          priority={i === 0}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Mobile fallback (stack) */}
      <section className="lg:hidden py-8">
        {cards.map((card) => {
          const img = imgAttr(card.imgoriz);
          return (
            <div key={`m-${card.id}`} className="flex flex-col overflow-hidden">
              <Link
                href={card.linkHref || "#"}
                className="px-8 pt-12 pb-5 space-y-4 text-center block"
                style={{ backgroundColor: card.bg, color: card.text }}
                tabIndex={card.linkHref ? 0 : -1}
                aria-disabled={!card.linkHref}
                onClick={!card.linkHref ? (e) => e.preventDefault() : undefined}
              >
                {card.title && (
                  <Heading
                    level={card.title.attributes?.level}
                    content={card.title.attributes?.content}
                    className="font-montecatini font-normal text-5xl"
                  />
                )}
                {card.subtitle && (
                  <Heading
                    level={card.subtitle.attributes?.level}
                    content={card.subtitle.attributes?.content}
                    className="font-montecatini font-normal text-3xl"
                  />
                )}
                {card.paragraph && (
                  <Paragraph
                    content={card.paragraph.attributes?.content}
                    className="font-nunito font-light text-base"
                  />
                )}
                {card.link && (
                  <Heading
                    level={card.link.attributes?.level}
                    content={card.link.attributes?.content}
                    className="font-montecatini uppercase text-lg xl:text-xl"
                  />
                )}
                {card.list && (
                  <List
                    className="flex items-center justify-between pt-5"
                    contentClassName="font-montecatini"
                    blocks={card.list.innerBlocks}
                  />
                )}
              </Link>

              {img && img.url && (
                <Image
                  src={img.url}
                  alt={img.alt || "Card image"}
                  width={img.width || 1600}
                  height={img.height || 900}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};
