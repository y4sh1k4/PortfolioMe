import { DecorativeHorizontalStrip } from "./Strips/DecorativeHorizontalStrip";
import { Me } from "./Me";
import { Navbar } from "./Navbar";
import { About } from "./About";
import { Contact } from "./Contact";
import { Activity } from "./Activity";
import { TechStack } from "./TechStack";
import { Experience } from "./Experience";
import { Project } from "./Project";
import { Talk } from "./Talk";
import { Quote } from "./Quote";
import { Copyright } from "./Copyright";
import { Blog } from "./Blog";

const revealSections = [
  <Navbar key="navbar" />,
  <DecorativeHorizontalStrip key="strip-me" />,
  <Me key="me" />,
  <DecorativeHorizontalStrip key="strip-about" />,
  <About key="about" />,
  <DecorativeHorizontalStrip key="strip-contact" />,
  <section id="contact" key="contact"><Contact /></section>,
  <DecorativeHorizontalStrip key="strip-activity" />,
  <Activity key="activity" />,
  <DecorativeHorizontalStrip key="strip-tech" />,
  <TechStack key="tech-stack" />,
  <DecorativeHorizontalStrip key="strip-experience" />,
  <section id="experience" key="experience"><Experience /></section>,
  <DecorativeHorizontalStrip key="strip-project" />,
  <section id="projects" key="project"><Project /></section>,
  <DecorativeHorizontalStrip key="strip-blog" />,
  <Blog key="blog" />,
  <DecorativeHorizontalStrip key="strip-talk" />,
  <Talk key="talk" />,
  <DecorativeHorizontalStrip key="strip-quote" />,
  <Quote key="quote" />,
  <DecorativeHorizontalStrip key="strip-copyright" />,
  <Copyright key="copyright" />,
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
