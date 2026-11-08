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
      <span aria-hidden className="hello-bubble absolute -top-4 left-2 rounded-2xl rounded-bl-sm bg-ink-900 px-4 py-2 font-display text-lg text-cream shadow-[0_10px_24px_-12px_rgb(22_17_19/0.6)]">
        Ram Ram!
      </span>
    </button>
  );
}
