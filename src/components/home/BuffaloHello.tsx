"use client";

import { sayHello } from "@/lib/motion";

/** Invisible button over Rani in the hero. Tap her and she lifts her head and greets you, Haryana style. */
export function BuffaloHello({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      data-hello-button=""
      aria-label="Say hello to Rani, our buffalo"
      className={`absolute cursor-pointer rounded-[40%] ${className}`}
      onClick={(e) => sayHello(e.currentTarget)}
    >
      <span lang="hi" aria-hidden className="hello-bubble absolute -top-3 left-0 rounded-2xl rounded-bl-none border-2 border-kattha-900 bg-malai px-3 py-1 font-hand text-xl font-bold text-kattha-900 shadow-[3px_3px_0_var(--color-kattha-900)]">
        राम राम!
      </span>
    </button>
  );
}
