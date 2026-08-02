import { DottedHorizontalStrip } from "./Strips/HorizontalStrip"
import { MdArrowOutward } from "react-icons/md";


const projects = [
    {
        name: "KeyVault",
        repository: "https://github.com/y4sh1k4/KeyVault",
        stack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Prisma", "AWS Lambda"],
    },
    {
        name: "Syncpad",
        repository: "https://github.com/y4sh1k4/Syncpad",
        stack: ["Next.js", "TypeScript", "Convex", "Liveblocks", "Tiptap", "Clerk"],
    },
];

export const Project = () =>{
    return(
        <section>
            <div className="flex gap-0.1 px-4 py-2">
                <h2 className="text-4xl font-display font-normal tracking-tight text-portfolio-text">
                    Projects
                </h2>
                <p className="text-lg text-portfolio-accent font-note px-4 py-2 opacity-50">
                    get to know my past works
                </p>
            </div>
            <DottedHorizontalStrip/>
            <div className="grid text-left sm:grid-cols-2">
                {projects.map((project, index) => (
                    <article
                        key={project.name}
                        className="group border-b border-portfolio-border bg-portfolio-surface-tile p-5 transition-colors duration-300 hover:bg-portfolio-surface-control sm:border-b-0 sm:border-r last:border-r-0"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-portfolio-text-subtle">
                                    {String(index + 1).padStart(2, "0")} · In progress
                                </p>
                                <h3 className="mt-2 font-ui text-xl font-semibold text-portfolio-text-bright">
                                    {project.name}
                                </h3>
                            </div>
                            <span aria-hidden="true" className="font-mono text-lg text-portfolio-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                <MdArrowOutward/>
                            </span>
                        </div>
                        <ul className="mt-10 flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
                            {project.stack.map((technology) => (
                                <li
                                    key={technology}
                                    className="rounded-sm border border-portfolio-border px-2 py-1 font-mono text-[10px] text-portfolio-text-soft"
                                >
                                    {technology}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-dashed border-portfolio-border pt-3 font-mono text-xs">
                            <a
                                href={project.repository}
                                target="_blank"
                                rel="noreferrer"
                                className="text-portfolio-text-soft transition-colors hover:text-portfolio-text-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
                            >
                                View repository
                            </a>
                            <span className="text-portfolio-text-subtle">Live demo coming soon</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
