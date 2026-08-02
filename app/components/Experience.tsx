"use client";

import { useState } from "react";
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
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    null,
  );

  return (
    <section>
      <div className="flex items-baseline gap-0.5 px-4 py-2">
        <h2 className="font-display text-4xl font-normal tracking-tight text-portfolio-text">
          Experience
        </h2>

        <p className="px-4 py-2 font-note text-lg text-portfolio-accent opacity-50">
          previous roles and responsibilities
        </p>
      </div>

      <DottedHorizontalStrip />

      <div className="px-4 py-4 text-left">
        {experiences.map((experience, index) => {
          const isCurrent = experience.date.includes("Present");
          const experienceId = `experience-${index}`;
          const isExpanded = expandedExperience === experienceId;

          return (
            <article
              key={`${experience.companyName}-${experience.date}`}
              className="group relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 pb-5 last:pb-0"
            >
              <div className="relative flex justify-center">
                <span
                  className={`
                    mt-4 grid size-5 rotate-45 place-items-center
                    border bg-portfolio-base
                    transition-all duration-300
                    group-hover:border-portfolio-border-control
                    border-portfolio-border
                  `}
                >
                  <span
                    className={`
                      size-2 bg-portfolio-accent
                      transition-transform duration-300
                      scale-75 group-hover:scale-100
                    `}
                  />
                </span>

                {index < experiences.length - 1 ? (
                  <span className="absolute bottom-[-1.25rem] top-7 border-l border-dashed border-portfolio-border transition-colors duration-300 group-hover:border-portfolio-border-control" />
                ) : null}
              </div>

              <div
                className={`
                  relative overflow-hidden border
                  bg-portfolio-surface-tile shadow-portfolio-glass
                  transition-[border-color,background-color,transform,box-shadow]
                  duration-300
                  group-hover:border-portfolio-border-control
                  ${
                    isExpanded
                      ? "border-portfolio-border-control bg-portfolio-surface-control"
                      : "border-portfolio-border"
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className={`
                    pointer-events-none absolute inset-y-0 left-0 w-px
                    bg-portfolio-accent transition-opacity duration-300
                    ${
                      isExpanded
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-60"
                    }
                  `}
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setExpandedExperience(
                      isExpanded ? null : experienceId,
                    )
                  }
                  aria-expanded={isExpanded}
                  aria-controls={`${experienceId}-details`}
                  className="
                    relative z-10 flex w-full items-start justify-between
                    gap-5 px-5 py-4 text-left
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-[-3px]
                    focus-visible:outline-portfolio-accent
                  "
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-ui text-[15px] font-semibold tracking-tight text-portfolio-text-bright">
                        {experience.companyName}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="text-portfolio-text-subtle"
                      >
                        ·
                      </span>

                      <span className="text-sm text-portfolio-text-soft">
                        {experience.title}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-portfolio-text-subtle">
                      <span>{experience.date}</span>

                      {experience.meta ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="size-1 rotate-45 bg-portfolio-border-control"
                          />

                          <span>{experience.meta}</span>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`
                      mt-0.5 grid size-10 shrink-0 place-items-center
                      font-mono text-lg text-portfolio-accent
                      transition-all duration-300
                      ${
                        isExpanded
                          ? "rotate-45"
                          : ""
                      }
                    `}
                  >
                    +
                  </span>
                </button>

                <div
                  id={`${experienceId}-details`}
                  className={`
                    relative z-10 grid
                    transition-[grid-template-rows] duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      isExpanded
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ul
                      className={`
                        mx-5 mb-5 border-t border-dashed
                        border-portfolio-border pt-3
                        text-sm leading-6 text-portfolio-text-muted
                        transition-[opacity,transform] duration-300
                        ${
                          isExpanded
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-1 opacity-0"
                        }
                      `}
                    >
                      {experience.points.map((point) => (
                        <li key={point} className="flex gap-3 py-1.5">
                          <span
                            aria-hidden="true"
                            className="mt-[9px] size-1 shrink-0 rotate-45 bg-portfolio-accent"
                          />

                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};