"use client";

import type { PointerEvent } from "react";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";

const experiences = [
    {
      title: "Frontend Developer",
      companyName: "Stratium",
      date: "Sep 2025 - Present",
      meta: "Full time",
      points: [
        "Leading the trading UI for a HIP-3 based asset platform built on Hyperliquid.",
        "Improved API usage patterns for trading data while reducing Hyperliquid rate-limit pressure.",
      ],
    },
    {
      title: "Frontend Developer",
      companyName: "Chainsight",
      date: "Mar 2025 - Sep 2025",
      meta: "Full time",
      points: [
        "Created interactive frontend experiences using Framer Motion, React Three Fiber, and Next.js.",
        "Worked with senior developers and adopted production frontend practices.",
      ],
    },
    {
      title: "Frontend Developer",
      companyName: "Metapong",
      date: "Jan 2025 - Feb 2025",
      meta: "Freelance",
      points: [
        "Developed animated product interfaces with Framer Motion, React Three Fiber, and Next.js.",
        "Built responsive TypeScript and Tailwind components with smooth cross-device animations.",
      ],
    },
    {
      title: "Frontend Web3 Developer",
      companyName: "Remex Trade",
      date: "Apr 2024 - Jun 2024",
      meta: "Freelance",
      points: [
        "Built the frontend architecture for a decentralized exchange using Next.js and Tailwind CSS.",
        "Integrated wallet authentication with ConnectKit, Wagmi, and Viem.",
      ],
    },
    {
      title: "Frontend Intern",
      companyName: "Know Your Colleges",
      date: "Oct 2023 - Mar 2024",
      points: [
        "Built scalable React interfaces with maintainable component structure.",
        "Used React Hooks and Context API to manage state and side effects.",
      ],
    },
  ];

export const Experience = () => {
    function updateGlow(event: PointerEvent<HTMLElement>) {
        const rect = event.currentTarget.getBoundingClientRect();

        event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
    }

    return(
        <div>
            <div className="flex gap-0.1 px-4 py-2">
                <div className="text-4xl font-display font-normal tracking-tight text-portfolio-text">Experience</div>
                <div className="text-lg text-portfolio-accent font-note px-4 py-2 opacity-50">previous roles and responsibilities</div>
            </div>
            <DottedHorizontalStrip/>
            <div className="px-4 py-4 text-left">
                {experiences.map((experience, index) => {
                    const isCurrent = experience.date.includes("Present");

                    return (
                    <article
                        key={`${experience.companyName}-${experience.date}`}
                        onPointerMove={updateGlow}
                        className="group relative grid grid-cols-[1.5rem_1fr] gap-3 pb-5 last:pb-0"
                    >
                        <div className="relative flex justify-center">
                            <span
                                className={`mt-1 grid size-5 place-items-center border border-portfolio-border bg-portfolio-base transition-colors duration-200 group-hover:border-portfolio-border-control group-hover:bg-portfolio-surface-control ${
                                    isCurrent ? "border-portfolio-border-control shadow-[0_0_22px_var(--portfolio-hover-glow)]" : ""
                                }`}
                            >
                                <span
                                    className={`size-2 bg-portfolio-accent transition-transform duration-200 group-hover:scale-125 ${
                                        isCurrent ? "scale-125 shadow-[0_0_14px_var(--portfolio-accent)]" : ""
                                    }`}
                                />
                            </span>
                            {index < experiences.length - 1 ? (
                                <span className="absolute top-6 bottom-[-1.25rem] border-l border-dashed border-portfolio-border transition-colors duration-200 group-hover:border-portfolio-border-control" />
                            ) : null}
                        </div>
                        <div className="relative overflow-hidden border border-portfolio-border bg-portfolio-surface-tile px-4 py-3 shadow-portfolio-glass transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-portfolio-border-control group-hover:bg-portfolio-surface-control">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), var(--portfolio-hover-glow), var(--portfolio-hover-glow-soft) 42%, transparent 74%)",
                                }}
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{
                                    boxShadow: "inset 0 0 28px var(--portfolio-hover-inset)",
                                }}
                            />
                            <div className="relative z-10 flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <h3 className="font-ui text-base font-semibold text-portfolio-text-bright">
                                        {experience.companyName}
                                    </h3>
                                    <div className="mt-1 text-sm text-portfolio-text-soft">
                                        {experience.title}
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-end gap-1.5">
                                    <span className="border border-portfolio-border bg-portfolio-surface-control px-2 py-1 font-mono text-[11px] text-portfolio-text-subtle">
                                        {experience.date}
                                    </span>
                                    {experience.meta ? (
                                        <span className="border border-portfolio-border bg-portfolio-surface-control px-2 py-1 font-mono text-[11px] text-portfolio-text-subtle">
                                            {experience.meta}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <ul className="relative z-10 mt-3 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-portfolio-text-muted">
                                {experience.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                    );
                })}
            </div>
        </div>
    )
}
