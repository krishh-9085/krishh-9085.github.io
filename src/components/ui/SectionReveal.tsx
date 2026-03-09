"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SectionRevealProps = {
    children: ReactNode;
    delay?: number;
};

export default function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            gsap.fromTo(
                sectionRef.current,
                {
                    autoAlpha: 0,
                    y: 56,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    delay,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 82%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return <div ref={sectionRef}>{children}</div>;
}
