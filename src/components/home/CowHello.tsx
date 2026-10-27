"use client";

import { useRef } from "react";

/** Invisible button over Gauri in the hero. Tapping her makes her lift her head and call out. */
export function CowHello({ className = "" }: { className?: string }) {
  const timer = useRef<number | undefined>(undefined);
  return (
    <button
      type="button"
      aria-label="Say hello to Gauri, our Gir cow"
      className={`absolute cursor-pointer rounded-[40%] ${className}`}
      onClick={(e) => {
        const scene = e.currentTarget.closest("[data-cow-scene]");
        if (!scene) return;
        scene.removeAttribute("data-moo");
        // Restart the animation even on rapid taps.
        void (scene as HTMLElement).offsetWidth;
        scene.setAttribute("data-moo", "");
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => scene.removeAttribute("data-moo"), 1800);
      }}
    >
      <span lang="hi" aria-hidden className="moo-bubble absolute -top-2 left-0 rounded-2xl rounded-bl-none border-2 border-maroon-900 bg-paper px-3 py-1 font-hand text-xl font-bold text-maroon-900 shadow-[3px_3px_0_var(--color-maroon-900)]">
        हम्बा!
      </span>
    </button>
  );
}
