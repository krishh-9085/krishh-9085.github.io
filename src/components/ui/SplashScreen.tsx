"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#0d0d0d] flex items-center justify-center p-4 overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* LOGO SECTION - Locked at center */}
        <div className="relative flex items-center justify-center">
          {/* Container for ring and percentage */}
          <div className="relative w-50 h-50 md:w-60 md:h-60 flex items-center justify-center">

            {/* Circular Loader SVG */}
            {!isDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">

                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    fill="transparent"
                    stroke="rgb(183,171,152)"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    initial={false}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </svg>
              </motion.div>
            )}

            {/* Percentage positioned at the top of the ring */}
            {!isDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-1/2 -translate-x-1/2 top-[5%] -translate-y-1/2 z-20"
              >
                <span className="text-[rgb(183,171,152)] text-[10px] md:text-xs font-bold tracking-[0.2em] tabular-nums bg-[#0d0d0d] px-1">
                  {progress}%
                </span>
              </motion.div>
            )}

            {/* Static GIF Logo - Always centered */}
            <div className="relative w-13 h-13 md:w-16 md:h-16 rounded-full items-center justify-center overflow-hidden z-10 bg-[rgb(183,171,152)]">
              <motion.img
                src="/assets/logo.gif"
                alt="Logo"
                className="w-full h-full object-cover scale-[1.15]"
                layout={false}
                animate={{ scale: isDone ? 1.25 : 1.15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* START BUTTON - Positioned absolutely below the logo to prevent shifting */}
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[160px] md:top-[180px] left-1/2 -translate-x-1/2"
              >
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("splash-complete"));
                    onComplete();
                  }}
                  className="group relative px-8 py-3 rounded-full border border-[rgb(183,171,152)]/20 hover:bg-[rgb(183,171,152)] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                >
                  <span className="relative z-10 text-[rgb(183,171,152)] group-hover:text-[#0d0d0d] text-xs font-bold tracking-[0.5em] uppercase transition-colors duration-300">
                    START
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}