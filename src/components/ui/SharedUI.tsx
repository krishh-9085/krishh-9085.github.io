"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useLenis } from "lenis/react";

const SOCIAL_LINKS = {
  github: "https://github.com/krishh-9085",
  instagram: "https://instagram.com/__krishx.1",
  linkedin: "https://linkedin.com/in/krishna-rohilla",
  whatsapp: "https://wa.me/919582131172"
};

function MagneticIcon({ children, href }: { children: React.ReactNode, href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const iconX = useMotionValue(0);
  const iconY = useMotionValue(0);

  // Physics config for that buttery drag effect - Even more loose and responsive
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothIconX = useSpring(iconX, springConfig);
  const smoothIconY = useSpring(iconY, springConfig);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate center of container
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Delta between mouse and center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Background circle follows very aggressively (exceeds cursor slightly)
    x.set(distanceX * 1.5);
    y.set(distanceY * 1.5);
    // Icon follows significantly — intense magnetic feel
    iconX.set(distanceX * 0.9);
    iconY.set(distanceY * 0.9);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    iconX.set(0);
    iconY.set(0);
  };

  return (
    <a
      href={href}
      className="relative flex items-center justify-center w-12 h-12 outline-none group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Layer: Orange Circle */}
      <motion.div
        className="absolute w-10 h-10 bg-[rgb(235,89,57)] rounded-full z-0 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ x: smoothX, y: smoothY }}
      />

      {/* Foreground Layer: Icon moves with cursor too */}
      <motion.div
        className={`relative z-10 transition-colors duration-300 ${isHovered ? "text-[#0a0a0a]" : "text-[rgb(183,171,152)]"}`}
        style={{ x: smoothIconX, y: smoothIconY }}
      >
        {children}
      </motion.div>
    </a>
  );
} function MagneticLogo({
  mobileReveal,
  onScrollTo
}: {
  mobileReveal: boolean
  onScrollTo: (e: React.MouseEvent<HTMLAnchorElement>, target: string) => void
}) {

  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const iconX = useMotionValue(0)
  const iconY = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 }

  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)

  const smoothIconX = useSpring(iconX, springConfig)
  const smoothIconY = useSpring(iconY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {

    const rect = e.currentTarget.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX * 1.3)
    y.set(distanceY * 1.3)

    iconX.set(distanceX * 0.7)
    iconY.set(distanceY * 0.7)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)

    x.set(0)
    y.set(0)

    iconX.set(0)
    iconY.set(0)
  }

  return (

    <a
      href="#home"
      onClick={(e) => onScrollTo(e, "#home")}
      onMouseEnter={() => {
        if (window.matchMedia("(min-width:768px)").matches) setIsHovered(true)
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-14 h-14 md:w-12 md:h-12 cursor-pointer"
    >

      {/* Hover circle */}
      <motion.div
        className="absolute w-10 h-10 bg-[rgb(235,89,57)] rounded-full z-0 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered || mobileReveal ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          x: smoothX,
          y: smoothY
        }}
      />

      {/* SVG Logo */}
      <motion.div
        className="relative z-10 flex items-center justify-center pointer-events-none"
        style={{
          x: smoothIconX,
          y: smoothIconY
        }}
      >

        <svg viewBox="0 0 220 220" className="w-9 h-9">

          <defs>
            <mask id="catCutoutLogo">

              <rect width="100%" height="100%" fill="white" />

              {/* Correct silhouette */}
              <path
                d="
                M40 220
                L82 70
                L95 105
                L125 105
                L138 70
                L180 220
                Z
                "
                fill="black"
              />

              {/* Eyes */}
              <circle cx="96" cy="140" r="6.5" fill="white" />
              <circle cx="124" cy="140" r="6.5" fill="white" />

            </mask>
          </defs>

          <circle
            cx="110"
            cy="110"
            r="100"
            fill={isHovered ? "#0a0a0a" : "#b7ab98"}
            mask="url(#catCutoutLogo)"
          />

        </svg>

      </motion.div>

    </a>

  )
}

