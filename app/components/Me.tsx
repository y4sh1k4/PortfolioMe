import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";
import { DottedStrip } from "./Strips/Strip";
import { ViewCount } from "./ViewCount";

export const Me = () => {
  const roles = [
    "Design Engineer",
    "Frontend Developer",
    "Software Engineer - UI Focused",
  ];

  return (
    <section className="grid grid-cols-[auto_1px_minmax(0,1fr)]">
      <div className="grid place-items-center p-2">
        <Image
          src="/images/me.jpg"
          width={80}
          height={80}
          alt="Yashika Mehndiratta"
          className="size-20 object-cover"
        />
      </div>

      <DottedStrip />

      <div className="flex min-w-0 flex-col">
        <div className="px-4 py-2">
          <h1 className="font-display text-4xl text-left leading-none tracking-tight text-portfolio-text">
            Yashika Mehndiratta
          </h1>
        </div>

        <DottedHorizontalStrip width="w-full" />

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_1px_auto] items-stretch">
          <div className="min-w-0 px-4 py-2">
            <div className="role-rotator relative h-7 overflow-hidden font-note text-xl leading-7 text-portfolio-accent opacity-60">
              {roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>

          <DottedStrip />

          <div className="flex items-center gap-2 px-4 font-mono text-sm text-portfolio-nav-text">
            <FaRegEye aria-hidden="true" />
            <span className="sr-only">Page views:</span>
            <ViewCount />
          </div>
        </div>
      </div>
    </section>
  );
};
