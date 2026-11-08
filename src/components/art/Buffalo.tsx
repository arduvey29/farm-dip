/*
  Rani, a desi buffalo painted in the folk manner: a glossy black Murrah-style coat with
  Gond-style dot and spiral patterns, tightly curled horns painted with festival bands,
  a phundna tassel, a kauri-and-marigold garland, a brass bell, a white tail switch, and a
  cattle egret riding on her back. Drawn facing left in a 360 × 280 box.
  Parts move with CSS only (see "Living art" in globals.css): plain SVG that renders on the
  server, costs no JavaScript and can be pasted into a Shopify snippet as it is.
*/

const ink = "#120d0f";
const coat = "#2a2326";
const far = "#1b1618";
const sheen = "#4d4248";
const hornColour = "#3d3438";
const hoof = "#0c0809";

const line = { stroke: ink, strokeWidth: 2.2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Leg({ d, back = false, x }: { d: string; back?: boolean; x: number }) {
  return (
    <g>
      <path d={d} fill={back ? far : coat} {...line} />
      <path d={`M${x - 1} 260h20l1.5 8h-23Z`} fill={hoof} />
      <path d={`M${x + 9} 260v8`} stroke="#3a3034" strokeWidth="1" />
      <rect x={x} y={250} width="18" height="4" rx="2" fill="var(--color-ghee-500)" stroke={ink} strokeWidth="0.8" />
    </g>
  );
}

function Marigold({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4.4" fill={tone} stroke="var(--color-ghee-800)" strokeWidth="0.8" />
      <circle cx={x} cy={y} r="1.9" fill="var(--color-ghee-300)" />
    </g>
  );
}

/** Murrah horn: a tight curl back, down and forward. Painted bands come from dashed strokes along the same path. */
const HORN = "M88 106C90 88 112 80 124 90C134 99 130 116 116 118C106 119 102 110 108 104";

export function Buffalo({ pose = "stand", bird = true, className = "" }: { pose?: "stand" | "graze"; bird?: boolean; className?: string }) {
  const garland: [number, number][] = [
    [148, 100],
    [146, 110],
    [143, 120],
    [140, 130],
    [136, 140],
    [132, 150],
    [127, 160],
    [121, 169],
    [114, 177],
  ];
  const kauri: [number, number][] = [
    [134, 116],
    [130, 128],
    [125, 140],
    [119, 151],
    [112, 161],
  ];
  return (
    <svg viewBox="0 0 360 280" className={`buffalo ${className}`} data-pose={pose} aria-hidden focusable="false">
      <ellipse cx="210" cy="270" rx="136" ry="7" fill="rgb(42 14 10 / 0.2)" />

      {/* Far legs, in shadow. */}
      <Leg back d="M156 196C154 214 156 230 158 240C158 250 157 256 157 262H175C175 254 175 248 175 240C177 228 179 212 178 198Z" x={157} />
      <Leg back d="M268 194C270 212 274 226 274 238C274 248 274 256 272 262H290C290 254 290 248 292 238C298 226 302 210 300 192Z" x={272} />

      {/* Body: a long, deep barrel with a straight back and no hump. */}
      <path
        d="M140 96C180 90 260 88 300 92C322 94 336 108 336 130C337 152 332 176 322 194C316 204 306 210 294 212C250 220 200 220 166 214C150 211 136 204 128 192C118 176 116 150 120 132C122 116 130 102 140 96Z"
        fill={coat}
        {...line}
      />
      <path d="M150 100C190 95 250 94 296 98" fill="none" stroke={sheen} strokeWidth="3" strokeLinecap="round" opacity="0.8" />

      {/* Gond-style decoration: a dotted line along the back, dashes along the belly, a flower and a spiral. */}
      <g fill="var(--color-ghee-400)">
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={164 + i * 11} cy={106 + (i > 10 ? (i - 10) * 1.5 : 0)} r="1.7" />
        ))}
      </g>
      <path d="M176 204C210 209 250 209 286 203" fill="none" stroke="#efe6da" strokeWidth="1.8" strokeDasharray="5 5" strokeLinecap="round" />
      <g>
        <circle cx="166" cy="148" r="15" fill="none" stroke="var(--color-ghee-400)" strokeWidth="1.8" />
        <circle cx="166" cy="148" r="5" fill="var(--color-spice)" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <circle key={i} cx={166 + Math.cos(a) * 10} cy={148 + Math.sin(a) * 10} r="2" fill="#efe6da" />;
        })}
      </g>
      <path d="M306 140c0-6 8-8 11-3 4 6-3 13-10 11-9-2-10-14-3-20 9-7 22-1 22 11" fill="none" stroke="var(--color-ghee-400)" strokeWidth="1.8" strokeLinecap="round" />
      <g fill="var(--color-spice)">
        <circle cx="300" cy="172" r="2.6" />
        <circle cx="309" cy="180" r="2.6" />
        <circle cx="291" cy="180" r="2.6" />
      </g>

      <path d="M262 208c0 10 8 16 18 14 8 0 12-8 10-14Z" fill="#4a3a40" stroke={ink} strokeWidth="1.4" />

      {/* Near legs. */}
      <Leg d="M134 194C132 212 136 230 138 240C138 250 137 256 137 262H155C155 254 155 248 155 240C157 228 159 212 158 196Z" x={137} />
      <Leg d="M290 194C292 212 296 226 296 238C296 248 296 256 294 262H312C312 254 312 248 314 238C320 226 326 208 324 190Z" x={294} />

      {/* Neck, head, garland and bell move together when she grazes. */}
      <g className={pose === "graze" ? "buf-graze" : undefined} style={{ transformOrigin: "152px 118px" }}>
        <path d="M152 98C130 96 108 100 94 108L80 150C90 168 106 180 126 186C128 168 128 140 134 118Z" fill={coat} {...line} />
        <path d="M90 156c8 14 18 22 30 26" fill="none" stroke={sheen} strokeWidth="1.4" opacity="0.7" />

        <g className="buf-head" style={{ transformOrigin: "98px 112px" }}>
          {/* Far horn sits behind the head. */}
          <g transform="translate(9 -5)">
            <path d={HORN} fill="none" stroke={far} strokeWidth="9" strokeLinecap="round" />
          </g>
          <path
            d="M102 104C92 97 74 97 64 103C52 111 40 128 32 144C26 154 25 167 33 174C43 181 58 179 68 172C80 163 92 151 100 138C106 126 107 112 102 104Z"
            fill={coat}
            {...line}
          />
          <path d="M62 108C54 120 46 136 40 150" fill="none" stroke={sheen} strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="34" cy="164" rx="11" ry="12" fill="#3a3236" stroke={ink} strokeWidth="1.4" />
          <path d="M29 158c3 2.4 6 2.4 9 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M44 176c5 1 10 0 14-3" fill="none" stroke={sheen} strokeWidth="1.4" strokeLinecap="round" />

          {/* Wide almond eye with a kajal wing. */}
          <path d="M57 120C61 113 71 113 79 119C71 126 61 126 57 120Z" fill="#fff" stroke={ink} strokeWidth="1.4" />
          <circle cx="68" cy="119.5" r="3.8" fill="#2a1810" />
          <circle cx="69.4" cy="118.2" r="1.1" fill="#fff" />
          <path d="M79 119l9-3.5" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M56 112C63 106 72 106 80 111" fill="none" stroke={sheen} strokeWidth="1.6" strokeLinecap="round" />
          <path className="buf-lid" d="M56 120C60 112 71 112 80 119L71 125H61Z" fill={coat} />
          <path d="M66 100c2 3 2 7 0 10-2-3-2-7 0-10Z" fill="var(--color-spice)" />

          {/* Small horizontal ear under the horn. */}
          <g className="buf-ear" style={{ transformOrigin: "95px 123px" }}>
            <path d="M94 120C106 114 122 116 130 124C122 132 104 132 94 126Z" fill={coat} {...line} />
            <path d="M99 122C108 119 118 120 124 124C116 128 105 128 99 124.5Z" fill="#6b4f5a" />
          </g>

          {/* Near horn: dark with painted festival bands, and a woollen phundna at its base. */}
          <path d={HORN} fill="none" stroke={ink} strokeWidth="11" strokeLinecap="round" />
          <path d={HORN} fill="none" stroke={hornColour} strokeWidth="8.4" strokeLinecap="round" />
          <path d={HORN} fill="none" stroke="var(--color-ghee-500)" strokeWidth="8.4" strokeDasharray="3 13" strokeDashoffset="-6" />
          <path d={HORN} fill="none" stroke="var(--color-spice)" strokeWidth="8.4" strokeDasharray="3 13" strokeDashoffset="-14" />
          <path d={HORN} fill="none" stroke="#6b5d63" strokeWidth="2" strokeLinecap="round" strokeDasharray="40 200" strokeDashoffset="-4" />
          <g>
            <path d="M92 104c-2 6-2 12 0 16M96 104c0 6 1 11 3 14" stroke="var(--color-spice)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <circle cx="90" cy="102" r="4.2" fill="var(--color-spice)" />
            <circle cx="96" cy="100" r="3.6" fill="var(--color-ghee-500)" />
            <circle cx="93" cy="96" r="3" fill="var(--color-pasture-600)" />
          </g>
        </g>

        {/* Marigold garland with a strand of kauri shells. */}
        {garland.map(([x, y], i) => (
          <Marigold key={`m${i}`} x={x} y={y} tone={i % 2 ? "var(--color-ghee-500)" : "var(--color-marigold)"} />
        ))}
        {kauri.map(([x, y], i) => (
          <g key={`k${i}`}>
            <ellipse cx={x} cy={y} rx="3.4" ry="2.4" fill="#f6efe2" stroke="#b9a98f" strokeWidth="0.8" transform={`rotate(-58 ${x} ${y})`} />
            <path d={`M${x - 1.4} ${y + 1.6}l2.8-3.2`} stroke="#b9a98f" strokeWidth="0.8" />
          </g>
        ))}

        {/* Brass bell on a red cord. */}
        <path d="M126 124C116 140 104 150 94 156" fill="none" stroke="var(--color-spice)" strokeWidth="2.4" />
        <g className="buf-bell" style={{ transformOrigin: "94px 156px" }}>
          <path d="M94 156v4" stroke={ink} strokeWidth="1.6" />
          <path d="M86 175c0-9 3.5-15 8-15s8 6 8 15Z" fill="var(--color-ghee-500)" stroke={ink} strokeWidth="1.4" />
          <circle cx="94" cy="177" r="2.4" fill={ink} />
        </g>
      </g>

      {/* Long tail with a white switch, as Murrah buffaloes have. */}
      <g className="buf-tail" style={{ transformOrigin: "334px 104px" }}>
        <path d="M334 104C344 122 346 162 344 200C343 214 342 224 342 232" fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" />
        <path d="M334 104C344 122 346 162 344 200C343 214 342 224 342 232" fill="none" stroke={coat} strokeWidth="4" strokeLinecap="round" />
        <path d="M342 226C333 236 333 252 342 262C351 252 351 236 342 226Z" fill="#f3ece2" stroke={ink} strokeWidth="1.2" />
      </g>

      {/* A cattle egret, the buffalo's constant companion, hops about on her back. */}
      {bird ? (
        <g className="buf-bird" style={{ transformOrigin: "238px 90px" }}>
          <path d="M235 90l-2-10M241 90l1-10" stroke="#2a2a2a" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="241" cy="75" rx="12" ry="7.5" fill="#fff" stroke="#cfc6b8" strokeWidth="0.8" transform="rotate(-14 241 75)" />
          <path d="M252 77l8 3-8 1.5Z" fill="#fff" stroke="#cfc6b8" strokeWidth="0.6" />
          <path d="M233 73C226 69 226 61 230 57" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <circle cx="229.5" cy="56" r="4.6" fill="#fff" stroke="#cfc6b8" strokeWidth="0.6" />
          <path d="M226 55.4l-9 1.8 9 1.6Z" fill="var(--color-ghee-500)" />
          <circle cx="228.6" cy="55" r="0.95" fill="#1a1a1a" />
        </g>
      ) : null}
    </svg>
  );
}
