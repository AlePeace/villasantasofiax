import { Buttons } from "components/Buttons";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";

export const EsterniVilla = ({ blocks }) => {
  const innerBlocks = blocks?.innerBlocks || [];

  const headings = innerBlocks.filter((b) => b.name === "core/heading");
  const paragraphs = innerBlocks.filter((b) => b.name === "core/paragraph");
  const images = innerBlocks.filter((b) => b.name === "core/image");
  const button = innerBlocks.find((b) => b.name === "core/buttons");

  const [img0, img1, img2, img3, img4, img5] = images;
  const heading1 = headings[0]; // ESTERNI CHE RACCONTANO
  const heading2 = headings[1]; // INTERNI CHE ACCOLGONO
  const para1 = paragraphs[0];
  const para2 = paragraphs[1];

  return (
    <section
      className="w-full"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f3eadf)" }}
    >
      <div className="px-5 lg:px-24 xl:px-32 py-16 lg:pt-24 lg:pb-42 flex flex-col gap-16 lg:gap-24">
        {/* ── ESTERNI CHE RACCONTANO ── */}

        {/* Row 1: small img + heading/para | tall portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left col */}
          <div className="flex flex-col gap-8">
            {img0 && (
              <div className="w-40 h-40 lg:w-3/6 lg:h-full overflow-hidden relative lg:self-end lg:-translate-x-1/3 lg:-translate-y-1/3">
                <Image
                  src={img0.attributes?.url}
                  alt={img0.attributes?.alt || ""}
                  width={img0.attributes?.width}
                  height={img0.attributes?.height}
                  className="object-cover object-center !aspect-square w-full h-auto"
                  quality={100}
                />
              </div>
            )}
            {heading1 && (
              <Heading
                level={heading1.attributes?.level}
                content={heading1.attributes?.content}
                className="font-montecatini text-blue text-4xl lg:text-5xl xl:text-7xl uppercase leading-tight"
              />
            )}
            {para1 && (
              <div className="pl-7 md:pr-12 lg:pr-40 border-l border-gray/30">
                <Paragraph
                  content={para1.attributes?.content}
                  className="font-nunito text-text text-base lg:text-lg leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Right col: tall portrait */}
          {img1 && (
            <div className="relative w-full lg:self-end lg:p-10">
              <Image
                src={img1.attributes?.url}
                alt={img1.attributes?.alt || ""}
                width={img1.attributes?.width}
                height={img1.attributes?.height}
                className="w-full object-cover aspect-3/4! lg:h-[70vh]"
              />
            </div>
          )}
        </div>

        {/* Row 2: landscape left | stacked imgs + para right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-30 items-start">
          {/* Landscape left */}
          {img2 && (
            <div className="relative w-full">
              <Image
                src={img3.attributes?.url}
                alt={img3.attributes?.alt || ""}
                width={img3.attributes?.width}
                height={img3.attributes?.height}
                className="w-full lg:w-3/4 object-cover"
              />
            </div>
          )}

          {/* Right: img3 + para + img4 stacked */}
          <div className="flex flex-col gap-8">
            {img3 && (
              <div className="relative w-full lg:w-2/3">
                <Image
                  src={img2.attributes?.url}
                  alt={img2.attributes?.alt || ""}
                  width={img2.attributes?.width}
                  height={img2.attributes?.height}
                  className="w-full object-cover !aspect-square"
                />
              </div>
            )}
            {para2 && (
              <div className="pt-10">
                  <Paragraph
                    content={para2.attributes?.content}
                    className="font-nunito text-text text-base lg:text-lg leading-relaxed"
                  />
              </div>
            )}
          </div>
        </div>

        {/* ── INTERNI CHE ACCOLGONO ── */}
        <div className="flex flex-col items-center gap-12">
          {/* Two interni images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {img4 && (
              <div className="relative w-full lg:w-[80%] lg:pt-60 lg:justify-self-end">
                <Image
                  src={img4.attributes?.url}
                  alt={img4.attributes?.alt || ""}
                  width={img4.attributes?.width}
                  height={img4.attributes?.height}
                  className="w-full object-cover aspect-square! lg:w-2/3"
                />
              </div>
            )}
            <div className="space-y-10 lg:space-y-20">
              <div>
                {heading2 && (
                  <Heading
                    level={heading2.attributes?.level}
                    content={heading2.attributes?.content}
                    className="font-montecatini text-blue text-4xl lg:text-5xl xl:text-7xl uppercase leading-tight"
                  />
                )}
              </div>
              {img5 && (
                <div className="relative w-full lg:pt-20">
                  <Image
                    src={img5.attributes?.url}
                    alt={img5.attributes?.alt || ""}
                    width={img5.attributes?.width}
                    height={img5.attributes?.height}
                    className="w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Button */}
          {button && (
            <div className="relative w-full py-32">
              <Buttons blocks={button.innerBlocks} variant="CameraHome" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
