export function DecorativeStrip() {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute inset-0 text-neutral-200 border border-portfolio-border dark:border-portfolio-border dark:text-portfolio-border"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)",
        }}
      />
    </div>
  );
}