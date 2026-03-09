"use client";

import { motion } from "framer-motion";

interface HeroMaskLayerProps {
  maskOverflow: number;
  clipPath: any;
}

export default function MaskLayer({ maskOverflow, clipPath }: HeroMaskLayerProps) {
  return (
    <>
      {/* FIX 3: Added will-change-[clip-path] and transform-gpu so the browser prioritizes this animation */}
      <motion.div
        className="absolute bg-[rgb(235,89,57)] z-20 pointer-events-none will-change-[clip-path] transform-gpu"
        style={{
          top: -maskOverflow,
          right: -maskOverflow,
          bottom: -maskOverflow,
          left: -maskOverflow,
          clipPath
        }}
      >
        <div
          className="absolute flex flex-col items-center justify-center text-center text-[#0a0a0a] px-8 md:px-[13vw]"
          style={{
            top: maskOverflow,
            right: maskOverflow,
            bottom: maskOverflow,
            left: maskOverflow
          }}
        >
          <div className="flex flex-col items-center leading-[0.85] font-black uppercase tracking-tighter text-[16vw] md:text-[8vw]  font-medium select-none">
            <div className="text-[0.8rem] md:text-[0.8rem] font-bold tracking-[0.5em] mb-6 md:mb-10 opacity-70 whitespace-nowrap">
              K R I S H N A &nbsp; R O H I L L A
            </div>
            <div className="z-30 whitespace-nowrap">HIDING</div>
            <div className="z-30 whitespace-nowrap">BAD</div>
            <div className="z-30 whitespace-nowrap">SHIT</div>
            <div className="z-30 whitespace-nowrap">SINCE</div>
            <div className="z-30 whitespace-nowrap">2022</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
