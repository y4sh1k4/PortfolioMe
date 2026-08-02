import { DecorativeHorizontalStrip } from "./Strips/DecorativeHorizontalStrip";
import { Me } from "./Me";
import { Navbar } from "./Navbar";
import { About } from "./About";
import { Contact } from "./Contact";
import { Activity } from "./Activity";
import { TechStack } from "./TechStack";
import { Experience } from "./Experience";
import { Project } from "./Project";

const revealSections = [
  <Navbar key="navbar" />,
  <DecorativeHorizontalStrip key="strip-me" />,
  <Me key="me" />,
  <DecorativeHorizontalStrip key="strip-about" />,
  <About key="about" />,
  <DecorativeHorizontalStrip key="strip-contact" />,
  <Contact key="contact" />,
  <DecorativeHorizontalStrip key="strip-activity" />,
  <Activity key="activity" />,
  <DecorativeHorizontalStrip key="strip-tech" />,
  <TechStack key="tech-stack" />,
  <DecorativeHorizontalStrip key="strip-experience" />,
  <Experience key="experience" />,
  <DecorativeHorizontalStrip key="strip-project" />,
  <Project key="project" />
];

export const Portfolio = () => {
  return (
    <div className="flex min-h-full flex-col text-center">
      {revealSections.map((section, index) => (
        <div
          key={section.key}
          className="portfolio-reveal"
          style={{
            animationDelay: `${index * 30}ms`,
          }}
        >
          {section}
        </div>
      ))}
    </div>
  );
};
