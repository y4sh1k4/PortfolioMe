type DecorativeHorizontalStripProps = {
    height?: string;
};

export const DecorativeHorizontalStrip = ({
    height = "h-4",
}: DecorativeHorizontalStripProps) => {  
    return(
       <div className={`relative left-1/2 ${height} w-screen -translate-x-1/2 overflow-hidden`}>
        <div
            className="absolute inset-0 text-neutral-200 border-y border-dashed border-portfolio-border dark:border-portfolio-border dark:text-portfolio-border"
            // style={{
            // backgroundImage:
            //     "repeating-linear-gradient(-45deg, transparent, transparent 2px, #131316 2px, #131316 3px, transparent 3px, transparent 6px)",
            // }}
            // style={{backgroundColor: '#131316'}}
        />
        </div>
    )  
}
