"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useMotionTemplate, useInView, useTransform } from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

export default function Motto() {
  const DESKTOP_MASK_RADIUS = 200;
  const mottoRef = useRef<HTMLElement>(null);
  const isInView = useInView(mottoRef, { margin: "-20%" });
  const isMobileRevealObj = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const mottoMouseX = useMotionValue(0);
  const mottoMouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mottoMouseX, { stiffness: 500, damping: 40, mass: 0.2 });
  const smoothMouseY = useSpring(mottoMouseY, { stiffness: 500, damping: 40, mass: 0.2 });
  const maskOverflow = isDesktop ? DESKTOP_MASK_RADIUS : 0;
  const maskCenterX = useTransform(smoothMouseX, (v) => v + maskOverflow);
  const maskCenterY = useTransform(smoothMouseY, (v) => v + maskOverflow);

  const mottoMaskRadius = useMotionValue(0);
  const mottoSmoothRadius = useSpring(mottoMaskRadius, { stiffness: 500, damping: 40, mass: 0.2 });

  const mottoClipPath = useMotionTemplate`circle(${mottoSmoothRadius}px at ${maskCenterX}px ${maskCenterY}px)`;

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
        if (mottoRef.current) {
          const rect = mottoRef.current.getBoundingClientRect();
          mottoMouseX.set(customEvent.detail.x - rect.left);
          mottoMouseY.set(customEvent.detail.y - rect.top);
        } else {
          mottoMouseX.set(window.innerWidth / 2);
          mottoMouseY.set(window.innerHeight / 2);
        }
        isMobileRevealObj.current = true;
        mottoMaskRadius.set(4000); // Full screen reveal
        setIsRevealing(true);
        setIsMaskActive(true);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
      } else {
        mottoMaskRadius.set(0);
        isMobileRevealObj.current = false;
        setIsRevealing(false);
        setIsMaskActive(false);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
      }
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    return () => window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, [mottoMouseX, mottoMouseY, mottoMaskRadius]);

  const handleTextMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobileRevealObj.current || !mottoRef.current || !isDesktop) return;
    const rect = mottoRef.current.getBoundingClientRect();
    mottoMouseX.set(e.clientX - rect.left);
    mottoMouseY.set(e.clientY - rect.top);
    mottoMaskRadius.set(DESKTOP_MASK_RADIUS);
    setIsMaskActive(true);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
  };

  const handleTextMouseLeave = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    mottoMaskRadius.set(0);
    setIsMaskActive(false);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
  };

  return (
    <section
      id="motto"
      ref={mottoRef}
      className={`relative w-full h-screen flex flex-col items-center justify-center snap-start bg-[#111111] transition-all duration-300 overflow-visible ${(isRevealing || isMaskActive) ? "z-50" : "z-10"}`}
    >
      <BaseLayer
        handleTextMouseMove={handleTextMouseMove}
        handleTextMouseLeave={handleTextMouseLeave}
      />
      <MaskLayer
        maskOverflow={maskOverflow}
        mottoClipPath={mottoClipPath}
      />
    </section>
  );
}
