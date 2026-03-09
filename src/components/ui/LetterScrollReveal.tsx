"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type ScrollOffset = [
    `${"start" | "center" | "end"} ${number}%`,
    `${"start" | "center" | "end"} ${number}%`
];

type LetterScrollRevealProps = {
    text: string;
    className?: string;
    fromColor?: string;
    toColor?: string;
    offset?: ScrollOffset;
    highlights?: string[];
    highlightColor?: string;
};

type AnimatedLetterProps = {
    char: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
    fromColor: string;
    toColor: string;
};

function AnimatedLetter({ char, index, total, progress, fromColor, toColor }: AnimatedLetterProps) {
    const start = index / total;
    const end = start + 1 / total;
    const color = useTransform(progress, [start, end], [fromColor, toColor]);

    if (char === " ") {
        return <span>&nbsp;</span>;
    }

    return <motion.span style={{ color }}>{char}</motion.span>;
}

export default function LetterScrollReveal({
    text,
    className,
    fromColor = "rgba(255,255,255,0.1)",
    toColor = "rgb(183,171,152)",
    offset = ["start 80%", "end 50%"],
    highlights = [],
    highlightColor = "rgb(235,89,57)", // Default orange
}: LetterScrollRevealProps) {
    const containerRef = useRef<HTMLHeadingElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset,
    });

    // Split text into words to handle highlighting
    const words = text.split(" ");
    let charCounter = 0;
    const totalChars = text.length;

    return (
        <h2 ref={containerRef} className={className}>
            {words.map((word, wordIndex) => {
                const shouldHighlight = highlights.includes(word.replace(/[.,!?;:]/g, ""));
                const wordChars = word.split("");
                
                const wordElement = (
                    <span key={`word-${wordIndex}`} className="whitespace-nowrap">
                        {wordChars.map((char, charIndex) => {
                            const globalIndex = charCounter++;
                            return (
                                <AnimatedLetter
                                    key={`char-${globalIndex}`}
                                    char={char}
                                    index={globalIndex}
                                    total={totalChars}
                                    progress={scrollYProgress}
                                    fromColor={fromColor}
                                    toColor={shouldHighlight ? highlightColor : toColor}
                                />
                            );
                        })}
                        {/* Add space after word if it's not the last one */}
                        {wordIndex < words.length - 1 && (
                            <AnimatedLetter
                                key={`space-${charCounter++}`}
                                char=" "
                                index={charCounter - 1}
                                total={totalChars}
                                progress={scrollYProgress}
                                fromColor={fromColor}
                                toColor={toColor}
                            />
                        )}
                    </span>
                );
                return wordElement;
            })}
        </h2>
    );
}
