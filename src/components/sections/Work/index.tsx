"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
} from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

const projects = [
  {
    id: 1,
    title: "GADGETGENIE - AI SHOPPING BOT",
    category: "NEXT.JS | NODE.JS | GEMINI AI | NOV 2025",
    image: "/projects/gadgetgenie.png",
    description: "AI shopping assistant with personalized recommendations, secure auth, and optimized server-side APIs.",
    github: "https://github.com/krishh-9085/shopee-bot",
    live: "https://gadgetgenie.vercel.app/",
    maskLiveLabel: "Magic",
    maskGithubLabel: "Source"
  },
  {
    id: 2,
    title: "CHATTY - REAL-TIME CHAT APP",
    category: "REACT | NODE.JS | SOCKET.IO | MONGODB | OCT 2025",
    image: "/projects/chatty.png",
    description: "Real-time chat platform with auth, persistent history, Zustand state flow, and scalable message storage.",
    github: "https://github.com/krishh-9085/Chatty",
    live: "https://chatty-client-app.vercel.app/",
    maskLiveLabel: "Magic",
    maskGithubLabel: "Source"
  },
  {
    id: 3,
    title: "AI RESUME ANALYZER",
    category: "TYPESCRIPT | REACT | PDF PROCESSING | JUL 2025",
    image: "/projects/ai-resume-analyzer.png",
    description: "ATS scoring tool with fast PDF parsing and actionable AI feedback for resume improvement.",
    github: "https://github.com/krishh-9085/Skill-Sight",
    live: "https://skill-sight-resume.vercel.app/",
    maskLiveLabel: "Magic",
    maskGithubLabel: "Source"
  },
];

export default function Work() {
  const DESKTOP_MASK_RADIUS = 200;
  const containerRef = useRef<HTMLElement>(null);
  const isMobileRevealObj = useRef(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 250, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 250, damping: 30 });

  const maskRadius = useMotionValue(0);
  const smoothRadius = useSpring(maskRadius, { stiffness: 250, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const workClipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothMouseX}px ${smoothMouseY}px)`;

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
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          mouseX.set(customEvent.detail.x - rect.left);
          mouseY.set(customEvent.detail.y - rect.top);
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

    return () =>
      window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, []);

  const handleWorkMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobileRevealObj.current || !containerRef.current || !isDesktop) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleProjectMouseEnter = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    maskRadius.set(DESKTOP_MASK_RADIUS);
    setIsMaskActive(true);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: true } }));
  };

  const handleProjectMouseLeave = () => {
    if (isMobileRevealObj.current || !isDesktop) return;
    maskRadius.set(0);
    setIsMaskActive(false);
    window.dispatchEvent(new CustomEvent("cursor-hide", { detail: { hide: false } }));
  };

  const sectionHeight = typeof window !== "undefined" && window.innerWidth < 768
    ? `${(projects.length * 75) + 5}vh`
    : `${(projects.length + 1) * 100}vh`;

  return (
    <section
      id="work"
      ref={containerRef}
      className={`relative w-full transition-all duration-300 bg-[#111111] ${(isRevealing || isMaskActive) ? "z-50" : "z-10"}`}
      style={{ height: sectionHeight }}
      onMouseMove={handleWorkMouseMove}
    >
      <BaseLayer
        projects={projects}
        smoothProgress={smoothProgress}
        handleProjectMouseEnter={handleProjectMouseEnter}
        handleProjectMouseLeave={handleProjectMouseLeave}
      />
      <MaskLayer
        workClipPath={workClipPath}
        projects={projects}
        smoothProgress={smoothProgress}
      />
    </section>
  );
}
