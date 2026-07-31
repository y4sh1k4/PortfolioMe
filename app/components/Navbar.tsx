"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { IoMoon, IoSunny } from "react-icons/io5";

export function Navbar() {  
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }

        return window.localStorage.getItem("theme") !== "light";
    });

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
        const nextIsDark = !isDark;
        const buttonRect = event.currentTarget.getBoundingClientRect();
        const originX = buttonRect.left + buttonRect.width / 2;
        const originY = buttonRect.top + buttonRect.height / 2;

        if (!document.startViewTransition) {
            applyTheme(nextIsDark);
            return;
        }

        const endRadius = Math.hypot(
            Math.max(originX, window.innerWidth - originX),
            Math.max(originY, window.innerHeight - originY),
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                applyTheme(nextIsDark);
            });
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${originX}px ${originY}px)`,
                        `circle(${endRadius}px at ${originX}px ${originY}px)`,
                    ],
                },
                {
                    duration: 750,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    pseudoElement: "::view-transition-new(root)",
                },
            );
        });
    }

    return(
        <div className="flex items-center justify-center">
            <div className="py-2 z-20 flex w-[90%] items-center justify-between ">
            <div className="font-display text-xl text-portfolio-text-bright">YASHIKA</div>
            <div className="flex gap-6 items-center justify-center ">
                <div className="cursor-pointer text-sm text-portfolio-nav-text hover:text-portfolio-text-bright">Work</div>
                <div className="cursor-pointer text-sm text-portfolio-nav-text hover:text-portfolio-text-bright">Projects</div>
                <div className="cursor-pointer text-sm text-portfolio-nav-text hover:text-portfolio-text-bright">Contact</div>
            </div>
            <button
                type="button"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                onClick={toggleTheme}
                className="grid size-8 place-items-center rounded-full text-portfolio-text-bright shadow-inner transition-colors hover:bg-white/45 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
                {isDark ? <IoSunny /> : <IoMoon />}
            </button>
        </div>
        </div>
    )
}
