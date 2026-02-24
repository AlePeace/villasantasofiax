import { useRef } from "react";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const SolariumHome = ({ blocks }) => {
  const innerBlocks = blocks?.innerBlocks || [];
  const headings = innerBlocks.filter((block) => block.name === "core/heading");
  const paragraph = innerBlocks.find(
    (block) => block.name === "core/paragraph",
  );
  const image = innerBlocks.find((block) => block.name === "core/image");

  const sectionHeadingTitle = headings[0];
  const sectionHeadingSubtitle = headings[1];
  const sectionHeadingCard = headings[2];
  const sectionHeadingLink = headings[3];

  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(leftPanelRef.current, {
          xPercent: -70,
          yPercent: 100,
          rotation: -25,
          transformOrigin: "0% 100%",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=250%",
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(leftPanelRef.current, {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            ease: "none",
          });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section className="w-full h-full overflow-hidden">
      <div className="space-y-3">
        {sectionHeadingTitle && (
          <Heading
            level={sectionHeadingTitle.attributes?.level}
            content={sectionHeadingTitle.attributes?.content}
            className="font-montecatini font-normal text-center text-5xl lg:text-7xl xl:text-8xl text-blue"
          />
        )}
        {sectionHeadingSubtitle && (
          <Heading
            level={sectionHeadingSubtitle.attributes?.level}
            content={sectionHeadingSubtitle.attributes?.content}
            className="font-montecatini font-normal text-center text-2xl lg:text-4xl xl:text-5xl text-blue"
          />
        )}
      </div>
      <div className="w-full pt-10 lg:pt-20">
        <div ref={sectionRef} className="w-full flex flex-col lg:flex-row lg:items-center lg:h-screen">
          <div ref={leftPanelRef} className="lg:basis-1/2 h-full">
            <div className="bg-card h-full flex justify-center items-center">
              <div className="p-20 flex flex-col gap-10">
                <div className="mx-auto">
                  <svg
                    width="74"
                    height="78"
                    viewBox="0 0 74 78"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-12"
                  >
                    <path
                      d="M52.7275 52.4616C47.0108 54.5728 46.7892 64.2664 45.6956 59.7007C42.5706 46.6541 70.0047 48.1628 65.6793 30.1047C64.285 24.2834 58.605 18.8229 49.4362 20.9006L47.21 21.4051C43.0527 22.3472 39.9959 25.833 39.6497 30.0389L40.5477 54.3194L30.3204 32.1531C28.0935 28.5302 23.7728 26.7163 19.6155 27.6584L17.3893 28.1628C8.2153 30.2418 5.60016 37.5767 6.99573 43.403C11.3211 61.4612 35.2461 48.3194 38.3698 61.3608C39.4622 65.9214 34.8653 57.417 28.7726 57.89C12.5979 59.1351 15.4136 76.7466 15.4136 76.7466L31.3128 73.1436C37.6755 71.7018 41.9405 70.2977 43.2943 65.8094C46.547 69.2484 51.0172 68.6784 57.3748 67.2377L73.274 63.6347C73.274 63.6347 68.1116 46.7765 52.7211 52.4576L52.7275 52.4616Z"
                      fill="white"
                      fillOpacity="0.38"
                    />
                    <path
                      d="M34.6921 26.0914C33.1909 19.8243 29.0404 17.1895 22.8857 18.5843C29.0455 17.1884 31.5651 13.0367 30.0652 6.77469C31.5663 13.0418 35.7169 15.6766 41.8716 14.2819C35.7118 15.6777 33.1922 19.8295 34.6921 26.0914Z"
                      fill="white"
                      fillOpacity="0.38"
                    />
                    <path
                      d="M52.7275 52.4616C47.0108 54.5728 46.7892 64.2664 45.6956 59.7007C42.5706 46.6541 70.0047 48.1628 65.6793 30.1047C64.285 24.2834 58.605 18.8229 49.4362 20.9006L47.21 21.4051C43.0527 22.3472 39.9959 25.833 39.6497 30.0389L40.5477 54.3194L30.3204 32.1531C28.0935 28.5302 23.7728 26.7163 19.6155 27.6584L17.3893 28.1628C8.2153 30.2418 5.60016 37.5767 6.99573 43.403C11.3211 61.4612 35.2461 48.3194 38.3698 61.3608C39.4622 65.9214 34.8653 57.417 28.7726 57.89C12.5979 59.1351 15.4136 76.7466 15.4136 76.7466L31.3128 73.1436C37.6755 71.7018 41.9405 70.2977 43.2943 65.8094C46.547 69.2484 51.0172 68.6784 57.3748 67.2377L73.274 63.6347C73.274 63.6347 68.1116 46.7765 52.7211 52.4576L52.7275 52.4616Z"
                      fill="white"
                      fillOpacity="0.38"
                    />
                    <path
                      d="M34.6921 26.0914C33.1909 19.8243 29.0404 17.1895 22.8857 18.5843C29.0455 17.1884 31.5651 13.0367 30.0652 6.77469C31.5663 13.0418 35.7169 15.6766 41.8716 14.2819C35.7118 15.6777 33.1922 19.8295 34.6921 26.0914Z"
                      fill="white"
                      fillOpacity="0.38"
                    />
                  </svg>
                </div>
                {sectionHeadingCard && (
                  <Heading
                    level={sectionHeadingCard.attributes?.level}
                    content={sectionHeadingCard.attributes?.content}
                    className="font-montecatini font-normal text-center text-5xl lg:text-7xl xl:text-8xl text-white"
                  />
                )}
                <div className="space-y-5">
                  {paragraph && (
                    <Paragraph
                      content={paragraph.attributes?.content}
                      className="font-nunito font-light text-white text-center px-20 text-base lg:text-lg xl:text-xl"
                    />
                  )}
                  {sectionHeadingLink && (
                    <Heading
                      level={sectionHeadingLink.attributes?.level}
                      content={sectionHeadingLink.attributes?.content}
                      className="font-montecatini font-normal uppercase text-center text-base lg:text-lg xl:text-xl text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:basis-1/2 h-full">
            {image && (
              <Image
                src={image.attributes?.url}
                alt={image.attributes?.alt || "Image"}
                className={`object-cover w-full w-[${image.attributes?.width}px] h-[${image.attributes?.height}px] aspect-[${image.attributes?.width}/${image.attributes?.height}] !h-full pointer-events-none will-change-transform`}
                width={image.attributes?.width}
                height={image.attributes?.height}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
