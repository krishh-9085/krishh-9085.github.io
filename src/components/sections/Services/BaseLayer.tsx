"use client";

import LetterScrollReveal from "@/components/ui/LetterScrollReveal";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesBaseLayerProps {
  servicesList: ServiceItem[];
  hoveredService: number | null;
  setHoveredService: any;
}

export default function BaseLayer({ servicesList, hoveredService, setHoveredService }: ServicesBaseLayerProps) {
  return (
    <>
      <div className="w-full z-10 flex flex-col">

        {/* HEADER */}

        <div className="w-full pl-6 md:pl-[13vw] mb-6 md:mb-8">

          <LetterScrollReveal
            text="WHAT I DO"
            className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase opacity-70"
            fromColor="rgba(255,255,255,0.1)"
            toColor="rgb(183,171,152)"
            offset={["start 85%", "end 55%"]}
          />

        </div>


        {/* SERVICES */}

        <div className="w-full flex flex-col">

          {servicesList.map((service, index) => {

            const isHovered = hoveredService === index;

            return (

              <div
                key={service.title}
                className="relative w-full border-t border-white/10 flex items-center justify-between transition-colors duration-500 overflow-hidden min-h-[85px] md:min-h-[110px]"
                onClick={() => {
                  if (!window.matchMedia("(min-width: 768px)").matches) {
                    setHoveredService(hoveredService === index ? null : index);
                  }
                }}
              >

                {/* ORANGE MASK */}

                <div
                  className={`absolute top-0 bottom-0 w-full left-1/2 -translate-x-1/2 transition-transform duration-500 ease-out z-0 origin-center bg-[rgb(235,89,57)] ${isHovered ? "scale-y-100" : "scale-y-0"
                    }`}
                />

                {/* TITLE */}

                <div
                  className="relative z-10 pl-6 md:pl-[13vw] w-max cursor-none md:cursor-pointer"
                  data-hide-cursor="true"
                  onMouseEnter={() => {
                    if (window.matchMedia("(min-width: 768px)").matches) setHoveredService(index);
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(min-width: 768px)").matches) setHoveredService(null);
                  }}
                >

                  {isHovered ? (

                    <h3 className="text-[13vw] md:text-[11vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.72] text-[#0a0a0a]">
                      {service.title}
                    </h3>

                  ) : (

                    <LetterScrollReveal
                      text={service.title}
                      className="text-[13vw] md:text-[11vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.72]"
                      fromColor="rgba(255,255,255,0.1)"
                      toColor="rgb(183,171,152)"
                      offset={["start 80%", "end 50%"]}
                    />

                  )}

                </div>


                {/* DESCRIPTION (DESKTOP ONLY) */}

                <div
                  className={`hidden md:block relative z-10 w-full md:w-1/4 px-8 md:px-0 md:pr-[13vw] transition-all duration-500 ease-in-out md:text-right ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >

                  <p className="text-[#0a0a0a] text-sm md:text-base font-light leading-tight">
                    {service.description}
                  </p>

                </div>

              </div>

            );

          })}

          <div className="w-full border-t border-white/10" />

        </div>

      </div>
    </>
  );
}
