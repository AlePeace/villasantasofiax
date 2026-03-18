"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { LanguageSwitcher } from "components/LanguageSwitcher";
import Link from "next/link";

export const MainMenu = ({
  menuData,
  menus,
  bgImage = null,
  prenotaUrl = "#prenota",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuNavRef = useRef(null);
  const tlRef = useRef(null);

  const data = menuData ?? menus;
  let nodes = [];
  if (!data) {
    nodes = [];
  } else if (Array.isArray(data)) {
    nodes = data.flatMap((d) => d?.menuItems?.nodes ?? []);
  } else if (data.menuItems?.nodes) {
    nodes = data.menuItems.nodes;
  } else if (Array.isArray(data.nodes)) {
    nodes = data.nodes.flatMap((n) => n?.menuItems?.nodes ?? []);
  }

  useGSAP(() => {
    if (!overlayRef.current) return;

    gsap.set(overlayRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 1 });

    tlRef.current = gsap.timeline({ paused: true }).to(overlayRef.current, {
      clipPath: "inset(0 0 0% 0)",
      duration: 0.9,
      ease: "power4.inOut",
    });
  }, []);

  useGSAP(() => {
    if (!menuNavRef.current || nodes.length === 0) return;

    const items = Array.from(menuNavRef.current.querySelectorAll("a"));
    gsap.set(items, { y: 60, opacity: 0 });

    if (tlRef.current) {
      tlRef.current
        .to(
          items,
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          ".main-menu__footer",
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.2",
        );
    }
  }, [nodes.length]);

  const handleOpen = () => {
    setIsOpen(true);
    tlRef.current?.play();
  };

  const handleClose = () => {
    tlRef.current?.reverse();
    setTimeout(() => setIsOpen(false), 900);
  };

  const handleToggle = () => {
    if (isOpen) handleClose();
    else handleOpen();
  };

  const handleLinkClick = () => {
    if (isOpen) handleClose();
  };

  return (
    <>
      {/* ── Header bar ── */}
      <header className="fixed top-0 left-0 w-full z-[9999] px-6 lg:px-14 py-5 lg:py-7">
        <div className="grid grid-cols-2 items-center">
          {/* Left: Hamburger + Language Switcher */}
          <div className="flex items-center gap-5">
            <button
              onClick={handleToggle}
              aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
              className="relative w-7 h-[18px] flex flex-col justify-between cursor-pointer group shrink-0"
            >
              <span
                className={`block h-px bg-white transition-all duration-400 origin-center ${
                  isOpen ? "rotate-45 translate-y-[8.5px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-400 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[8.5px]" : ""
                }`}
              />
            </button>

            <LanguageSwitcher />
          </div>

          {/* Right: Prenota Ora */}
          <div className="flex justify-end">
            <Link
              href={prenotaUrl}
              className="font-montecatini uppercase lg:text-xl text-sm tracking-[0.18em] text-white transition-all duration-500 hover:text-blue"
            >
              Prenota ora
            </Link>
          </div>
        </div>
      </header>

      {/* ── Full Menu Overlay ── */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[9998] opacity-0 bg-blue flex flex-col justify-between px-8 lg:px-20 pt-28 lg:pt-36 pb-10 lg:pb-16 overflow-y-auto ${
          !isOpen ? "pointer-events-none" : ""
        }`}
      >
        {bgImage?.sourceUrl && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={bgImage.sourceUrl}
              alt={bgImage.altText || ""}
              width={bgImage.mediaDetails?.width || 1920}
              height={bgImage.mediaDetails?.height || 1080}
              priority
              className="w-full h-full object-cover object-right z-0 opacity-100"
            />
            <div className="absolute z-10 inset-0 bg-overlay/70"></div>
          </div>
        )}
        {/* Menu items */}
        <nav ref={menuNavRef}>
          {nodes.map((item, idx) => (
            <Link
              key={item.uri ?? idx}
              href={item.uri}
              onClick={handleLinkClick}
              className="block relative font-montecatini text-4xl lg:text-6xl xl:text-7xl text-white uppercase tracking-wide leading-none py-3 lg:py-4 border-b border-white/10 hover:text-lightblue transition-colors duration-300 group z-20"
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer of overlay */}
        <div className="relative main-menu__footer flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mt-12 opacity-0 translate-y-5 z-20">
          <div className="flex flex-col gap-1">
            <p className="font-montecatini font-light text-white text-sm lg:text-2xl uppercase tracking-[0.2em]">
              socials
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
