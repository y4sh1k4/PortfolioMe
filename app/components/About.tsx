import { DecorativeHorizontalStrip } from "./Strips/DecorativeHorizontalStrip"
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip"

export const About = () => {
    return(
        <div>
            <div className="flex gap-0.1 px-4 py-2">
                <div className="text-4xl font-display font-normal tracking-tight text-portfolio-text">About</div>
                <div className="text-lg text-portfolio-accent font-note px-4 py-2 opacity-50">get to know about me</div>
            </div>
            <DottedHorizontalStrip/>
            <ul className="list-outside list-disc space-y-2 px-8 py-3 text-left text-[16px]">
                <li>
                    I build web applications with a strong focus on clean UI and smooth user experiences.
                </li>
                <li>
                   My toolkit revolves around React, Next.js, TypeScript, and Tailwind, but I{`'`}m always experimenting with new technologies and design ideas.
                </li>
                <li>
                   I{`'`}m always curious about how good products are designed, built, and polished from the first idea to the final experience.
                </li>
            </ul>
        </div>
    )
}
