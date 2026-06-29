"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

// Animazione di uscita, speculare all'entrata di app/[locale]/template.jsx:
// al click su un link interno il contenuto della pagina attuale scende e svanisce
// (opacità + dall'alto verso il basso), poi avviene la navigazione e la nuova
// pagina fa il suo fade-up. Nessun overlay: si anima il contenuto reale.
export const PageTransition = () => {
  const router = useRouter();
  const pathname = usePathname();
  // true mentre è in corso una navigazione (evita doppi click)
  const navigating = useRef(false);

  // Sblocca dopo che la nuova rotta è montata
  useEffect(() => {
    navigating.current = false;
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      // lascia passare cmd/ctrl/shift/alt-click (nuova scheda, ecc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return; // _blank, ecc.
      if (anchor.hasAttribute("download")) return;
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      )
        return;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // link esterno

      const dest = url.pathname + url.search;
      const current = window.location.pathname + window.location.search;
      if (dest === current) return; // stessa pagina (o solo hash)

      // Da qui gestiamo noi la navigazione
      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;

      const content = document.querySelector(".page-content");
      if (reduceMotion || !content) {
        router.push(dest);
        return;
      }

      // Uscita: il contenuto scende e svanisce (mirror dell'entrata)
      gsap.to(content, {
        opacity: 0,
        y: 24,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => router.push(dest),
      });
    };

    // capture = true: arriviamo prima dell'handler di <Link> e fermiamo la
    // sua navigazione istantanea con preventDefault
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
};