export default function SharedUI() {
  const [mobileReveal, setMobileReveal] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lenis = useLenis();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Buttery smooth easing
      });
    }
  };

  useEffect(() => {
    const sections = ["home", "about", "services", "experience", "work", "motto"];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(el => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // Detect when section is in middle 60% of viewport
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach(el => observer.observe(el!));

    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);

    if (nextState) {
      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/click.mp3');
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const handleMobileReveal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMobileReveal(customEvent.detail.reveal);
    };

    const handleGlobalPointerUp = () => {
      if (mobileReveal) {
        window.dispatchEvent(new CustomEvent("mobile-mask-reveal", { detail: { reveal: false } }));
      }
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    window.addEventListener("pointerup", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
    };
  }, [mobileReveal]);

  useEffect(() => {
    if (mobileReveal) {
      // Calculate scrollbar width for compensation
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.setProperty("--scrollbar-width", "0px");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.setProperty("--scrollbar-width", "0px");
    };
  }, [mobileReveal]);

  const navLinks = [
    { label: "ABOUT", href: "#about", target: "about" },
    { label: "WORK", href: "#work", target: "work" },
    { label: "CONTACT", href: "#motto", target: "motto" },
  ];

  return (
    <>
      {/* Top Left Logo — Magnetic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-6 md:top-10 left-8 md:left-[4vw] z-[60]"
      >
        <MagneticLogo mobileReveal={mobileReveal} onScrollTo={handleScrollTo} />
      </motion.div>

      {/* Top Right Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          paddingRight: mobileReveal ? "var(--scrollbar-width)" : "0px"
        }}
        transition={{ duration: 1, delay: 0.6 }}
        className={`fixed top-6 md:top-10 right-8 md:right-[4vw] z-[60] flex flex-col items-end gap-2 text-[0.75rem] font-bold tracking-widest transition-colors duration-300 ${mobileReveal ? "text-[#0a0a0a]" : "text-[rgb(183,171,152)]"}`}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.target || (link.target === "about" && activeSection === "services") || (link.target === "about" && activeSection === "experience");
          // Note: grouping services and experience under "About" logic or keeping it simple. 
          // Let's refine the active check for better accuracy
          const isExplicitlyActive = activeSection === link.target;
          const isImplicitlyActive = link.target === "about" && ["about", "services", "experience"].includes(activeSection);

          const finalActive = isExplicitlyActive || isImplicitlyActive;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`relative transition-all duration-300 flex items-center gap-2 ${mobileReveal
                ? (finalActive ? "text-[#0a0a0a]" : "text-[#0a0a0a]/40 hover:text-[#0a0a0a]")
                : (finalActive ? "text-white" : "text-[rgb(183,171,152)]/60 hover:text-white")
                }`}
            >
              <span className="relative">
                {link.label}
                {finalActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${mobileReveal ? "bg-[#0a0a0a]" : "bg-[rgb(235,89,57)]"}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </span>
            </a>
          );
        })}
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        // Increased gap from gap-2 to gap-4 to match the spacing in the image
        className="fixed bottom-6 md:bottom-10 left-8 md:left-[4vw] z-[50] hidden md:flex flex-col gap-1 text-[rgb(183,171,152)]"
      >
        <MagneticIcon href={SOCIAL_LINKS.github}>
          <Github size={18} strokeWidth={2.5} />
        </MagneticIcon>

        <MagneticIcon href={SOCIAL_LINKS.instagram}>
          <Instagram size={18} strokeWidth={2.5} />
        </MagneticIcon>

        <MagneticIcon href={SOCIAL_LINKS.linkedin}>
          {/* Custom Solid 'in' text (no box) */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.8 21H1.6V7.3h4.2V21zM3.7 5.5C2.3 5.5 1.2 4.4 1.2 3 1.2 1.6 2.3 0.5 3.7 0.5c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5zm18.3 15.5h-4.2v-6.7c0-1.6-.6-2.7-2.1-2.7-1.1 0-1.8-.8-2.1 1.5-.1.3-.1.7-.1 1.1v6.8H9.2s.1-12.5 0-13.8h4.2v2c.6-.9 1.6-2.1 3.9-2.1 2.8 0 4.9 1.8 4.9 5.8v8.1z" />
          </svg>
        </MagneticIcon>
      </motion.div>
      {/* Mobile "Press and Hold" Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[50]"
      >
        <motion.button
          className="relative flex items-center justify-center w-[85px] h-[85px] rounded-full touch-none bg-[#0a0a0a]/40 backdrop-blur-md shadow-2xl outline-none select-none"
          animate={{
            scale: mobileReveal ? 0 : 1,
            opacity: mobileReveal ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onPointerDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Clear any existing timeout
            if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);

            // Start a new one — 500ms delay
            pressTimeoutRef.current = setTimeout(() => {
              window.dispatchEvent(new CustomEvent("mobile-mask-reveal", { detail: { reveal: true, x, y } }));
            }, 500);
          }}
          onPointerUp={() => {
            if (pressTimeoutRef.current) {
              clearTimeout(pressTimeoutRef.current);
              pressTimeoutRef.current = null;
            }
          }}
          onPointerLeave={() => {
            if (pressTimeoutRef.current) {
              clearTimeout(pressTimeoutRef.current);
              pressTimeoutRef.current = null;
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Rotating Text Ring */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
              <defs>
                <path
                  id="textPath"
                  d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                />
              </defs>
              <text className="text-[13px] font-black uppercase" fill="rgb(183,171,152)">
                <textPath href="#textPath" startOffset="0%" textLength="198" lengthAdjust="spacing">
                  PRESS - PRESS - PRESS -
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Pointing Hand Icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="rgb(235,89,57)" xmlns="http://www.w3.org/2000/svg" className="absolute z-10 pointer-events-none">
            <path d="M12.923 10.423V2.5A1.5 1.5 0 0011.423 1 1.5 1.5 0 009.923 2.5v11L8.14 12.38a1.5 1.5 0 00-2.12 0 1.5 1.5 0 000 2.12l4.48 4.48a3 3 0 002.12.88h3.303a2.5 2.5 0 002.483-2.155l.847-6.096a2 2 0 00-1.983-2.277h-4.347z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Bottom Right Sound Switch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          paddingRight: mobileReveal ? "var(--scrollbar-width)" : "0px"
        }}
        transition={{ duration: 1, delay: 0.8 }}
        className="fixed bottom-6 md:bottom-10 right-8 md:right-[4vw] z-[60] flex justify-center items-center transform-gpu w-[40px] h-[120px]"
      >
        <button
          onClick={toggleSound}
          className={`group vertical-text transform rotate-180 flex items-center text-[0.7rem] font-bold tracking-[0.2em] transition-colors duration-300 outline-none ${mobileReveal ? "text-[#0a0a0a] opacity-100" : "text-[rgb(183,171,152)] opacity-60 hover:opacity-100"}`}
        >
          <span>SOUND</span>

          {/* The Slot-Machine Window - Adjusted for Vertical Flow */}
          <span className="relative overflow-hidden h-[3.5em] w-[1.2em] flex justify-center items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={isSoundOn ? "on" : "off"}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute transition-colors duration-300 group-hover:text-[rgb(235,89,57)]"
              >
                {isSoundOn ? "ON" : "OFF"}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </motion.div>
    </>
  );
}
