"use client";

export default function BaseLayer() {
  return (
    <>
      {/* --- BASE LAYER (Dark Background, Light Text) --- */}
      <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-x-6 gap-y-1 md:gap-6 mt-auto items-end">
        {/* Column 1: CONNECT Header & First Social List */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col">
          <h3 className="text-[rgb(183,171,152)] text-xs font-bold tracking-[0.4em] uppercase mb-10 opacity-70">
            CONNECT
          </h3>

          <ul className="flex flex-col space-y-1">
            {([
              { name: "Github", hoverText: "Open Source", href: "https://github.com/krishh-9085" },
              { name: "Linkedin", hoverText: "Connect", href: "https://linkedin.com/in/krishnarohilla" }
            ]).map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group cursor-none md:cursor-pointer flex items-center py-0 outline-none w-full h-[1.75rem] md:h-[2.5rem]"
                >
                  <div className="w-0 h-0 border-t-[8px] border-t-[#eb5939] border-l-[8px] border-l-transparent mr-4 z-10 transition-colors"></div>

                  <div className="relative z-10 grid flex-1 h-full">
                    <div className="absolute top-[-4px] bottom-[-4px] left-[-8px] right-0 bg-[#eb5939] origin-center transition-transform duration-500 ease-out z-0 scale-y-0 group-hover:scale-y-100"></div>

                    <span className="col-start-1 row-start-1 text-[rgb(183,171,152)] text-xl md:text-3xl font-bold tracking-tight transition-opacity duration-300 group-hover:opacity-0 relative z-10 flex items-center h-full">
                      {link.name}
                    </span>

                    <span className="col-start-1 row-start-1 text-[#0a0a0a] text-xl md:text-3xl font-bold tracking-tight transition-opacity duration-300 flex items-center whitespace-nowrap opacity-0 group-hover:opacity-100 relative z-10 h-full">
                      {link.hoverText}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Second Social List */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col mt-0 md:mt-[2.75rem]">
          <ul className="flex flex-col space-y-1">
            {([
              { name: "Instagram", hoverText: "Not Tiktok", href: "https://instagram.com/krishh_9085" },
              { name: "Whatsapp", hoverText: "Ping me", href: "https://wa.me/919582131172" }
            ]).map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group cursor-none md:cursor-pointer flex items-center py-0 outline-none w-full h-[1.75rem] md:h-[2.5rem]"
                >
                  <div className="w-0 h-0 border-t-[8px] border-t-[#eb5939] border-l-[8px] border-l-transparent mr-4 z-10 transition-colors"></div>

                  <div className="relative z-10 grid flex-1 h-full">
                    <div className="absolute top-[-4px] bottom-[-4px] left-[-8px] right-0 bg-[#eb5939] origin-center transition-transform duration-500 ease-out z-0 scale-y-0 group-hover:scale-y-100"></div>

                    <span className="col-start-1 row-start-1 text-[rgb(183,171,152)] text-xl md:text-3xl font-bold tracking-tight transition-opacity duration-300 group-hover:opacity-0 relative z-10 flex items-center h-full">
                      {link.name}
                    </span>

                    <span className="col-start-1 row-start-1 text-[#0a0a0a] text-xl md:text-3xl font-bold tracking-tight transition-opacity duration-300 flex items-center whitespace-nowrap opacity-0 group-hover:opacity-100 relative z-10 h-full">
                      {link.hoverText}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info (Email / Phone) */}
        <div className="md:col-span-4 flex flex-col justify-end space-y-4 mt-10 md:mt-0">
          {/* Email Block */}
          <a
            href="mailto:rohillakrish2@gmail.com"
            className="relative group cursor-none md:cursor-pointer flex flex-col outline-none w-full"
          >
            <div className="absolute top-[-4px] bottom-[-4px] left-[-16px] right-[-16px] bg-[#eb5939] origin-center transition-transform duration-500 ease-out z-0 scale-y-0 group-hover:scale-y-100"></div>

            <div className="relative z-10 grid">
              <div className="col-start-1 row-start-1 transition-opacity duration-300 flex flex-col justify-center group-hover:opacity-0">
                <p className="text-[rgb(183,171,152)] text-xs font-bold tracking-widest opacity-60 mb-1">
                  Email
                </p>
                <span className="text-[rgb(183,171,152)] text-sm md:text-base font-medium opacity-90 whitespace-nowrap">
                  rohillakrish2@gmail.com
                </span>
              </div>

              <div className="col-start-1 row-start-1 transition-opacity duration-300 flex flex-col justify-center opacity-0 group-hover:opacity-100">
                <p className="text-[#0a0a0a] text-sm font-bold tracking-widest opacity-80 mb-1">
                  100% chance i read it
                </p>
                <span className="text-[#0a0a0a] text-sm md:text-base font-bold whitespace-nowrap">
                  rohillakrish2@gmail.com
                </span>
              </div>
            </div>
          </a>

          {/* Phone Block */}
          <a
            href="tel:9582131172"
            className="relative group cursor-none md:cursor-pointer flex flex-col outline-none w-full mt-2"
          >
            <div className="absolute top-[-4px] bottom-[-4px] left-[-16px] right-[-16px] bg-[#eb5939] origin-center transition-transform duration-500 ease-out z-0 scale-y-0 group-hover:scale-y-100"></div>

            <div className="relative z-10 grid">
              <div className="col-start-1 row-start-1 transition-opacity duration-300 flex flex-col justify-center group-hover:opacity-0">
                <p className="text-[rgb(183,171,152)] text-xs font-bold tracking-widest opacity-60 mb-1">
                  Phone
                </p>
                <span className="text-[rgb(183,171,152)] text-sm md:text-base font-medium opacity-90 whitespace-nowrap">
                  +91 95821 31172
                </span>
              </div>

              <div className="col-start-1 row-start-1 transition-opacity duration-300 flex flex-col justify-center opacity-0 group-hover:opacity-100">
                <p className="text-[#0a0a0a] text-sm font-bold tracking-widest opacity-80 mb-1">
                  90% chance i don't pickup
                </p>
                <span className="text-[#0a0a0a] text-sm md:text-base font-bold whitespace-nowrap">
                  +91 95821 31172
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
