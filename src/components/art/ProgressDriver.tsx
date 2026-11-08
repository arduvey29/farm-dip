"use client";

import { useEffect, useRef } from "react";
import { trackProgress } from "@/lib/motion";

/**
 * Hooks the closest [data-progress] element up to trackProgress() in lib/motion, which writes --p
 * (0 to 1) as it scrolls up the screen. Renders nothing visible.
 */
export function ProgressDriver({ start = 1, end = 0.25, still = 0.6 }: { start?: number; end?: number; still?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("[data-progress]");
    return root ? trackProgress(root, { start, end, still }) : undefined;
  }, [start, end, still]);
  return <span ref={ref} hidden />;
}
