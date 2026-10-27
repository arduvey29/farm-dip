import { bilonaSteps } from "@/data/process";
import { ProcessIcon } from "./ProcessIcon";

const devanagariDigits = ["१", "२", "३", "४", "५", "६", "७", "८", "९"];

/**
 * The eight bilona steps, numbered in Devanagari because the content is a real sequence.
 * Horizontal scroll-snap on small screens, a four-column grid on large ones.
 */
export function ProcessTimeline({ tone = "light", detailed = false }: { tone?: "light" | "dark"; detailed?: boolean }) {
  const dark = tone === "dark";
  return (
    <ol className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {bilonaSteps.map((step, i) => (
        <li
          key={step.id}
          id={step.id}
          className={`frame-peetal relative w-[78%] shrink-0 snap-start scroll-mt-28 rounded-2xl p-6 sm:w-auto ${dark ? "bg-maroon-800" : "bg-paper"}`}
        >
          <div className="flex items-start justify-between">
            <span className="grid size-14 place-items-center rounded-full border-2 border-peetal bg-haldi-500 font-display text-3xl leading-none font-bold text-maroon-900" aria-hidden>
              {devanagariDigits[i]}
            </span>
            <ProcessIcon icon={step.icon} className={`size-12 ${dark ? "text-haldi-300" : "text-maroon-700"}`} />
          </div>
          <h3 className={`mt-5 font-display text-xl leading-snug ${dark ? "text-chandan" : "text-maroon-800"}`}>
            <span className="sr-only">Step {i + 1}: </span>
            {step.name}
          </h3>
          <p className={`mt-1 font-hand text-base ${dark ? "text-haldi-300" : "text-kumkum"}`}>{step.duration}</p>
          {detailed || dark ? <p className={`mt-3 text-[0.95rem] ${dark ? "text-maroon-100" : "text-maroon-800"}`}>{step.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}
