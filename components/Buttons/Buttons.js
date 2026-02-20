import { Button } from "components/Button";

export const Buttons = ({ blocks, className = "", variant = "default" }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return "flex gap-6 justify-center";
      case "default":
      default:
        return "flex gap-4";
    }
  };

  const getButtonStyles = () => {
    if (variant === "hero") {
      return "px-10 py-4 uppercase rounded-full bg-yellow text-blue font-semibold transition-all duration-300 hover:bg-blue hover:text-yellow";
    }
    if (variant === "map") {
      return "px-10 py-4 uppercase rounded-full bg-blue text-white text-[10px] lg:text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-blue";
    }

    // Default variant
    return "px-10 py-4 uppercase rounded-full bg-blue text-yellow font-semibold transition-all duration-300 hover:bg-yellow hover:text-blue";
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      {blocks.map((block, index) => {
        if (block.name === "core/button") {
          return (
            <Button
              key={index}
              url={block.attributes.url}
              content={block.attributes.content}
              className={getButtonStyles()}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
