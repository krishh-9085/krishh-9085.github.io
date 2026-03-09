"use client";

import { motion } from "framer-motion";
import LetterScrollReveal from "@/components/ui/LetterScrollReveal";

interface RevealWord {
  text: string;
  maskColor: string;
  className?: string;
}

interface AboutBaseLayerProps {
  handleAboutMouseEnter: () => void;
  handleAboutMouseLeave: () => void;
  revealWords: RevealWord[];
}

export default function BaseLayer({ handleAboutMouseEnter, handleAboutMouseLeave, revealWords }: AboutBaseLayerProps) {
  return (
    <>
      {/* Base Layer */}
      <div
        className="w-full z-10 flex flex-col gap-10"
        onMouseEnter={handleAboutMouseEnter}
        onMouseLeave={handleAboutMouseLeave}
      >
        <div className="pl-8 md:pl-[13vw] pr-8 md:pr-[13vw]">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-[rgb(183,171,152)] text-sm font-bold tracking-[0.4em] uppercase opacity-70"
          >
            ABOUT ME
          </motion.p>
        </div>
        <div className="pl-8 md:pl-[13vw] pr-8 md:pr-16 grid">
          {/* Base Layer Visible Text */}
          <LetterScrollReveal
            text="I'm a FULLSTACK developer building scalable MERN and Next.js apps with strong APIs and clean frontend systems."
            className="text-5xl md:text-7xl lg:text-[4.5vw] font-bold tracking-tighter leading-[1.05] flex flex-wrap col-start-1 row-start-1 max-w-6xl"
            fromColor="rgba(255,255,255,0.1)"
            toColor="rgb(183,171,152)"
            offset={["start 80%", "end 50%"]}
            highlights={["FULLSTACK", "APIs"]}
          />

          {/* Hidden Layout Placeholder for Reveal Text Height */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-[4.5vw] font-bold tracking-tighter leading-[1.05] flex flex-wrap col-start-1 row-start-1 invisible pointer-events-none max-w-6xl"
            aria-hidden="true"
          >
            {revealWords.map((word, i) => (
              <span
                key={i}
                className={`mr-[0.25em] ${word.className || ''}`}
              >
                {word.text}
              </span>
            ))}
          </motion.h2>
        </div>
      </div>
    </>
  );
}
