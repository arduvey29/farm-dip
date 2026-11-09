/*
  All interactive motion on the site, as plain DOM code with no framework.
  React components call these functions; a Shopify theme can ship this file as an asset
  (compiled to JS) and call initMotion() once, driven by the same data attributes:

    [data-pausable]          pauses CSS animations inside while off screen
    .journey                 the scroll-driven ghee journey ([data-beat], [data-scene], [data-i], [data-stage])
    [data-progress]          gets --p from 0 to 1 as it scrolls up the screen (ghee drips, the pour)
    [data-hello-button]      tapping it makes the closest [data-hello-scene] say hello
    [data-cart-target]       where flyToCart() drops land (the header cart icon)
*/

type Cleanup = () => void;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Pauses CSS animations inside `el` while it is off screen, to save battery. */
export function pauseWhenHidden(el: HTMLElement): Cleanup {
  const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-paused", !entry.isIntersecting), { rootMargin: "120px" });
  io.observe(el);
  return () => io.disconnect();
}

/**
 * Drives the ghee journey from the scroll position: marks the active step (data-step on the root,
 * data-active and data-done on every [data-i]) and writes --sp (progress through the active step,
 * on its scene) and --jp (progress through the whole journey, on the root).
 */
export function driveJourney(root: HTMLElement): Cleanup {
  const beats = Array.from(root.querySelectorAll<HTMLElement>("[data-beat]"));
  const marked = Array.from(root.querySelectorAll<HTMLElement>("[data-i]"));
  const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
  const stage = root.querySelector<HTMLElement>("[data-stage]");
  const wide = window.matchMedia("(min-width: 1024px)");
  if (!beats.length) return () => {};
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
}

/**
 * Writes --p on `el`, from 0 when its top edge reaches `start` (a fraction of the screen height
 * from the top) to 1 when it reaches `end`. Drives the ghee drips and the pour. With reduced
 * motion it holds a still value instead of tracking the scroll.
 */
export function trackProgress(el: HTMLElement, { start = 1, end = 0.25, still = 0.6 } = {}): Cleanup {
  if (prefersReducedMotion()) {
    el.style.setProperty("--p", String(still));
    return () => {};
  }
  let frame = 0;
  let visible = false;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    const top = el.getBoundingClientRect().top;
    const p = Math.min(1, Math.max(0, (start * vh - top) / ((start - end) * vh)));
    el.style.setProperty("--p", p.toFixed(3));
  };
  const schedule = () => {
    if (visible && !frame) frame = requestAnimationFrame(update);
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
  }, { rootMargin: "200px 0px" });
  io.observe(el);
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    io.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

const helloTimers = new WeakMap<Element, number>();

/** Rani lifts her head, the egret startles and "Ram Ram!" pops up. Restarts cleanly on rapid taps. */
export function sayHello(button: Element) {
  const scene = button.closest<HTMLElement>("[data-hello-scene]");
  if (!scene) return;
  scene.removeAttribute("data-hello");
  void scene.offsetWidth;
  scene.setAttribute("data-hello", "");
  window.clearTimeout(helloTimers.get(scene));
  helloTimers.set(scene, window.setTimeout(() => scene.removeAttribute("data-hello"), 1800));
}

/** A drop of ghee arcs from `from` to the cart icon, the icon bobs, then `onLanded` runs. */
export function flyToCart(from: Element, onLanded: () => void) {
  const target = document.querySelector("[data-cart-target]");
  if (!target || prefersReducedMotion()) return onLanded();
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const x0 = a.left + a.width / 2;
  const y0 = a.top + a.height / 2;
  const dx = b.left + b.width / 2 - x0;
  const dy = b.top + b.height / 2 - y0;
  const drop = document.createElement("div");
  drop.className = "ghee-drop";
  drop.style.left = `${x0}px`;
  drop.style.top = `${y0}px`;
  const arc = document.createElement("span");
  arc.style.cssText = "display:block;width:100%;height:100%";
  arc.append(document.createElement("i"));
  drop.append(arc);
  document.body.append(drop);
  const duration = 620;
  // Arc above both ends, but never off the top of the screen.
  const peak = Math.max(Math.min(dy, 0) - 70, 14 - y0);
  drop.animate([{ transform: "translateX(0)" }, { transform: `translateX(${dx}px)` }], { duration, fill: "forwards" });
  const flight = arc.animate(
    [
      { transform: "translateY(0) scale(1)", easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" },
      { transform: `translateY(${peak}px) scale(1.15)`, offset: 0.45, easing: "cubic-bezier(0.6, 0, 0.8, 0.4)" },
      { transform: `translateY(${dy}px) scale(0.5)` },
    ],
    { duration, fill: "forwards" },
  );
  flight.onfinish = () => {
    drop.remove();
    target.animate([{ transform: "none" }, { transform: "scale(1.25) rotate(-10deg)" }, { transform: "scale(0.95) rotate(6deg)" }, { transform: "none" }], { duration: 420, easing: "ease-out" });
    onLanded();
  };
}

/** Eases a number from `from` to `to`, calling `onFrame` with each value. Returns a cancel function. */
export function countUp(from: number, to: number, onFrame: (value: number) => void, duration = 650): Cleanup {
  const start = performance.now();
  const reduce = prefersReducedMotion();
  let frame = requestAnimationFrame(function tick(now) {
    const t = reduce ? 1 : Math.min(1, (now - start) / duration);
    onFrame(from + (to - from) * (1 - Math.pow(1 - t, 3)));
    if (t < 1) frame = requestAnimationFrame(tick);
  });
  return () => cancelAnimationFrame(frame);
}

/** One-call setup for non-React pages (the Shopify theme). Safe to call more than once per element. */
export function initMotion(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>("[data-pausable]:not([data-motion-ready])").forEach((el) => {
    el.setAttribute("data-motion-ready", "");
    pauseWhenHidden(el);
  });
  scope.querySelectorAll<HTMLElement>(".journey:not([data-motion-ready])").forEach((el) => {
    el.setAttribute("data-motion-ready", "");
    driveJourney(el);
  });
  scope.querySelectorAll<HTMLElement>("[data-progress]:not([data-motion-ready])").forEach((el) => {
    el.setAttribute("data-motion-ready", "");
    trackProgress(el, {
      start: Number(el.dataset.progressStart ?? 1),
      end: Number(el.dataset.progressEnd ?? 0.25),
      still: Number(el.dataset.progressStill ?? 0.6),
    });
  });
  scope.querySelectorAll<HTMLElement>("[data-hello-button]:not([data-motion-ready])").forEach((el) => {
    el.setAttribute("data-motion-ready", "");
    el.addEventListener("click", () => sayHello(el));
  });
}
