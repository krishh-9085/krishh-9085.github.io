"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  year: string;
  role: string;
  revealRole: string;
  company: string;
}

interface ExperienceMaskLayerProps {
  clipPath: any;
  experiences: ExperienceItem[];
}

export default function MaskLayer({ clipPath, experiences }: ExperienceMaskLayerProps) {
  return (
    <>
      {/* ORANGE MASK OVERLAY */}

      <motion.div
        className="absolute inset-0 bg-[rgb(235,89,57)] z-20 pointer-events-none"
        style={{ clipPath }}
      >

        <div className="absolute inset-0 py-14 md:py-20 flex flex-col">

          <div className="mb-6 md:mb-8 px-8 md:px-[13vw]">
            <p className="text-[#0a0a0a] text-sm font-bold tracking-[0.4em] uppercase opacity-70">
              HISTORY
            </p>
          </div>

          <div className="w-full flex flex-col text-left">

            {experiences.map((exp) => (

              <div
                key={`mask-${exp.year}`}
                className="flex flex-col md:flex-row items-baseline border-t border-[#0a0a0a]/20 py-6 md:py-8"
              >

                <div className="md:w-1/3 text-2xl md:text-3xl font-black text-[#0a0a0a] mb-3 md:mb-0 px-8 md:px-[13vw]">
                  {exp.year}
                </div>

                <div className="md:w-2/3 flex flex-col px-8 md:pl-0 md:pr-[13vw]">

                  <span className="text-2xl md:text-4xl font-bold text-[#0a0a0a] tracking-tight">
                    {exp.revealRole}
                  </span>

                  <span className="text-sm md:text-base text-[#0a0a0a]/70 mt-0.5 md:mt-1 font-medium">
                    {exp.company}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </motion.div>
    </>
  );
}
