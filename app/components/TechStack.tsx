import { it } from "node:test";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";

const stackGroups = [
    {
        label: "Core Syntax",
        items: [
            { name: "TypeScript", mark: "TS" },
            { name: "JavaScript", mark: "JS" },
        ],
    },
    {
        label: "Interface Layer",
        items: [
            { name: "React", mark: "R" },
            { name: "Next.js", mark: "N" },
            { name: "Tailwind CSS", mark: "TW" },
            { name: "Motion", mark: "M" },
            { name: "Redux", mark: "RX" },
            {name: "Zustand", mark: "Z" },

        ],
    },
    {
        label: "Data & APIs",
        items: [
            { name: "Node.js", mark: "ND" },
            { name: "Express", mark: "EX" },
            { name: "MongoDB", mark: "DB" },
            { name: "PostgreSQL", mark: "PG" },
            {name: 'Prisma', mark: "P" },
            {name: 'Convex', mark: "C" },
        ],
    },
    {
        label: "Build & Dev tools",
        items: [
            { name: "Git", mark: "G" },
            { name: "GitHub", mark: "GH" },
            { name: "Vercel", mark: "V" },
            { name: "ChatGPT", mark: "AI" },
            { name: "Cursor", mark: "C" },

        ],
    },
    {
        label: 'Web3 & Blockchain',
        items: [
            {name: 'Solidity', mark: 'S'},
            {name: 'Hardhat', mark: 'H'},
            {name: 'Ethers.js', mark: 'E'},
            {name: 'Web3.js', mark: 'W3'},
            {name: 'Privy', mark: 'P'},

]
    },
     {
        label: "Other Tools",
        items: [
            { name: "Framer motion", mark: "F" },
            {name: "React Three Fiber", mark: "R3F"},
            {name: "Three.js", mark: "3JS"},
        ],
    },
];

export const TechStack= () => {
    return(
        <div>
             <div className="flex gap-0.1 px-4 py-2">
                <div className="text-4xl font-display font-normal tracking-tight text-portfolio-text">Toolkit</div>
                <div className="text-lg text-portfolio-accent font-note px-4 py-2 opacity-50">tools I reach for</div>
            </div>
            <DottedHorizontalStrip/>
            <div className="text-left">
                {stackGroups.map((group, index) => (
                    <div
                        key={group.label}
                        className="grid grid-cols-[8.5rem_1fr] border-b border-portfolio-border text-sm last:border-b-0 sm:grid-cols-[12rem_1fr]"
                    >
                        <div className="border-r border-dashed border-portfolio-border px-4 py-4 font-ui text-portfolio-text-subtle">
                            <span className="mr-2 font-mono text-portfolio-text-muted">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {group.label}
                        </div>
                        <div className="flex flex-wrap content-center gap-2 px-4 py-3">
                            {group.items.map((item) => (
                                <span
                                    key={item.name}
                                    className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-portfolio-border bg-portfolio-surface-tile px-2.5 font-mono text-xs text-portfolio-text-soft shadow-portfolio-glass transition-colors hover:border-portfolio-border-control hover:bg-portfolio-surface-control hover:text-portfolio-text-bright"
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
