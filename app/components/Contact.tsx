"use client";

import type { PointerEvent } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";
import { DottedStrip } from "./Strips/Strip";

const contactLinks = [
  {
    label: "X",
    href: "https://x.com/hey_itsyashika",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yashika-mehndiratta-694268248/",
    icon: FaLinkedinIn,
  },
  {
    label: "Mail",
    href: "mailto:itsmeyashika11@gmail.com",
    icon: MdOutlineMail,
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
  },
];

export const Contact = () => {
  function updateGlow(event: PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div>
      <div>
        <div className="flex gap-0.1 px-4 py-2">
          <div className="text-4xl font-display font-normal tracking-tight text-portfolio-text">
            Contact
          </div>
          <div className="text-lg text-portfolio-accent font-note px-4 py-2 opacity-50">
            get in touch
          </div>
        </div>
        <DottedHorizontalStrip/>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <div key={label} className="flex gap-1 ">
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                onPointerMove={updateGlow}
                className="group relative flex h-11 flex-1 items-center justify-center gap-2 overflow-hidden border border-dashed border-portfolio-border bg-portfolio-surface-tile px-1 text-sm text-portfolio-text-soft transition-colors duration-200 hover:border-portfolio-border-control hover:bg-portfolio-surface-control hover:text-portfolio-text-bright"
              >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(56px circle at var(--x, 50%) var(--y, 50%), var(--portfolio-hover-glow), var(--portfolio-hover-glow-soft) 42%, transparent 74%)",
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: "inset 0 0 24px var(--portfolio-hover-inset)",
                }}
              />
              <span className="relative z-10 grid size-4 place-items-center">
                <Icon aria-hidden="true" />
              </span>
              <span className="relative z-10">{label}</span>
            </a>
            <DottedStrip/>
            </div>
          ))}  
        </div>
      </div>
    </div>
  );
};
