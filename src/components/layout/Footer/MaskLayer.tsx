"use client";

import { motion } from "framer-motion";

interface FooterMaskLayerProps {
  footerClipPath: any;
}

export default function MaskLayer({ footerClipPath }: FooterMaskLayerProps) {
  return (
    <>
      {/* --- MASK LAYER (Orange Background, Dark Text) --- */}
      <motion.div
        className="absolute inset-0 bg-[#eb5939] z-20 pointer-events-none will-change-[clip-path] transform-gpu"
        style={{ clipPath: footerClipPath }}
      >
        <div className="absolute inset-0 pt-20 pb-25 px-8 md:px-[13vw] flex flex-col justify-end">
          <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-x-6 gap-y-1 md:gap-6 pointer-events-auto items-end mt-auto">
            {/* Column 1 Mask: CONNECT */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col">
              <h3 className="text-[#0a0a0a] text-xs font-bold tracking-[0.4em] uppercase mb-10 opacity-70">
                CONNECT
              </h3>

              <ul className="flex flex-col space-y-1">
                {[
                  { name: "Github", hoverText: "Open Source" },
                  { name: "Linkedin", hoverText: "Connect" }
                ].map((link) => (
                  <li
                    key={`mask-${link.name}`}
                    className="relative flex items-center py-0 w-full h-[1.75rem] md:h-[2.5rem]"
                  >
                    <div className="w-0 h-0 border-t-[8px] border-t-[#0a0a0a] border-l-[8px] border-l-transparent mr-4 z-10"></div>

                    <div className="relative z-10 grid flex-1 h-full">
                      <span className="col-start-1 row-start-1 text-transparent text-xl md:text-3xl font-bold tracking-tight select-none flex items-center whitespace-nowrap h-full">
                        {link.name}
                      </span>
                      <span className="col-start-1 row-start-1 text-[#0a0a0a] text-xl md:text-3xl font-bold tracking-tight flex items-center whitespace-nowrap relative z-10 h-full">
                        {link.hoverText}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 Mask: Second List */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col mt-0 md:mt-[2.75rem]">
              <ul className="flex flex-col space-y-1">
                {[
                  { name: "Instagram", hoverText: "Not Tiktok" },
                  { name: "Whatsapp", hoverText: "Ping me" }
                ].map((link) => (
                  <li
                    key={`mask-${link.name}`}
                    className="relative flex items-center py-0 w-full h-[1.75rem] md:h-[2.5rem]"
                  >
                    <div className="w-0 h-0 border-t-[8px] border-t-[#0a0a0a] border-l-[8px] border-l-transparent mr-4 z-10"></div>

                    <div className="relative z-10 grid flex-1 h-full">
                      <span className="col-start-1 row-start-1 text-transparent text-xl md:text-3xl font-bold tracking-tight select-none flex items-center whitespace-nowrap h-full">
                        {link.name}
                      </span>
                      <span className="col-start-1 row-start-1 text-[#0a0a0a] text-xl md:text-3xl font-bold tracking-tight flex items-center whitespace-nowrap relative z-10 h-full">
                        {link.hoverText}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 Mask: Contact Info */}
            <div className="md:col-span-4 flex flex-col justify-end space-y-4 mt-10 md:mt-0">
              {/* Masked Email */}
              <div className="relative flex flex-col">
                <div className="relative z-10 grid">
                  {/* Invisible spacer to match base layer width exactly */}
                  <div className="col-start-1 row-start-1 opacity-0 pointer-events-none">
                    <p className="text-xs font-bold tracking-widest mb-1"> Email </p>
                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                      rohillakrish2@gmail.com
                    </span>
                  </div>

                  {/* Actual mask content */}
                  <div className="col-start-1 row-start-1 flex flex-col justify-center">
                    <p className="text-[#0a0a0a] text-sm font-bold tracking-widest opacity-80 mb-1">
                      100% chance i read it
                    </p>
                    <span className="text-[#0a0a0a] text-sm md:text-base font-bold whitespace-nowrap">
                      rohillakrish2@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Masked Phone */}
              <div className="relative flex flex-col mt-2">
                <div className="relative z-10 grid">
                  {/* Invisible spacer to match base layer width exactly */}
                  <div className="col-start-1 row-start-1 opacity-0 pointer-events-none">
                    <p className="text-xs font-bold tracking-widest mb-1"> Phone </p>
                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                      +91 95821 31172
                    </span>
                  </div>

                  {/* Actual mask content */}
                  <div className="col-start-1 row-start-1 flex flex-col justify-center">
                    <p className="text-[#0a0a0a] text-sm font-bold tracking-widest opacity-80 mb-1">
                      90% chance i don't pickup
                    </p>
                    <span className="text-[#0a0a0a] text-sm md:text-base font-bold whitespace-nowrap">
                      +91 95821 31172
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
