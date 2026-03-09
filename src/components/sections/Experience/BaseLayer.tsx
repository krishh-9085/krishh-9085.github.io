"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  year: string;
  role: string;
  revealRole: string;
  company: string;
}

interface ExperienceBaseLayerProps {
  experiences: ExperienceItem[];
  hoveredExperience: number | null;
  setHoveredExperience: any;
}

export default function BaseLayer({ experiences, hoveredExperience, setHoveredExperience }: ExperienceBaseLayerProps) {
  return (
    <>
      {/* BASE LAYER */}

      <div className="w-full z-10 flex flex-col">

        <div className="mb-6 md:mb-8 px-8 md:px-[13vw]">
          <p className="text-[rgb(183,171,152)] text-sm font-bold tracking-[0.4em] uppercase opacity-70">
            HISTORY
          </p>
        </div>


        <div className="w-full flex flex-col text-left">

          {experiences.map((exp, index) => {

            const isHovered = hoveredExperience === index;

            return (

              <motion.div
                key={exp.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative w-full border-t border-white/10 overflow-hidden select-none"
              >

                {/* DESKTOP HOVER BACKGROUND */}

                <div
                  className={`hidden md:block absolute top-0 bottom-0 w-full left-0 transition-transform duration-500 ease-out z-0 origin-center bg-[rgb(235,89,57)] ${isHovered ? "scale-y-100" : "scale-y-0"
                    }`}
                />

                {/* CONTENT */}

                <div className="relative z-10 flex flex-col md:flex-row items-baseline w-max max-w-full py-6 md:py-8">

                  {/* YEAR */}

                  <div
                    className={`w-[100vw] md:w-[33.33vw] shrink-0 text-2xl md:text-3xl font-black mb-3 md:mb-0 transition-colors duration-500 px-8 md:px-[13vw] ${isHovered ? "text-[#0a0a0a]" : "text-[rgb(183,171,152)]"
                      }`}
                  >
                    {exp.year}
                  </div>

                  {/* ROLE */}

                  <div
                    className="flex flex-col shrink px-8 md:pl-0 pr-8 md:pr-[13vw] cursor-default md:cursor-pointer"
                  >

                    <div
                      className="inline-flex flex-col cursor-none md:cursor-pointer"
                      data-hide-cursor="true"
                      onMouseEnter={() => {
                        if (window.matchMedia("(min-width: 768px)").matches) {
                          setHoveredExperience(index);
                        }
                      }}
                      onMouseLeave={() => {
                        if (window.matchMedia("(min-width: 768px)").matches) {
                          setHoveredExperience(null);
                        }
                      }}
                    >
                      <span
                        className={`text-2xl md:text-4xl font-bold tracking-tight transition-colors duration-500 ${isHovered ? "text-[#0a0a0a]" : "text-[rgb(183,171,152)]"
                          }`}
                      >
                        {exp.role}
                      </span>

                      <span
                        className={`text-sm md:text-base mt-0.5 md:mt-1 font-medium transition-colors duration-500 ${isHovered ? "text-[#0a0a0a]/70" : "text-white/40"
                          }`}
                      >
                        {exp.company}
                      </span>
                    </div>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>
    </>
  );
}
