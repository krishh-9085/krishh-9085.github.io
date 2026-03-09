"use client";

import { motion } from "framer-motion";
import LetterScrollReveal from "@/components/ui/LetterScrollReveal";

interface ExperienceIntroBaseLayerProps {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export default function BaseLayer({ handleMouseEnter, handleMouseLeave }: ExperienceIntroBaseLayerProps) {
  return (
    <>
      {/* Base Layer */}
      <div
        className="w-full z-10 flex flex-col px-8 md:px-[13vw]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[rgb(183,171,152)] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-12 opacity-80"
        >
          EXPERIENCE
        </motion.p>

        {/* CSS Grid forces both visible and invisible text to overlap and dictate container height */}
        <div className="grid">
          {/* VISIBLE Base Text with Scrolling Reveal */}
          <LetterScrollReveal
            text="Hands-on fullstack experience through internships, MERN product builds, and AI-powered application development."
            className="col-start-1 row-start-1 text-5xl md:text-7xl lg:text-[4.5vw] font-bold leading-[1.05] tracking-tighter max-w-6xl flex flex-wrap"
            highlights={["fullstack", "AI-powered"]}
            fromColor="rgba(255,255,255,0.1)"
            toColor="rgb(183,171,152)"
            offset={["start 80%", "end 40%"]}
          />

          {/* INVISIBLE Reveal Text Spacer */}
          <h1 className="col-start-1 row-start-1 text-5xl md:text-7xl lg:text-[4.5vw] font-bold leading-[1.05] tracking-tighter invisible pointer-events-none max-w-6xl" aria-hidden="true">
            From <span>SHIPPING PROJECTS</span> to executing 500+ test cases, I focus on scalable architecture and reliable user outcomes.
          </h1>
        </div>
      </div>
    </>
  );
}
