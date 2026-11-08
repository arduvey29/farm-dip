/* Section heading: a large Author headline with an optional short line under it. */
export function SectionTitle({
  id,
  title,
  lead,
  tone = "light",
  align = "left",
  size = "lg",
}: {
  id?: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 id={id} className={`font-display leading-[1.04] text-balance ${size === "lg" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"} ${dark ? "text-cream" : "text-ink-900"}`}>
        {title}
      </h2>
      {lead ? <p className={`mt-4 max-w-2xl text-lg ${dark ? "text-pasture-100" : "text-ink-700"}`}>{lead}</p> : null}
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
