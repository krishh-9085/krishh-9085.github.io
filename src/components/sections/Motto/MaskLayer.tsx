"use client";

import { motion } from "framer-motion";

interface MottoMaskLayerProps {
  maskOverflow: number;
  mottoClipPath: any;
}

export default function MaskLayer({ maskOverflow, mottoClipPath }: MottoMaskLayerProps) {
  return (
    <>
      <motion.div
        className="absolute z-20 bg-[rgb(235,89,57)] pointer-events-none"
        style={{
          top: -maskOverflow,
          right: -maskOverflow,
          bottom: -maskOverflow,
          left: -maskOverflow,
          clipPath: mottoClipPath
        }}
      >
        <div
          className="absolute flex flex-col items-center justify-center p-4"
          style={{
            top: maskOverflow,
            right: maskOverflow,
            bottom: maskOverflow,
            left: maskOverflow
          }}
        >
          <div className="flex flex-col items-center text-center w-full px-8 md:px-[13vw] pointer-events-none">
            {/* Invisible MY MOTTO spacer to match base layer height exactly */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#0a0a0a] text-sm md:text-sm font-bold tracking-[0.4em] uppercase">MY</span>
              <div className="w-12 h-[2px] bg-[#0a0a0a]"></div>
              <span className="text-[#0a0a0a] text-sm md:text-sm font-bold tracking-[0.4em] uppercase">MOTTO</span>
            </div>

            <div className="grid place-items-center">
              {/* INVISIBLE Base Spacer (ensures identical height) */}
              <h2 className="col-start-1 row-start-1 text-transparent invisible pointer-events-none text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 text-center" aria-hidden="true">
                GOOD DESIGN<br />IS HONEST
              </h2>

              {/* VISIBLE Reveal Text */}
              <h2 className="col-start-1 row-start-1 text-[#0a0a0a] text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 text-center">
                NOT ALL<br />HONEST DESIGN <br />IS GOOD
              </h2>
            </div>

            {/* Invisible Dieter Rams spacer to match base layer height exactly */}
            <p className="text-[#0a0a0a] text-sm md:text-base font-bold tracking-widest opacity-80">
              Dieter Rams
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
