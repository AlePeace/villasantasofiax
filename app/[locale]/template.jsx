"use client";

import { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Template({ children }) {
  const el = useRef(null);
  const lenis = useLenis();

  // Runs once per mount (= once per navigation, since template.jsx remounts on every route change).
  // Executes after children's useLayoutEffect (where useGSAP creates ScrollTriggers) but
  // before the browser paints — so the user never sees the wrongly-triggered state.
  useLayoutEffect(() => {
    // Reset Lenis scroll position to top
    lenis?.scrollTo(0, { immediate: true });

    // Reset any ScrollTrigger animations that fired incorrectly due to stale scroll position
    ScrollTrigger.getAll().forEach((st) => {
      st.animation?.progress(0).pause();
    });

    ScrollTrigger.refresh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div ref={el} className="page-content">
      {children}
    </div>
  );
}
