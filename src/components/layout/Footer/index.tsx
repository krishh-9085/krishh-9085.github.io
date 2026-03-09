"use client";

import { useState, useEffect, useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView
} from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { margin: "-20%" });

  // Mask State with snappy physics
  const footerMouseX = useMotionValue(0);
  const footerMouseY = useMotionValue(0);
  const footerMaskRadius = useMotionValue(0);

  const footerSmoothRadius = useSpring(footerMaskRadius, {
    stiffness: 500,
    damping: 40,
    mass: 0.2
  });

  const footerSmoothMouseY = useSpring(footerMouseY, {
    stiffness: 500,
    damping: 40,
    mass: 0.2
  });

  const footerClipPath = useMotionTemplate`circle(${footerSmoothRadius}px at ${footerMouseX}px ${footerSmoothMouseY}px)`;

  // Measure footer height for curtain reveal spacer
  useEffect(() => {
    if (!footerRef.current) return;

    const updateHeight = () => {
      if (footerRef.current) {
        document.documentElement.style.setProperty(
          "--footer-height",
          `${footerRef.current.offsetHeight}px`
        );
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  const isMobileRevealObj = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const handleMobileReveal = (e: Event) => {
      const customEvent = e as CustomEvent;

      if (customEvent.detail.reveal) {
        if (footerRef.current) {
          const rect = footerRef.current.getBoundingClientRect();
          footerMouseX.set(customEvent.detail.x - rect.left);
          footerMouseY.set(customEvent.detail.y - rect.top);
        } else {
          footerMouseX.set(window.innerWidth / 2);
          footerMouseY.set(window.innerHeight / 2);
        }

        isMobileRevealObj.current = true;
        footerMaskRadius.set(4000); // Full screen reveal
        setIsRevealing(true);

        window.dispatchEvent(
          new CustomEvent("cursor-hide", { detail: { hide: true } })
        );
      } else {
        footerMaskRadius.set(0);
        isMobileRevealObj.current = false;
        setIsRevealing(false);

        window.dispatchEvent(
          new CustomEvent("cursor-hide", { detail: { hide: false } })
        );
      }
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    return () =>
      window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, [footerMouseX, footerMouseY, footerMaskRadius]);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobileRevealObj.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    footerMouseX.set(e.clientX - rect.left);
    footerMouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={footerRef}
      className={`relative w-full pt-20 pb-25 px-8 md:px-[13vw] bg-[#111111] flex flex-col justify-end snap-start transition-all duration-300 ${isRevealing ? "z-50" : "z-10"}`}
      onMouseMove={handlePointerMove}
    >
      <BaseLayer />
      <MaskLayer footerClipPath={footerClipPath} />
    </section>
  );
}
