"use client";

import { useRef, useEffect } from "react";

export const VideoBlock = ({ src, className = "", poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster || undefined}
    >
      <source src={src} type="video/webm" />
    </video>
  );
};
