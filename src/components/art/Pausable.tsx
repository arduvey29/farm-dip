"use client";

import { useEffect, useRef } from "react";

/** Wraps animated art and pauses its CSS animations while it is off screen, to save battery. */
export function Pausable({ children, ...props }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-paused", !entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
