"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type ReactNode } from "react";

type SmoothScrollProviderProps = {
    children: ReactNode;
};

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useLenis(() => {
        ScrollTrigger.update();
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
