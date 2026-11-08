"use client";

import { useSyncExternalStore } from "react";
import { isMotionPaused, restoreMotionChoice, setMotionPaused } from "@/lib/motion";

let restored = false;

/** Watches the data-still attribute on <html>, so every toggle on the page stays in step. */
function subscribe(onChange: () => void) {
  if (!restored) {
    restored = true;
    restoreMotionChoice();
  }
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-still"] });
  return () => mo.disconnect();
}

/** Pauses or resumes the looping animation on the site (Rani, the journey scenes). Remembered per device. */
export function MotionToggle({ className = "" }: { className?: string }) {
  const paused = useSyncExternalStore(subscribe, isMotionPaused, () => false);
  return (
    <button
      type="button"
      data-motion-toggle=""
      aria-pressed={paused}
      onClick={() => setMotionPaused(!paused)}
      className={`inline-flex items-center gap-2 rounded-full text-sm font-medium underline-offset-4 hover:underline ${className}`}
    >
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden focusable="false">
        {paused ? <path d="M4 2.5v11l9-5.5z" fill="currentColor" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />}
      </svg>
      {paused ? "Play animation" : "Pause animation"}
    </button>
  );
}
