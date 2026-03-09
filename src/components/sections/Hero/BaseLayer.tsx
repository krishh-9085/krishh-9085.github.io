"use client";

import { motion } from "framer-motion";

interface HeroBaseLayerProps {
  handleHeroMouseEnter: () => void;
  handleHeroMouseLeave: () => void;
}

export default function BaseLayer({ handleHeroMouseEnter, handleHeroMouseLeave }: HeroBaseLayerProps) {
  return (
    <>
      {/* FIX 1: Added transform-gpu to offload the mix-blend-overlay rendering to the GPU.
        If it's STILL choppy after this, change mix-blend-overlay to just standard opacity.
      */}
      <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay transform-gpu"></div>

      {/* FIX 2: Added transform-gpu to the portrait mask to prevent repaints */}
      <div className="absolute right-0 bottom-0 w-3/4 h-3/4 opacity-20 pointer-events-none transform-gpu">
        <div
          className="w-full h-full grayscale"
          style={{ maskImage: "linear-gradient(to right, transparent, black 50%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 50%)" }}
        >
        </div>
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center text-[rgb(183,171,152)] w-full px-8 md:px-[13vw]"
      >
        <div
          className="inline-flex flex-col items-center"
          onMouseEnter={handleHeroMouseEnter}
          onMouseLeave={handleHeroMouseLeave}
        >
          <div className="flex flex-col items-center leading-[0.85] font-black uppercase tracking-tighter text-[16vw] font-medium md:text-[8vw] select-none pointer-events-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-[0.8rem] md:text-[0.8rem] font-bold tracking-[0.5em] text-[rgb(183,171,152)] mb-6 md:mb-10 text-center whitespace-nowrap pointer-events-auto">
              K R I S H N A &nbsp; R O H I L L A
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="z-30 whitespace-nowrap pointer-events-auto">MAKING</motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="z-30 whitespace-nowrap text-[rgb(235,89,57)] pointer-events-auto">GOOD</motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="z-30 whitespace-nowrap text-[rgb(235,89,57)] pointer-events-auto">SHIT</motion.div>
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="z-30 whitespace-nowrap pointer-events-auto">SINCE</motion.div>
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="z-30 whitespace-nowrap pointer-events-auto">2022</motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
