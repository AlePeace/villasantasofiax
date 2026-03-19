import { Heading } from "components/Heading";
import { List } from "components/List";
import Image from "next/image";

const CAMERA_THEMES = {
  positano: {
    bg: "bg-[#C53452]",
    text: "text-[#C53452]",
  },
  leucosya: {
    bg: "bg-[#57A691]",
    text: "text-[#57A691]",
  },
  camerota: {
    bg: "bg-[#EFAC53]",
    text: "text-[#EFAC53]",
  },
  acciaroli: {
    bg: "bg-[#1F5189]",
    text: "text-[#1F5189]",
  },
  velia: {
    bg: "bg-[#A0B898]",
    text: "text-[#A0B898]",
  },
  // Aggiungi altre camere seguendo lo stesso schema
  pioppi: {
    bg: "bg-[#FFAB67]",
    text: "text-[#FFAB67]",
  },
  palinuro: {
    bg: "bg-[#00ABD5]",
    text: "text-[#00ABD5]",
  },
  default: {
    bg: "bg-[#6C6C6C]",
    text: "text-white",
  },
};

const getTheme = (group) => {
  // metadata.name identifica il componente (es. "SummaryCamere"), non il tema
  // il tema camera (es. "positano") è sempre nella className
  const key = group?.attributes?.className || "";
  return CAMERA_THEMES[key] ?? CAMERA_THEMES.default;
};

export const ServicesCamera = ({ blocks }) => {
  const theme = getTheme(blocks);
  const innerBlocks = blocks?.innerBlocks || [];

  const imageBlock = innerBlocks.find((b) => b.name === "core/image");
  const headingBlocks = innerBlocks.find((b) => b.name === "core/heading");
  const listsBlocks = innerBlocks.find((b) => b.name === "core/list");

  const image = imageBlock?.attributes || null;
  const title = headingBlocks?.attributes || null;
  const listItems = listsBlocks?.attributes?.values || [];

  return (
    <section className="py-10 lg:py-24 w-full px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {image && (
          <div className="basis-[55%] relative">
            <Image
              src={image.url}
              alt={image.alt || "Image"}
              width={image.width || 500}
              height={image.height || 500}
              className="w-full object-cover !aspect-square pointer-events-none will-change-transform relative z-10"
            />
            <div className="absolute -top-20 -bottom-20 bg-overlay h-[120%] -translate-x-20 w-full"></div>
          </div>
        )}
        <div className="pt-5 lg:pt-10">
          {title && (
            <div>
              <Heading
                level={title.level}
                content={title.content}
                className={`font-montecatini text-2xl lg:text-4xl relative z-20 ${theme.text}`}
              />
            </div>
          )}
          {listItems && (
            <List
              blocks={listsBlocks?.innerBlocks}
              className="space-y-5 pl-5 lg:pl-10 mt-10 border-l border-l-gray/30"
              contentClassName="text-gray font-nunito font-light text-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
};
