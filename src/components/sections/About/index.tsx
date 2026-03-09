"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform, useInView } from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

const aboutWords = [
  { text: "I'm", color: "rgb(183,171,152)", maskColor: "#0a0a0a" },
  { text: "a", color: "rgb(183,171,152)", maskColor: "#0a0a0a" },
  { text: "FULLSTACK", color: "rgb(235,89,57)", maskColor: "#ffffff", className: "italic font-black pr-2" },
  { text: "developer", color: "rgb(183,171,152)", maskColor: "#0a0a0a" },
  { text: "building", color: "rgb(183,171,152)", maskColor: "#0a0a0a" },
  { text: "scalable", color: "rgb(183,171,152)", maskColor: "#0a0a0a" },
  { text: "MERN", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "and", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "Next.js", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "apps", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "with", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "strong", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "APIs", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "and", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "clean", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "frontend", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
  { text: "systems.", color: "rgb(183,171,152)", maskColor: "rgba(0,0,0,0.4)" },
];

const revealWords = [
  { text: "I", maskColor: "#0a0a0a" },
  { text: "ship", maskColor: "#0a0a0a" },
  { text: "AI-POWERED", maskColor: "#0a0a0a", className: "italic font-black pr-2" },
  { text: "products", maskColor: "#0a0a0a" },
  { text: "using", maskColor: "#0a0a0a" },
  { text: "React,", maskColor: "#0a0a0a" },
  { text: "Node.js,", maskColor: "rgba(0,0,0,0.4)" },
  { text: "MongoDB", maskColor: "rgba(0,0,0,0.4)" },
  { text: "and", maskColor: "rgba(0,0,0,0.4)" },
  { text: "Gemini", maskColor: "rgba(0,0,0,0.4)" },
  { text: "for", maskColor: "rgba(0,0,0,0.4)" },
  { text: "fast,", maskColor: "rgba(0,0,0,0.4)" },
  { text: "reliable", maskColor: "rgba(0,0,0,0.4)" },
  { text: "user-focused", maskColor: "rgba(0,0,0,0.4)" },
  { text: "experiences.", maskColor: "rgba(0,0,0,0.4)" },
];

export default function About() {
  const DESKTOP_MASK_RADIUS = 200;
  const isMobileRevealObj = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(aboutSectionRef, { margin: "-20%" });
  useScroll({
    target: aboutSectionRef,
    offset: ["start 60%", "end 50%"]
  });

  const aboutMouseX = useMotionValue(0);
  const aboutMouseY = useMotionValue(0);
  const smoothMouseX = useSpring(aboutMouseX, { stiffness: 500, damping: 40, mass: 0.2 });
  const smoothMouseY = useSpring(aboutMouseY, { stiffness: 500, damping: 40, mass: 0.2 });
  const maskOverflow = isDesktop ? DESKTOP_MASK_RADIUS : 0;
  const maskCenterX = useTransform(smoothMouseX, (v) => v + maskOverflow);
  const maskCenterY = useTransform(smoothMouseY, (v) => v + maskOverflow);

  const aboutMaskRadius = useMotionValue(0);
  const aboutSmoothRadius = useSpring(aboutMaskRadius, { stiffness: 500, damping: 40, mass: 0.2 });

  const aboutClipPath = useMotionTemplate`circle(${aboutSmoothRadius}px at ${maskCenterX}px ${maskCenterY}px)`;

  const handleAboutMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    handlePointerMove(e.clientX, e.clientY, e.currentTarget);
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
        if (aboutSectionRef.current) {
          const rect = aboutSectionRef.current.getBoundingClientRect();
          aboutMouseX.set(customEvent.detail.x - rect.left);
          aboutMouseY.set(customEvent.detail.y - rect.top);
        }
        isMobileRevealObj.current = true;
        aboutMaskRadius.set(4000); // Full screen reveal
        setIsRevealing(true);
        setIsMaskActive(true);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
      } else {
        aboutMaskRadius.set(0);
        isMobileRevealObj.current = false;
        setIsRevealing(false);
        setIsMaskActive(false);
        window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
      }
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    return () => window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, [aboutMouseX, aboutMouseY, aboutMaskRadius]);

  const handlePointerMove = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    if (isMobileRevealObj.current) return;
    const rect = currentTarget.getBoundingClientRect();
    aboutMouseX.set(clientX - rect.left);
    aboutMouseY.set(clientY - rect.top);
  };

  const handleAboutMouseEnter = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    aboutMaskRadius.set(DESKTOP_MASK_RADIUS);
    setIsMaskActive(true);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
  };

  const handleAboutMouseLeave = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    aboutMaskRadius.set(0);
    setIsMaskActive(false);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
  };

  return (
    <section
      id="about"
      ref={aboutSectionRef}
      className={`relative w-full min-h-screen pt-40 pb-20 flex flex-col justify-center snap-start transition-all duration-300 overflow-visible ${(isRevealing || isMaskActive) ? "z-50" : "z-10"}`}
      onMouseMove={handleAboutMouseMove}
    >
      <BaseLayer
        handleAboutMouseEnter={handleAboutMouseEnter}
        handleAboutMouseLeave={handleAboutMouseLeave}
        revealWords={revealWords}
      />
      <MaskLayer
        maskOverflow={maskOverflow}
        aboutClipPath={aboutClipPath}
        aboutWords={aboutWords}
        revealWords={revealWords}
      />
    </section>
  );
}
