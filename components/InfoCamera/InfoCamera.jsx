import { Heading } from "components/Heading";

export const InfoCamera = ({ blocks }) => {
    const innerBlocks = blocks?.innerBlocks || [];
    const headings = innerBlocks.filter((b) => b.name === "core/heading");

    return (
        <section className="w-full pt-14 lg:pt-32 pb-10">
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 justify-items-center">
                {headings.map((heading, i) => (
                    <Heading
                        key={i}
                        level={heading.attributes?.level}
                        content={heading.attributes?.content}
                        className="font-montecatini text-text text-lg"
                    />
                ))}
            </div>
        </section>
    );
}