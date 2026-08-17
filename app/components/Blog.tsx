import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";

export const Blog = () => {
  return (
    <section id="blog">
      <div className="flex items-baseline gap-0.5 px-4 py-2">
        <h2 className="font-display text-4xl font-normal tracking-tight text-portfolio-text">
          Writing
        </h2>
        <p className="px-4 py-2 font-note text-lg text-portfolio-accent opacity-50">
          notes from building interfaces
        </p>
      </div>

      <DottedHorizontalStrip />

      <Link
        href="/blog/beyond-usestate"
        className="group block border-b border-portfolio-border bg-portfolio-surface-tile p-5 text-left transition-colors duration-300 hover:bg-portfolio-surface-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-portfolio-accent"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-portfolio-text-subtle">
              01 · Frontend notes
            </p>
            <h3 className="mt-2 max-w-xl font-ui text-xl font-semibold tracking-tight text-portfolio-text-bright">
              Understanding State Ownership in Complex Frontends
            </h3>
          </div>
          <span aria-hidden="true" className="text-lg text-portfolio-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <MdArrowOutward />
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-portfolio-text-muted">
          A practical mental model for deciding where your frontend state actually belongs.
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-dashed border-portfolio-border pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-portfolio-text-subtle">
          <span>Read article</span>
          <span>8 min read</span>
        </div>
      </Link>
    </section>
  );
};
