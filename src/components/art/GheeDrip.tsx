import { ProgressDriver } from "./ProgressDriver";

/*
  Molten ghee dripping off the bottom edge of a band. Place it as the last child of a
  `position: relative` section whose background is the drip colour. The drips grow subtly as the band
  scrolls up the screen without encroaching on text below (CSS in globals.css, "Ghee drips").
  [x position %, width px, full length px, lets a drop fall]
*/
const drips: [number, number, number, boolean?][] = [
  [5, 10, 18],
  [12, 14, 30, true],
  [21, 9, 16],
  [29, 12, 24],
  [40, 16, 36, true],
  [49, 9, 17],
  [58, 13, 26],
  [68, 10, 20],
  [77, 15, 32, true],
  [86, 9, 15],
  [94, 12, 24],
];

export function GheeDrip({ color = "var(--color-ghee-400)" }: { color?: string }) {
  return (
    <div className="drip" data-progress="" style={{ "--drip": color } as React.CSSProperties} aria-hidden>
      <ProgressDriver start={1} end={0.2} still={0.55} />
      <svg className="drip-wave" viewBox="0 0 1440 28" preserveAspectRatio="none" focusable="false">
        <path d="M0 0H1440V12C1384 22 1330 24 1262 16S1120 4 1044 13 902 27 818 19 676 6 598 14 452 26 376 18 236 6 166 13 44 23 0 15Z" fill="currentColor" />
      </svg>
      {drips.map(([x, w, len, falls]) => (
        <span
          key={x}
          className="drip-drop"
          data-falls={falls ? "" : undefined}
          style={{ left: `${x}%`, "--w": `${w}px`, "--len": `${len}px` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
