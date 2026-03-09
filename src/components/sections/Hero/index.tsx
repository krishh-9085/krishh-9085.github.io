"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useMotionTemplate, useInView, useTransform } from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

export default function Hero() {
  const DESKTOP_MASK_RADIUS = 200;
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { margin: "-20%" });
  const isMobileRevealObj = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.2 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.2 });
  const maskOverflow = isDesktop ? DESKTOP_MASK_RADIUS : 0;
  const maskCenterX = useTransform(smoothMouseX, (v) => v + maskOverflow);
  const maskCenterY = useTransform(smoothMouseY, (v) => v + maskOverflow);

  const maskRadius = useMotionValue(0);
  const smoothRadius = useSpring(maskRadius, { stiffness: 500, damping: 40, mass: 0.2 });

  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${maskCenterX}px ${maskCenterY}px)`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);
    updateDesktop();
    mediaQuery.addEventListener("change", updateDesktop);
    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    const handleMobileReveal = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.reveal) {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          mouseX.set(customEvent.detail.x - rect.left);
          mouseY.set(customEvent.detail.y - rect.top);
        } else {
          mouseX.set(window.innerWidth / 2);
          mouseY.set(window.innerHeight / 2);
        }
        isMobileRevealObj.current = true;
        maskRadius.set(4000);
        setIsRevealing(true);
        setIsMaskActive(true);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
      } else {
        maskRadius.set(0);
        isMobileRevealObj.current = false;
        setIsRevealing(false);
        setIsMaskActive(false);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
      }
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    return () => window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, [mouseX, mouseY, maskRadius]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    handlePointerMove(e.clientX, e.clientY, e.currentTarget);
  };

  const handlePointerMove = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    if (isMobileRevealObj.current) return;
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  };

  const handleHeroMouseEnter = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    maskRadius.set(DESKTOP_MASK_RADIUS);
    setIsMaskActive(true);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
  };

  const handleHeroMouseLeave = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    maskRadius.set(0);
    setIsMaskActive(false);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative w-full h-screen flex justify-center items-center snap-start transition-all duration-500 bg-[#111111] overflow-visible ${(isRevealing || isMaskActive) ? "z-50" : "z-10"}`}
      onMouseMove={handleHeroMouseMove}
    >
      <BaseLayer
        handleHeroMouseEnter={handleHeroMouseEnter}
        handleHeroMouseLeave={handleHeroMouseLeave}
      />
      <MaskLayer
        maskOverflow={maskOverflow}
        clipPath={clipPath}
      />
    </section>
  );
}
