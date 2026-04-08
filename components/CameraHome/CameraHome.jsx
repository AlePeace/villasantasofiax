import { Buttons } from "components/Buttons";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";

export const CameraHome = ({ blocks }) => {
  const innerBlocks = blocks?.innerBlocks || [];
  const paragraphBlock = innerBlocks.find((b) => b.name === "core/paragraph");
  const button = innerBlocks.find((b) => b.name === "core/buttons");
  const img = innerBlocks.filter((b) => b.name === "core/image");
  const imageRight = img[1];
  const imgLeft = img[0];

  return (
    <section className="w-full px-5 lg:px-10 overflow-hidden">
      <div className="pt-10 xl:pt-20 pl-5 lg:pl-40 w-full lg:w-1/2 xl:w-1/3">
        {paragraphBlock && (
          <div className="pl-7 border-l border-gray/30">
            <Paragraph
              content={paragraphBlock?.attributes?.content}
              className="font-nunito font-light text-gray text-base lg:text-lg xl:text-xl"
            />
          </div>
        )}
      </div>
      <div className="py-10 lg:py-36 px-5 lg:px-10 xl:px-20 relative flex flex-col gap-20 justify-center lg:justify-end items-end">
       {imgLeft && (
        <div className="hidden lg:block absolute left-40 bottom-40 lg:w-[15%]">
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
        {button && <Buttons blocks={button.innerBlocks} variant="CameraHome"/>}
        <div className="lg:w-[35%] xl:w-[40%] z-0 lg:-mt-[15%] xl:-mt-[10%]">
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
