"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useMotionTemplate, useInView } from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

const experiences = [
  { year: "2025", role: "IOS App Tester (Intern)", revealRole: "Executed 500+ Test Cases", company: "Banao Technologies" },
  { year: "2024", role: "FullStack and DSA Trainee", revealRole: "Built 3 MERN Apps + 70 DSA", company: "AccioJob Training Program" },
  { year: "2022-2026", role: "B.Tech. in AI and ML", revealRole: "AI/ML Foundation + Research", company: "Vivekananda Institute of Professional Studies - Technical Campus" },
];

export default function Experience() {

  const expSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(expSectionRef, { margin: "-20%" });

  const [isRevealing, setIsRevealing] = useState(false);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const maskRadius = useMotionValue(0);

  const smoothRadius = useSpring(maskRadius, {
    stiffness: 250,
    damping: 30,
    mass: 0.5
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 250,
    damping: 30
  });

  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${mouseX}px ${smoothMouseY}px)`;

  useEffect(() => {

    const handleMobileReveal = (e: Event) => {

      const customEvent = e as CustomEvent;

      if (customEvent.detail.reveal) {

        if (expSectionRef.current) {

          const rect = expSectionRef.current.getBoundingClientRect();

          mouseX.set(customEvent.detail.x - rect.left);
          mouseY.set(customEvent.detail.y - rect.top);

        }

        maskRadius.set(4000);
        setIsRevealing(true);

      } else {

        maskRadius.set(0);
        setIsRevealing(false);

      }

    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);

    return () => window.removeEventListener("mobile-mask-reveal", handleMobileReveal);

  }, [mouseX, mouseY, maskRadius]);


  return (

    <section
      id="experience"
      ref={expSectionRef}
      className={`relative w-full py-17 md:py-22 snap-start transition-all duration-300 bg-[#111111] ${isRevealing ? "z-50" : "z-10"}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <BaseLayer
        experiences={experiences}
        hoveredExperience={hoveredExperience}
        setHoveredExperience={setHoveredExperience}
      />
      <MaskLayer
        clipPath={clipPath}
        experiences={experiences}
      />

    </section>

  );

}
