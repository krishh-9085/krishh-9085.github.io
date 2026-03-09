"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll, useMotionValue, useSpring, useMotionTemplate, useInView } from "framer-motion";
import BaseLayer from "./BaseLayer";
import MaskLayer from "./MaskLayer";

const servicesList = [
  { title: "FRONTEND", description: "I build responsive interfaces with React.js, Next.js, TypeScript, JavaScript, and Tailwind CSS." },
  { title: "BACKEND", description: "I develop scalable backend systems using Node.js, Express.js, FastAPI, and REST API architecture." },
  { title: "DATABASE", description: "I design and manage data layers with MongoDB, Firebase, SQLite, and SQL for reliable performance." },
  { title: "DEVOPS", description: "I handle delivery workflows with Docker, Git, and GitHub for versioning, deployment, and maintenance." },
  { title: "PRODUCT", description: "I ship end-to-end MERN and Next.js products, including AI-powered features with Gemini and NLP workflows." }
];

export default function Services() {

  const [isRevealing, setIsRevealing] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const servicesSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(servicesSectionRef, { margin: "-20%" });

  useScroll({
    target: servicesSectionRef,
    offset: ["start 80%", "center 50%"]
  });

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

        if (servicesSectionRef.current) {

          const rect = servicesSectionRef.current.getBoundingClientRect();

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
      id="services"
      ref={servicesSectionRef}
      className={`relative w-full pt-24 md:pt-40 pb-16 md:pb-20 flex flex-col justify-center snap-start transition-all duration-300 ${isRevealing ? "z-50" : "z-10"}`}
    >
      <BaseLayer
        servicesList={servicesList}
        hoveredService={hoveredService}
        setHoveredService={setHoveredService}
      />
      <MaskLayer
        maskRadius={maskRadius}
        clipPath={clipPath}
        servicesList={servicesList}
      />

    </section>

  );

}
