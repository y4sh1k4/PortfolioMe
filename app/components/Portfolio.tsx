import { DecorativeHorizontalStrip } from "./Strips/DecorativeHorizontalStrip";
import { Me } from "./Me";
import { Navbar } from "./Navbar";
import { About } from "./About";
import { Contact } from "./Contact";
import { Activity } from "./Activity";
import { TechStack } from "./TechStack";

export const Portfolio = () => {
  return (
    <div className="flex min-h-full flex-col text-center">
      <Navbar/>
      <DecorativeHorizontalStrip/>
      <Me/>
      <DecorativeHorizontalStrip/>
      <About/>
      <DecorativeHorizontalStrip/>
      <Contact/>
      <DecorativeHorizontalStrip/>
      <Activity/>
      <DecorativeHorizontalStrip/>
      <TechStack/>
      <DecorativeHorizontalStrip/>
    </div>
  );
};
