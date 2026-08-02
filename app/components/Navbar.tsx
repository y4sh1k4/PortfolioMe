"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { IoMoon, IoSunny } from "react-icons/io5";
import useSound from "use-sound";

const TOGGLE_CLICK_SOUND =
    "data:audio/wav;base64,UklGRlQCAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YTACAAAAAG41WFCVRJQY5+G2ujq1T9PmBZI0SUnPOsgQvN8Sv+m9GdyhChczb0L0MSkKcd6Zw/vFz+NWDh8x2jv6KZsE4t0xyG/NhuomEckulzXYIgAA793FzEXUVPAxEy8srS9/HD38e95F0YHaTfWTFGcpJCrlFjn5bd+k1YYERHfASHyT+lx60X3+QYFE8oVKg4AACbyLOs47qH5zQf3EWITlgt5/l/yAO3B8Kb7XQjVECIRTwk//cHyx+4N8179swipDwsPTwdJ/ETzfPAe9c7+2Ah4DhwNkQWO+9/zHPL49gAA1QhIDVYLEAQG+4z0pPOd+PoAsQgdDLkJxgKr+kT1E/UR+sIBcgj7CkIIrgF0+gT2afZX+18CHwjlCfAGwwBc+sb2pPdz/NYCvAfcCMIFAABe+oj3xfhp/SwDTgfiB7YEYf92+kf4zfk7/mcD2Ab3BskD4f6e+v/4vPru/ooDXgYeBvkCff7T+rH5k/uE/5kD4gVUBUMCMf4S+1r6VPwAAJcDZgWcBKcB+v1Y+/r6//xlAIgD7QT0AyEB1f2j+4/7lv23AG8DdwRbA68Av/3x+xr8G/73AE0DBgTSAk8Atf1A/Jr8j/4nASUDmgNXAg==";

export function Navbar() {  
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }

        return window.localStorage.getItem("theme") !== "light";
    });
    const [playToggleSound] = useSound(TOGGLE_CLICK_SOUND, {
        interrupt: true,
        volume: 0.28,
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
        playToggleSound();

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
