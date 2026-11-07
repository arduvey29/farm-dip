"use client";

import { useEffect, useRef } from "react";
import { driveJourney } from "@/lib/motion";

/** Hooks the surrounding .journey section up to the scroll driver in lib/motion. Renders nothing visible. */
export function JourneyDriver() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".journey");
    return root ? driveJourney(root) : undefined;
  }, []);
  return <span ref={ref} hidden />;
}
