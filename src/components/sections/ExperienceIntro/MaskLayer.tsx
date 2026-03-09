"use client";

import { motion } from "framer-motion";

interface ExperienceIntroMaskLayerProps {
  maskOverflow: number;
  introClipPath: any;
}

export default function MaskLayer({ maskOverflow, introClipPath }: ExperienceIntroMaskLayerProps) {
  return (
    <>
      {/* Reveal Layer */}
      <motion.div
        className="absolute bg-[rgb(235,89,57)] z-20 pointer-events-none"
        style={{
          top: -maskOverflow,
          right: -maskOverflow,
          bottom: -maskOverflow,
          left: -maskOverflow,
          clipPath: introClipPath
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center bg-[rgb(235,89,57)]"
          style={{
            top: maskOverflow,
            right: maskOverflow,
            bottom: maskOverflow,
            left: maskOverflow
          }}
        >
          <div className="w-full px-8 md:px-[13vw] flex flex-col">
            <p className="text-[#0a0a0a] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-12 opacity-80">
              EXPERIENCE
            </p>

            <div className="grid">
              {/* INVISIBLE Base Text Spacer */}
              <h1 className="col-start-1 row-start-1 text-5xl md:text-7xl lg:text-[4.5vw] font-bold leading-[1.05] tracking-tighter invisible pointer-events-none max-w-6xl" aria-hidden="true">
                Hands-on <span>fullstack experience</span> through internships, MERN product builds, and AI-powered application development.
              </h1>

              {/* VISIBLE Reveal Text */}
              <h1 className="col-start-1 row-start-1 text-5xl md:text-7xl lg:text-[4.5vw] font-bold leading-[1.05] tracking-tighter text-[#0a0a0a] max-w-6xl">
                From SHIPPING PROJECTS to executing 500+ test cases, I focus on scalable architecture and reliable user outcomes.
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
