"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Template({ children }) {
  const el = useRef(null);

  useGSAP(
    () => {
      gsap.from(el.current, {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: el },
  );

  return <div ref={el}>{children}</div>;
}
