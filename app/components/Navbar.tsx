"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { IoMoon, IoSunny } from "react-icons/io5";

function playToggleSound() {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(560, now);
    oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.06);
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.addEventListener(
        "ended",
        () => {
            void audioContext.close().catch(() => undefined);
        },
        { once: true },
    );
    oscillator.start(now);
    oscillator.stop(now + 0.06);
}

export function Navbar() {  
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }

        return window.localStorage.getItem("theme") !== "light";
    });
    const isThemeTransitioning = useRef(false);

    function syncDocumentTheme(nextIsDark: boolean) {
        document.documentElement.classList.toggle("dark", nextIsDark);
        window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    }

    useEffect(() => {
        syncDocumentTheme(isDark);
    }, [isDark]);

    function applyTheme(nextIsDark: boolean) {
        syncDocumentTheme(nextIsDark);
        setIsDark(nextIsDark);
    }

    function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
        if (isThemeTransitioning.current) {
            return;
        }

        playToggleSound();

        const nextIsDark = !isDark;
        const buttonRect = event.currentTarget.getBoundingClientRect();
        const originX = buttonRect.left + buttonRect.width / 2;
        const originY = buttonRect.top + buttonRect.height / 2;

        if (
            !document.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            applyTheme(nextIsDark);
            return;
        }

        isThemeTransitioning.current = true;

        const endRadius = Math.hypot(
            Math.max(originX, window.innerWidth - originX),
            Math.max(originY, window.innerHeight - originY),
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                applyTheme(nextIsDark);
            });
        });

        transition.ready
            .then(() => {
                const reveal = document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${originX}px ${originY}px)`,
                            `circle(${endRadius}px at ${originX}px ${originY}px)`,
                        ],
                    },
                    {
                        duration: 650,
                        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                        fill: "both",
                        pseudoElement: "::view-transition-new(root)",
                    },
                );

                return reveal.finished;
            })
            .catch(() => {
                // A cancelled transition already leaves the new theme applied.
            });

        transition.finished.finally(() => {
            isThemeTransitioning.current = false;
        });
    }

    return(
        <div className="flex items-center justify-center">
            <div className="py-2 z-20 flex w-[90%] items-center justify-between ">
            <div className="font-display text-xl text-portfolio-text-bright">YASHIKA</div>
            <div className="flex gap-6 items-center justify-center ">
                <a href="#experience" className="text-sm text-portfolio-nav-text transition-colors hover:text-portfolio-text-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent">Work</a>
                <a href="#projects" className="text-sm text-portfolio-nav-text transition-colors hover:text-portfolio-text-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent">Projects</a>
                <a href="#blog" className="text-sm text-portfolio-nav-text transition-colors hover:text-portfolio-text-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent">Writing</a>
                <a href="#contact" className="text-sm text-portfolio-nav-text transition-colors hover:text-portfolio-text-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent">Contact</a>
            </div>
            <button
                type="button"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                onClick={toggleTheme}
                className="grid size-8 place-items-center rounded-full text-portfolio-text-bright shadow-inner transition-[background-color,transform] duration-300 ease-out hover:scale-105 hover:bg-white/45 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
                <span key={isDark ? "sun" : "moon"} className="theme-toggle-icon">
                    {isDark ? <IoSunny /> : <IoMoon />}
                </span>
            </button>
        </div>
        </div>
    )
}
