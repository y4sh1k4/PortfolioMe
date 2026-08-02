"use client";

import type { FormEvent } from "react";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";
import { MdArrowOutward } from "react-icons/md";

export const Talk = () => {
  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:itsmeyashika11@gmail.com?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section>
      <div className="flex gap-0.1 px-4 py-2">
        <h2 className="font-display text-4xl font-normal tracking-tight text-portfolio-text">
          Let&apos;s talk
        </h2>
        <p className="px-4 py-2 font-note text-lg text-portfolio-accent opacity-50">
          have something in mind?
        </p>
      </div>

      <DottedHorizontalStrip />

      <form onSubmit={sendMessage} className="grid text-left sm:grid-cols-2">
        <label className="border-b border-r border-dashed border-portfolio-border p-4 sm:border-b-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-portfolio-text-subtle">
            Name
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className="mt-2 w-full bg-transparent font-ui text-base text-portfolio-text-bright outline-none placeholder:text-portfolio-text-subtle"
          />
        </label>

        <label className="border-b border-dashed border-portfolio-border p-4 sm:border-b-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-portfolio-text-subtle">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-2 w-full bg-transparent font-ui text-base text-portfolio-text-bright outline-none placeholder:text-portfolio-text-subtle"
          />
        </label>

        <label className="border-t border-dashed border-portfolio-border p-4 sm:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-portfolio-text-subtle">
            Message
          </span>
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Tell me about your idea..."
            className="mt-2 block w-full resize-none bg-transparent font-ui text-base text-portfolio-text-bright outline-none placeholder:text-portfolio-text-subtle"
          />
        </label>

        <div className="border-t border-dashed border-portfolio-border p-4 sm:col-span-2">
          <button
            type="submit"
            className="group relative w-full overflow-hidden border border-portfolio-border border-dashed bg-portfolio-surface-tile px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-portfolio-text-soft transition-[border-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-portfolio-text hover:text-portfolio-base hover:shadow-lg hover:shadow-portfolio-accent-weak focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-portfolio-text transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />
            <span className="relative z-10 inline-flex items-center gap-2">
              Send message
              <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-px group-hover:translate-y-px">
                <MdArrowOutward/>
              </span>
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};
