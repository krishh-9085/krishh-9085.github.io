"use client";

import { motion } from "framer-motion";

interface AboutWord {
  text: string;
  color: string;
  maskColor: string;
  className?: string;
}

interface RevealWord {
  text: string;
  maskColor: string;
  className?: string;
}

interface AboutMaskLayerProps {
  maskOverflow: number;
  aboutClipPath: any;
  aboutWords: AboutWord[];
  revealWords: RevealWord[];
}

export default function MaskLayer({ maskOverflow, aboutClipPath, aboutWords, revealWords }: AboutMaskLayerProps) {
  return (
    <>
      <motion.div
        className="absolute bg-[rgb(235,89,57)] z-20 pointer-events-none"
        style={{
          top: -maskOverflow,
          right: -maskOverflow,
          bottom: -maskOverflow,
          left: -maskOverflow,
          clipPath: aboutClipPath
        }}
      >
        <div
          className="absolute flex flex-col justify-center pt-40 pb-20"
          style={{
            top: maskOverflow,
            right: maskOverflow,
            bottom: maskOverflow,
            left: maskOverflow
          }}
        >
          <div className="w-full flex flex-col gap-10">
            <div className="pl-8 md:pl-[13vw]">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-[#0a0a0a] text-sm font-bold tracking-[0.4em] uppercase opacity-70"
              >
                ABOUT ME
              </motion.p>
            </div>
            <div className="pl-8 md:pl-[13vw] pr-8 md:pr-[13vw] grid">
              {/* Hidden Layout Placeholder for Base Text Height */}
              <motion.h2
                className="text-5xl md:text-7xl lg:text-[4.5vw] font-bold tracking-tighter leading-[1.05] flex flex-wrap col-start-1 row-start-1 invisible pointer-events-none max-w-6xl"
                aria-hidden="true"
              >
                {aboutWords.map((word, i) => (
                  <span
                    key={i}
                    className={`mr-[0.25em] ${word.className || ''}`}
                  >
                    {word.text}
                  </span>
                ))}
              </motion.h2>

              {/* Reveal Layer Visible Text */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-[4.5vw] font-bold tracking-tighter leading-[1.05] flex flex-wrap col-start-1 row-start-1 max-w-6xl"
              >
                {revealWords.map((word, i) => (
                  <span
                    key={i}
                    style={{ color: word.maskColor }}
                    className={`mr-[0.25em] ${word.className || ''}`}
                  >
                    {word.text}
                  </span>
                ))}
              </motion.h2>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
