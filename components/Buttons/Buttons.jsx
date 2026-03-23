import { Button } from "components/Button";

export const Buttons = ({
  blocks,
  className = "",
  variant = "default",
  decoration,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return "flex gap-6 justify-center";
      case "villaHome":
        return "flex justify-start";
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
    if (variant === "villaHome") {
      return "relative px-10 lg:px-20 py-6 lg:py-8 uppercase bg-terracotta text-white text-xl lg:text-2xl tracking-wide font-montecatini font-noraml text-base lg:text-2xl transition-all duration-300 hover:bg-blue hover:border-blue";
    }

    if (variant === "CameraHome") {
      return "absolute w-full lg:w-fit left-1/2 -translate-x-1/2 px-10 lg:px-24 py-6 lg:py-12 z-10 uppercase bg-lightblue text-white text-xl lg:text-2xl tracking-wide font-montecatini font-noraml text-base lg:text-2xl transition-all duration-300 hover:bg-blue hover:border-blue text-center";
    }

    if (variant === "CilentoHome") {
      return "w-full lg:w-fit px-10 lg:px-20 py-6 lg:py-8 z-10 uppercase bg-terracotta text-white text-xl lg:text-2xl tracking-wide font-montecatini font-noraml text-base lg:text-2xl transition-all duration-300 hover:bg-blue hover:border-blue text-center";
    }

    if (variant === "BookExp") {
      return "w-full lg:w-fit px-10 lg:px-20 py-6 lg:py-8 z-10 uppercase bg-blue text-white text-xl lg:text-2xl tracking-[1.92px] font-montecatini font-noraml text-base lg:text-2xl transition-all duration-300 hover:bg-lightblue hover:border-lightblue text-center";
    }

    return "px-10 py-4 uppercase rounded-full bg-blue text-yellow font-semibold transition-all duration-300 hover:bg-yellow hover:text-blue";
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      {blocks?.map((block, index) => {
        if (block.name === "core/button") {
          return (
            <Button
              key={block.id || index}
              url={block.attributes.url}
              content={block.attributes.content}
              className={getButtonStyles()}
            />
          );
        }
        return null;
      })}
      {decoration && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">{decoration}</div>
      )}
    </div>
  );
};
