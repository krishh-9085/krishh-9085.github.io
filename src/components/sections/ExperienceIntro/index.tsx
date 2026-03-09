"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

export default function ExperienceIntro() {
  const DESKTOP_MASK_RADIUS = 200;
  const isMobileRevealObj = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const introSectionRef = useRef<HTMLElement>(null);

  const introMouseX = useMotionValue(0);
  const introMouseY = useMotionValue(0);
  const smoothMouseX = useSpring(introMouseX, { stiffness: 500, damping: 40, mass: 0.2 });
  const smoothMouseY = useSpring(introMouseY, { stiffness: 500, damping: 40, mass: 0.2 });

  const maskOverflow = isDesktop ? DESKTOP_MASK_RADIUS : 0;
  const maskCenterX = useTransform(smoothMouseX, (v) => v + maskOverflow);
  const maskCenterY = useTransform(smoothMouseY, (v) => v + maskOverflow);

  const introMaskRadius = useMotionValue(0);
  const introSmoothRadius = useSpring(introMaskRadius, { stiffness: 500, damping: 40, mass: 0.2 });

  const introClipPath = useMotionTemplate`circle(${introSmoothRadius}px at ${maskCenterX}px ${maskCenterY}px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobileRevealObj.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    introMouseX.set(e.clientX - rect.left);
    introMouseY.set(e.clientY - rect.top);
  };

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
        if (introSectionRef.current) {
          const rect = introSectionRef.current.getBoundingClientRect();
          introMouseX.set(customEvent.detail.x - rect.left);
          introMouseY.set(customEvent.detail.y - rect.top);
        }
        isMobileRevealObj.current = true;
        introMaskRadius.set(4000); // Full screen reveal
        setIsRevealing(true);
        setIsMaskActive(true);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
      } else {
        introMaskRadius.set(0);
        isMobileRevealObj.current = false;
        setIsRevealing(false);
        setIsMaskActive(false);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
      }
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    return () => window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, [introMouseX, introMouseY, introMaskRadius]);

  const handleMouseEnter = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    introMaskRadius.set(DESKTOP_MASK_RADIUS);
    setIsMaskActive(true);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
  };

  const handleMouseLeave = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    introMaskRadius.set(0);
    setIsMaskActive(false);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
  };

  return (
    <section
      ref={introSectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-screen bg-[#0a0a0a] overflow-visible flex items-center justify-center snap-start transition-all duration-300 ${(isRevealing || isMaskActive) ? "z-50" : "z-10"}`}
    >
      <BaseLayer
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <MaskLayer
        maskOverflow={maskOverflow}
        introClipPath={introClipPath}
      />
    </section>
  );
}
