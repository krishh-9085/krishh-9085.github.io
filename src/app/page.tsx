"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ExperienceIntro from "@/components/sections/ExperienceIntro";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Motto from "@/components/sections/Motto";
import Footer from "@/components/layout/Footer";
import SectionReveal from "@/components/ui/SectionReveal";
import SplashScreen from "@/components/ui/SplashScreen";
import SharedUI from "@/components/ui/SharedUI";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isMobileRevealing, setIsMobileRevealing] = useState(false);

  useEffect(() => {
    const handleMobileReveal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsMobileRevealing(customEvent.detail.reveal);
    };

    window.addEventListener("mobile-mask-reveal", handleMobileReveal);
    return () => window.removeEventListener("mobile-mask-reveal", handleMobileReveal);
  }, []);

  return (
    <div className="relative w-full text-[rgb(183,171,152)]">
      <AnimatePresence mode="wait">
        {!isStarted && (
          <SplashScreen onComplete={() => setIsStarted(true)} />
        )}
      </AnimatePresence>

      {isStarted && (
        <>
          <SharedUI />
          {/* Main scrolling content layer */}
          <main className={`relative z-10 w-full ${isMobileRevealing ? "bg-[rgb(235,89,57)]" : "bg-[#0a0a0a]"}`}>
            <SectionReveal>
              <Hero />
            </SectionReveal>
            <SectionReveal>
              <About />
            </SectionReveal>
            <SectionReveal>
              <Services />
            </SectionReveal>
            <SectionReveal>
              <ExperienceIntro />
            </SectionReveal>
            <SectionReveal>
              <Experience />
            </SectionReveal>
            <SectionReveal>
              <Work />
            </SectionReveal>
            <Motto />
          </main>

          {/* Fixed Footer permanently parked in the background */}
          <div className="fixed bottom-0 left-0 right-0 z-0">
            <Footer />
          </div>

          {/* Invisible Spacer to reveal the fixed footer */}
          <div
            id="contact"
            className="relative z-10 w-full pointer-events-none"
            style={{ height: 'var(--footer-height, 0px)' }}
          ></div>
        </>
      )}
    </div>
  );
}
