"use client";

import { motion } from "framer-motion";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesMaskLayerProps {
  maskRadius: any;
  clipPath: any;
  servicesList: ServiceItem[];
}

export default function MaskLayer({ maskRadius, clipPath, servicesList }: ServicesMaskLayerProps) {
  return (
    <>
      {/* ORANGE MASK SECTION */}

      <motion.div
        className={`absolute inset-0 bg-[rgb(235,89,57)] z-20 pointer-events-none ${maskRadius.get() > 0 ? "z-50" : "z-10"}`}
        style={{ clipPath }}
      >

        <div className="absolute inset-0 flex flex-col justify-start pt-24 md:pt-40 pb-16 md:pb-20">

          <div className="w-full flex flex-col pointer-events-auto">

            <div className="w-full pl-6 md:pl-[13vw] mb-6 md:mb-8">

              <p className="text-[#0a0a0a] text-xs md:text-sm font-bold tracking-[0.4em] uppercase opacity-70">
                WHAT I DO
              </p>

            </div>


            <div className="w-full flex flex-col">

              {servicesList.map((service) => (

                <div
                  key={`mask-${service.title}`}
                  className="w-full border-t border-[#0a0a0a] flex items-center min-h-[85px] md:min-h-[110px]"
                >

                  <div className="w-full py-4 pl-6 md:pl-[13vw] pr-6 md:pr-[13vw]">

                    <p className="text-[#0a0a0a] text-[15px] md:text-[16px] lg:text-lg font-bold leading-snug opacity-90">
                      {service.description}
                    </p>

                  </div>

                </div>

              ))}

              <div className="w-full border-t border-[#0a0a0a]" />

            </div>

          </div>

        </div>

      </motion.div>
    </>
  );
}
