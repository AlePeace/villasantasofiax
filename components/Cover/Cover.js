import Image from "next/image";

export const Cover = ({ children, background }) => {
  const hasBackgroundImage = background?.backgroundImage?.url;
  return (
    <div className="h-screen relative min-h-[400px] flex justify-center items-center">
      {hasBackgroundImage && (
        <Image
          src={background.backgroundImage.url}
          alt={background.backgroundImage.alt || "Cover background"}
          fill
          className="object-cover"
          priority
        />
      )}
      {background?.backgroundColor && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: background.backgroundColor }}
        />
      )}
      {!hasBackgroundImage && !background?.backgroundColor && (
        <div className="absolute inset-0 z-0" />
      )}
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
