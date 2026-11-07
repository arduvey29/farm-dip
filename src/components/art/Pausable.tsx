"use client";

import { useEffect, useRef } from "react";
import { pauseWhenHidden } from "@/lib/motion";

/** Wraps animated art and pauses its CSS animations while it is off screen. */
export function Pausable({ children, ...props }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? pauseWhenHidden(ref.current) : undefined), []);
  return (
    <div ref={ref} data-pausable="" {...props}>
      {children}
    </div>
  );
}
