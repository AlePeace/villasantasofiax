import Image from "next/image";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";

// Struttura attesa in WP (gruppo "ArticleGroup"):
//   - core/image    → hero image (primo blocco immagine)
//   - core/heading  → titolo articolo (primo heading)
//   - core/paragraph, altri heading, altre image → corpo articolo

export const ArticleGroup = ({ blocks }) => {
  const innerBlocks = blocks?.innerBlocks || [];

  const heroImage = innerBlocks.find((b) => b.name === "core/image");
  const heroHeading = innerBlocks.find((b) => b.name === "core/heading");

  // Tutto tranne la prima immagine e il primo heading vanno nel corpo
  const bodyBlocks = innerBlocks.filter(
    (b) => b !== heroImage && b !== heroHeading,
  );

  return (
    <>
      {/* Hero: immagine a schermo intero + titolo sovrapposto */}
      <section className="relative w-full h-screen overflow-hidden">
        {heroImage?.attributes?.url && (
          <Image
            src={heroImage.attributes.url}
            alt={heroImage.attributes.alt || ""}
            width={heroImage.attributes.width || 1600}
            height={heroImage.attributes.height || 900}
            className="object-cover w-full h-full"
            priority
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Titolo sovrapposto */}
        {heroHeading && (
          <div className="absolute inset-0 flex justify-center items-center z-20 px-5">
            <div>
              <Heading
                level={heroHeading.attributes?.level || 1}
                content={heroHeading.attributes?.content || ""}
                className="font-montecatini px-10 text-center text-white font-normal text-5xl lg:text-7xl"
              />
            </div>
          </div>
        )}
      </section>

      {/* Corpo articolo */}
      <article className="py-16 px-5 lg:px-32">
        <div className="max-w-3xl mx-auto space-y-8 [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-blue [&_a]:hover:text-blue/60 [&_a]:transition-colors">
          {bodyBlocks.map((block) => {
            switch (block.name) {
              case "core/heading":
                return (
                  <Heading
                    key={block.id}
                    level={block.attributes?.level || 2}
                    content={block.attributes?.content || ""}
                    className="font-montecatini text-blue text-2xl lg:text-3xl"
                  />
                );

              case "core/paragraph":
                return (
                  <Paragraph
                    key={block.id}
                    content={block.attributes?.content || ""}
                    className="font-nunito text-blue/80 text-base leading-relaxed"
                  />
                );

              case "core/image": {
                const { url, alt, width, height, caption } =
                  block.attributes || {};
                if (!url) return null;
                return (
                  <figure key={block.id} className="w-full">
                    <Image
                      src={url}
                      alt={alt || ""}
                      width={width || 1200}
                      height={height || 800}
                      className="w-full h-auto rounded-2xl object-cover"
                    />
                    {caption && (
                      <figcaption className="text-center text-sm text-blue/50 mt-2 font-nunito">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              default:
                return null;
            }
          })}
        </div>
      </article>
    </>
  );
};
