import Image from "next/image";
import { DottedStrip } from "./Strips/Strip";
import { DottedHorizontalStrip } from "./Strips/HorizontalStrip";
import { FaRegEye } from "react-icons/fa";
import { DecorativeHorizontalStrip } from "./Strips/DecorativeHorizontalStrip";

export const Me = () => {   
    return(
        <div className="flex">
            <div className="py-2 px-2 flex items-center justify-center">
                <Image src="/images/me.jpeg" width={50} height={20} alt="Yashika Mehndiratta" className="w-full h-full "/>
            </div>
            <DottedStrip/>
            <div className="flex flex-col items-start gap-1 justify-center h-full flex-1">
                {/* <DecorativeHorizontalStrip height="h-8" /> */}
                <div className="flex flex-wrap items-center gap-3 px-4 py-1">
                    <div className="text-4xl font-display font-normal tracking-tight text-portfolio-text">
                        Yashika Mehndiratta
                    </div>
                </div>
                <DottedHorizontalStrip width="w-full"/>
                <div className="flex justify-between w-full">
                    <div className="flex items-start justify-start text-xl text-portfolio-accent font-note px-4 flex-1 ">Design Engineer</div>
                    <DottedStrip/>
                    <div className="flex items-center gap-2 text-sm text-portfolio-nav-text px-4 py-2">
                        <FaRegEye /> 2
                    </div>
                </div>
            </div>
        </div>
    )
}
