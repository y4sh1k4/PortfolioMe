import { DottedHorizontalStrip } from "./Strips/HorizontalStrip"
import { GitHubActivityCalendar } from "./GitHubActivityCalendar"

export const Activity = () => {
    return (
        <div>
            <div className="flex gap-0.1 px-4 py-2">
                <div className="text-4xl font-display font-normal tracking-tight text-portfolio-text">Github</div>
                <div className="text-lg text-portfolio-accent font-note px-4 py-2 opacity-50">get to know about my Activity</div>
            </div>
            <DottedHorizontalStrip/>
            <div className="overflow-hidden px-4 py-4 text-portfolio-text-muted">
                <GitHubActivityCalendar />
            </div>
        </div>
    )
}
