export const DottedHorizontalStrip = ({width = "w-screen"}:{width?: string}) => {
    return(
        <div className={`relative left-1/2  ${width} h-px -translate-x-1/2`}>
        <div
            className="absolute inset-0 text-neutral-200 border-t border-portfolio-border dark:border-portfolio-border dark:text-portfolio-border"
        />
        </div>
    )
}
