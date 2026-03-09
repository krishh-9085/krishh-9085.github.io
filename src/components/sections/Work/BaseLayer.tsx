"use client";

import { motion, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

function ProjectCard({ project, range, targetScale, progress, index, handleProjectMouseEnter, handleProjectMouseLeave }: any) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky top-[10vh] md:top-[12vh] w-full flex items-center justify-center mb-[8vh] md:mb-[10vh]"
      style={{ zIndex: 50 + index }}
    >
      <motion.div
        style={{ scale }}
        className="group relative w-full aspect-[4/5] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#111111] border border-white/10 flex flex-col justify-end p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform"
        data-force-cursor="true"
        onMouseEnter={handleProjectMouseEnter}
        onMouseLeave={handleProjectMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700 ease-out z-0 flex items-center justify-center overflow-hidden text-center pointer-events-none">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/vr-bg.png";
            }}
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/55"></div>
          <span className="text-white/[0.08] text-[12rem] md:text-[25rem] font-black absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 select-none">
            {project.id}
          </span>
        </div>

        <div className="relative z-20 flex flex-col justify-between h-full">
          <div className="flex justify-end gap-3 md:gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-[#eb5939] text-[#0a0a0a] flex items-center gap-2 font-black text-[9px] md:text-[11px] tracking-[0.2em] uppercase transition-transform hover:scale-105 active:scale-95"
            >
              <ExternalLink size={16} strokeWidth={3} />
              Live
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white/10 text-[rgb(183,171,152)] flex items-center gap-2 font-black text-[9px] md:text-[11px] tracking-[0.2em] uppercase border border-white/10 transition-transform hover:scale-105 active:scale-95"
            >
              <Github size={16} strokeWidth={2.5} />
              Github
            </a>
          </div>

          <div className="max-w-2xl">
            <p className="text-[#eb5939] text-[10px] md:text-sm font-bold tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-4 uppercase">
              {project.category}
            </p>

            <h2 className="text-[rgb(183,171,152)] text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              {project.title}
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface WorkBaseLayerProps {
  projects: any[];
  smoothProgress: any;
  handleProjectMouseEnter: () => void;
  handleProjectMouseLeave: () => void;
}

export default function BaseLayer({ projects, smoothProgress, handleProjectMouseEnter, handleProjectMouseLeave }: WorkBaseLayerProps) {
  return (
    <>
      <div className="px-8 md:px-[13vw]">
        <div className="h-[40vh] md:h-screen flex flex-col justify-center">
          <h1 className="text-[rgb(183,171,152)] text-5xl md:text-9xl font-black uppercase tracking-tighter">
            SELECTED
            <br />
            <span className="text-[#eb5939]">WORKS</span>
          </h1>

          <p className="text-[rgb(183,171,152)]/40 text-sm md:text-lg font-bold tracking-[0.3em] mt-8 uppercase">
            Scroll to explore / {projects.length} artifacts
          </p>
        </div>

        <div className="relative">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            const start = i * (0.9 / projects.length);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                progress={smoothProgress}
                range={[start, 0.9]}
                targetScale={targetScale}
                index={i}
                handleProjectMouseEnter={handleProjectMouseEnter}
                handleProjectMouseLeave={handleProjectMouseLeave}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
