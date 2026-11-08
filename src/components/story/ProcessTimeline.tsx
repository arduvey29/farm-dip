import { processSteps } from "@/data/process";
import { ProcessIcon } from "./ProcessIcon";

/**
 * The eight steps of making ghee, numbered because the content is a real sequence.
 * Horizontal scroll-snap on small screens, a four-column grid on large ones.
 */
export function ProcessTimeline({ tone = "light", detailed = false }: { tone?: "light" | "dark"; detailed?: boolean }) {
  const dark = tone === "dark";
  return (
    <ol className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <li
          key={step.id}
          id={step.id}
          className={`relative w-[78%] shrink-0 snap-start scroll-mt-28 rounded-[1.5rem] p-6 sm:w-auto ${dark ? "bg-pasture-900" : "bg-milk shadow-[0_1px_0_var(--color-line),0_20px_40px_-30px_rgb(35_27_30/0.4)]"}`}
        >
          <div className="flex items-start justify-between">
            <span className={`font-display text-4xl leading-none ${dark ? "text-ghee-300" : "text-ghee-600"}`} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <ProcessIcon icon={step.icon} className={`size-11 ${dark ? "text-ghee-300" : "text-ink-700"}`} />
          </div>
          <h3 className={`mt-6 font-display text-xl leading-snug ${dark ? "text-cream" : "text-ink-900"}`}>
            <span className="sr-only">Step {i + 1}: </span>
            {step.name}
          </h3>
          {detailed || dark ? <p className={`mt-2 text-[0.95rem] ${dark ? "text-pasture-100" : "text-ink-700"}`}>{step.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}
