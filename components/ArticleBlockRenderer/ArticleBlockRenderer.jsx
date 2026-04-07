import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { List } from "components/List";

// Renderer semplice per blocchi standard Gutenberg usati negli articoli
export const ArticleBlockRenderer = ({ blocks }) => {
  if (!blocks?.length) return null;

  return blocks.map((block) => {
    switch (block.name) {
      case "core/paragraph":
        return (
          <Paragraph
            key={block.id}
            content={block.attributes?.content || ""}
            className="font-nunito text-blue/80 text-base leading-relaxed"
          />
        );

      case "core/heading":
        return (
          <Heading
            key={block.id}
            level={block.attributes?.level || 2}
            content={block.attributes?.content || ""}
            className="font-montecatini text-blue text-2xl lg:text-3xl"
          />
        );

      case "core/image": {
        const img = block.attributes;
        if (!img?.url) return null;
        return (
          <figure key={block.id} className="w-full">
            <Image
              src={img.url}
              alt={img.alt || ""}
              width={img.width || 1200}
              height={img.height || 800}
              className="w-full h-auto rounded-lg object-cover"
            />
            {img.caption && (
              <figcaption className="text-center text-sm text-blue/50 mt-2 font-nunito">
                {img.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case "core/list":
        return (
          <List
            key={block.id}
            blocks={block.innerBlocks}
            className="space-y-2 list-disc pl-6"
            contentClassName="font-nunito text-blue/80 text-base"
          />
        );

      case "core/quote":
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-blue/30 pl-6 italic font-nunito text-blue/70 text-lg"
          >
            {block.innerBlocks?.map((b) =>
              b.name === "core/paragraph" ? (
                <Paragraph
                  key={b.id}
                  content={b.attributes?.content || ""}
                  className=""
                />
              ) : null,
            )}
          </blockquote>
        );

      case "core/separator":
        return (
          <hr key={block.id} className="border-blue/10 my-6" />
        );

      case "core/group":
        // Gestisce gruppi annidati ricorsivamente
        return (
          <div key={block.id}>
            <ArticleBlockRenderer blocks={block.innerBlocks} />
          </div>
        );

      case "core/columns":
        return (
          <div key={block.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ArticleBlockRenderer blocks={block.innerBlocks} />
          </div>
        );

      case "core/column":
        return (
          <div key={block.id}>
            <ArticleBlockRenderer blocks={block.innerBlocks} />
          </div>
        );

      default:
        return null;
    }
  });
};
