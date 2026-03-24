export const VideoBlock = ({ src, className = "", poster }) => {
  if (!src) return null;

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster || undefined}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};
