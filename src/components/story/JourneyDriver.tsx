"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the bilona journey from the scroll position, without React state:
 * marks the active step (data-step, data-active, data-done) and writes --sp (progress through
 * the active step, on its scene) and --jp (progress through the whole journey, on the section).
 */
export function JourneyDriver() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".journey");
    if (!root) return;
    const beats = Array.from(root.querySelectorAll<HTMLElement>("[data-beat]"));
    const marked = Array.from(root.querySelectorAll<HTMLElement>("[data-i]"));
    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
    const stage = root.querySelector<HTMLElement>("[data-stage]");
    const wide = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    let current = -1;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      // Wide screens: a line just below the middle. Phones: a line in the band below the sticky stage.
      const stageBottom = !wide.matches && stage ? stage.getBoundingClientRect().bottom : 0;
      const line = wide.matches ? vh * 0.55 : stageBottom + (vh - stageBottom) * 0.3;
      let i = 0;
      beats.forEach((el, k) => {
        if (el.getBoundingClientRect().top <= line) i = k;
      });
      const rect = beats[i].getBoundingClientRect();
      const sp = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      scenes[i]?.style.setProperty("--sp", sp.toFixed(3));
      root.style.setProperty("--jp", ((i + sp) / beats.length).toFixed(4));
      if (i === current) return;
      // Scenes left behind keep their finished state, so nothing flashes while they fade out.
      scenes.forEach((el, k) => {
        if (k < i) el.style.setProperty("--sp", "1");
        if (k > i) el.style.setProperty("--sp", "0");
      });
      current = i;
      root.dataset.step = String(i);
      for (const el of marked) {
        const k = Number(el.dataset.i);
        el.toggleAttribute("data-active", k === i);
        el.toggleAttribute("data-done", k < i);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <span ref={ref} hidden />;
}
