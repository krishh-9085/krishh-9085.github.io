"use client";

import { motion, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

function ProjectCardMask({ project, range, targetScale, progress, index }: any) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky top-[10vh] md:top-[12vh] w-full flex items-center justify-center mb-[8vh] md:mb-[10vh]"
      style={{ zIndex: 50 + index }}
    >
      <motion.div
        style={{ scale, backgroundColor: "#eb5939" }}
        className="relative w-full aspect-[4/5] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#eb5939] border border-[#0a0a0a]/10 flex flex-col justify-end p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] will-change-transform"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-multiply"
            onError={(e) => {
              e.currentTarget.src = "/vr-bg.png";
            }}
          />
          <div className="absolute inset-0 bg-[#eb5939]/70"></div>
          <span className="text-[#0a0a0a]/12 text-[12rem] md:text-[25rem] font-black absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 select-none">
            {project.id}
          </span>
        </div>

        <div className="relative z-20 flex flex-col justify-between h-full">
          <div className="flex justify-end gap-3 md:gap-4">
            <div className="px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-[#0a0a0a]/20 text-[#0a0a0a] flex items-center gap-2 font-black text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
              <ExternalLink size={16} strokeWidth={3} />
              <span>{project.maskLiveLabel}</span>
            </div>

            <div className="px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-[#0a0a0a]/20 text-[#0a0a0a] flex items-center gap-2 font-black text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
              <Github size={16} strokeWidth={2.5} />
              <span>{project.maskGithubLabel}</span>
            </div>
          </div>

          <div className="w-full flex-1 flex items-end">
            <div className="w-full">
              <h2 className="text-[#0a0a0a] text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-3 md:mb-5">
                {project.title}
              </h2>
              <p className="text-[#0a0a0a]/85 text-xs md:text-base font-bold tracking-[0.05em] md:tracking-[0.08em]">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface WorkMaskLayerProps {
  workClipPath: any;
  projects: any[];
  smoothProgress: any;
}

export default function MaskLayer({ workClipPath, projects, smoothProgress }: WorkMaskLayerProps) {
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-[#eb5939] z-[100] pointer-events-none will-change-transform will-change-[clip-path]"
        style={{
          clipPath: workClipPath,
          backgroundColor: "#eb5939"
        }}
      >
        <div className="px-8 md:px-[13vw]">
          <div className="h-[40vh] md:h-screen flex flex-col justify-center">
            <h1 className="text-[#0a0a0a] text-5xl md:text-9xl font-black uppercase">
              SELECTED
              <br />
              <span>WORKS</span>
            </h1>
          </div>

          <div className="relative">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.05;
              const start = i * (0.9 / projects.length);
              return (
                <ProjectCardMask
                  key={`mask-${project.id}`}
                  project={project}
                  progress={smoothProgress}
                  range={[start, 0.9]}
                  targetScale={targetScale}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
