"use client";

import { motion } from "framer-motion";

interface MottoBaseLayerProps {
  handleTextMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleTextMouseLeave: () => void;
}

export default function BaseLayer({ handleTextMouseMove, handleTextMouseLeave }: MottoBaseLayerProps) {
  return (
    <>
      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0 opacity-40 grayscale pointer-events-none">

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#111111_100%)]"></div>
      </div>

      {/* Content Container (Base Layer) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-8 md:px-[13vw] pointer-events-none">
        <div
          className="pointer-events-auto cursor-none flex flex-col items-center"
          onMouseMove={handleTextMouseMove}
          onMouseLeave={handleTextMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-[rgb(183,171,152)] text-sm md:text-sm font-bold tracking-[0.4em] uppercase">MY</span>
            <div className="w-12 h-[2px] bg-[rgb(183,171,152)]"></div>
            <span className="text-[rgb(183,171,152)] text-sm md:text-sm font-bold tracking-[0.4em] uppercase">MOTTO</span>
          </motion.div>

          <div className="grid place-items-center">
            {/* VISIBLE Base Text */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="col-start-1 row-start-1 text-[rgb(183,171,152)] text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 text-center"
            >
              GOOD DESIGN<br />IS HONEST
            </motion.h2>

            {/* INVISIBLE Reveal Spacer (ensures identical height) */}
            <h2 className="col-start-1 row-start-1 text-transparent invisible pointer-events-none text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 text-center" aria-hidden="true">
              NOT ALL<br />HONEST DESIGN <br />IS GOOD
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[rgb(183,171,152)] text-sm md:text-base font-bold tracking-widest opacity-80"
          >
            Dieter Rams
          </motion.p>
        </div>
      </div>
    </>
  );
}
