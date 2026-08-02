import { FaQuoteLeft } from "react-icons/fa";

export const Quote = () => {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 portfolio-dashed-grid"
      />

      <blockquote className="relative mx-auto max-w-3xl border-x border-dashed border-portfolio-border px-6 py-2 sm:px-12">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 block text-2xl text-portfolio-accent opacity-70"
        >
          <FaQuoteLeft />
        </span>
        <p className="font-display text-3xl leading-tight tracking-tight text-portfolio-text sm:text-4xl">
          “In the middle of difficulty lies opportunity.”
        </p>
        <footer className="mt-6 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-portfolio-text-subtle">
          <span aria-hidden="true" className="h-px w-6 bg-portfolio-border-control" />
          Albert Einstein
          <span aria-hidden="true" className="h-px w-6 bg-portfolio-border-control" />
        </footer>
      </blockquote>
    </section>
  );
};
