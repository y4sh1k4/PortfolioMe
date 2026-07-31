import { Portfolio } from "./components/Portfolio";
import { DottedStrip } from "./components/Strips/Strip";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="grid min-h-screen w-[400px] max-w-[400px] grid-cols-[1px_minmax(0,1fr)_1px] sm:w-[750px] sm:max-w-[750px]">
        <DottedStrip />

        <div className="relative min-h-full w-full min-w-0 overflow-visible">
          <Portfolio />
        </div>

        <DottedStrip />
      </div>
    </div>
  );
}
