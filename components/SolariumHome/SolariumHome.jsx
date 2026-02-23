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

  return (
    <section className="w-full h-full">
    </section>
  )
};
