import Image from "next/image";

export const Cover = ({ children, background }) => {
  const hasBackgroundVideo = background?.backgroundVideo?.url;
  const hasBackgroundImage = background?.backgroundImage?.url;

  return (
    <div className="h-screen relative min-h-[400px] flex justify-center items-center overflow-hidden">
      {hasBackgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform" 
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={background?.backgroundImage?.url || undefined}
        >
          <source src={background.backgroundVideo.url} type="video/mp4" />
          Il tuo browser non supporta il video.
        </video>
      )}

      {!hasBackgroundVideo && hasBackgroundImage && (
        <Image
          src={background.backgroundImage.url}
          alt={background.backgroundImage.alt || "Cover background"}
          fill
          className="object-cover z-0"
          priority
        />
      )}

      {!hasBackgroundVideo &&
        !hasBackgroundImage &&
        background?.backgroundColor && (
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor: background.backgroundColor }}
          />
        )}

      {!hasBackgroundVideo &&
        !hasBackgroundImage &&
        !background?.backgroundColor && (
          <div className="absolute inset-0 z-0" />
        )}

      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
