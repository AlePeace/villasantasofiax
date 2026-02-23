import { Buttons } from "components/Buttons";
import { Paragraph } from "components/Paragraph";

export const CameraHome = ({ blocks }) => {
  const innerBlocks = blocks?.innerBlocks || [];
  const paragraphBlock = innerBlocks.find((b) => b.name === "core/paragraph");
  const button = innerBlocks.find((b) => b.name === "core/buttons");

  return (
    <section className="w-full px-5 lg:px-10">
      <div className="pt-10 pl-5 lg:pl-40 w-1/2 lg:w-1/2 xl:w-1/3">
        {paragraphBlock && (
          <div className="pl-7 border-l border-gray/30">
            <Paragraph
              content={paragraphBlock?.attributes?.content}
              className="font-nunito font-light text-gray text-base lg:text-lg xl:text-xl"
            />
          </div>
        )}
      </div>
      <div className="pt-10 lg:pt-36 relative flex justify-center items-center">
        {button && (
            <Buttons blocks={button.innerBlocks} variant="CameraHome" />
        )}
      </div>
    </section>
  );
};
