/* Section heading: a large Author headline with an optional short line under it. */
export function SectionTitle({
  id,
  title,
  lead,
  tone = "light",
  align = "left",
  size = "lg",
  font = "display",
  className = "",
  titleClassName = "",
  leadClassName = "",
}: {
  id?: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  size?: "md" | "lg";
  font?: "display" | "deva";
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
}) {
  const dark = tone === "dark";
  const fontClass = font === "deva" ? "font-deva font-bold tracking-tight" : "font-display";
  const defaultSize = size === "lg" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl";
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <h2 id={id} className={`${fontClass} leading-[1.04] text-balance ${titleClassName || defaultSize} ${dark ? "text-cream" : "text-ink-900"}`}>
        {title}
      </h2>
      {lead ? <p className={`${leadClassName || "mt-2 sm:mt-3 text-base sm:text-lg"} max-w-2xl ${dark ? "text-pasture-100" : "text-ink-700"}`}>{lead}</p> : null}
    </div>
  );
}

/** A single drop of ghee, used as a small mark. */
export function GheeDropMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} aria-hidden focusable="false">
      <path d="M8 1C10 5 15 9 15 13a7 7 0 0 1-14 0C1 9 6 5 8 1Z" fill="currentColor" />
    </svg>
  );
}
