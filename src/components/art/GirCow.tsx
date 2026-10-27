/*
  Gauri, a Gir cow painted in the Pichwai manner: cream coat with rust patches, a domed forehead,
  long folded ears, brass-banded horns, a block-print jhool on her back and a marigold garland.
  Drawn facing left in a 360 × 280 box. Parts move with CSS only (see "Living art" in globals.css),
  so the drawing renders on the server and costs no JavaScript.
*/

const ink = "var(--color-maroon-900)";
const coat = "#fbf1de";
const shade = "#e9d6b2";
const rust = "#c0662e";
const hoof = "var(--color-maroon-950)";

const line = { stroke: ink, strokeWidth: 2.2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Leg({ d, far = false, anklet }: { d: string; far?: boolean; anklet: [number, number] }) {
  const [x, y] = anklet;
  return (
    <g>
      <path d={d} fill={far ? shade : coat} {...line} />
      <path d={`M${x - 1} ${y + 8}h16l1.5 8h-19Z`} fill={hoof} />
      <rect x={x} y={y} width="14" height="4" rx="2" fill="var(--color-haldi-500)" stroke={ink} strokeWidth="1" />
      <circle cx={x + 3} cy={y + 6} r="1.6" fill="var(--color-haldi-400)" />
      <circle cx={x + 11} cy={y + 6} r="1.6" fill="var(--color-haldi-400)" />
    </g>
  );
}

function Marigold({ x, y, r = 4.2, tone = "var(--color-genda)" }: { x: number; y: number; r?: number; tone?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={tone} stroke="var(--color-haldi-800)" strokeWidth="0.8" />
      <circle cx={x} cy={y} r={r * 0.45} fill="var(--color-haldi-300)" />
    </g>
  );
}

export function GirCow({ pose = "stand", className = "" }: { pose?: "stand" | "graze"; className?: string }) {
  const garland: [number, number][] = [
    [134, 90],
    [133, 100],
    [131, 110],
    [128, 120],
    [125, 130],
    [121, 140],
    [116, 150],
    [111, 159],
    [105, 167],
  ];
  return (
    <svg viewBox="0 0 360 280" className={`cow ${className}`} data-pose={pose} aria-hidden focusable="false">
      <ellipse cx="200" cy="270" rx="132" ry="7" fill="rgb(74 20 16 / 0.18)" />

      {/* Far legs sit behind the body, in shadow. */}
      <Leg far d="M158 196c-2 18 2 34 4 42 0 10-2 18-2 24h14c0-8 0-16 0-24 2-12 4-28 4-40Z" anklet={[160, 252]} />
      <Leg far d="M266 196c2 18 6 30 6 42 0 10 0 18-2 24h14c0-8 0-16 2-26 6-10 10-24 8-40Z" anklet={[270, 252]} />

      {/* Body: hump, back, rump, belly, chest. */}
      <path
        d="M128 112C132 96 140 74 156 72C170 70 178 82 186 88C220 92 262 88 296 92C316 94 330 104 332 124C334 146 328 170 318 186C314 196 306 204 296 206L280 208C250 214 200 214 172 208C160 206 150 204 142 200C128 194 118 176 116 156C114 140 118 124 128 112Z"
        fill={coat}
        {...line}
      />
      <g fill={rust} opacity="0.88">
        <path d="M298 112C312 106 324 118 322 134C320 148 304 150 296 140C290 132 290 118 298 112Z" />
        <path d="M150 120C164 112 178 122 176 138C174 152 158 156 150 146C144 138 144 126 150 120Z" />
        <path d="M214 176C228 170 246 176 244 190C242 202 222 204 214 196C208 190 208 180 214 176Z" />
      </g>
      {/* Three tika dots on the haunch, the way cows are marked at Gopashtami. */}
      <g fill="var(--color-kumkum)">
        <circle cx="306" cy="170" r="3" />
        <circle cx="298" cy="180" r="3" />
        <circle cx="314" cy="180" r="3" />
      </g>
      <path d="M262 206c0 12 8 18 18 16 8 0 12-8 10-16Z" fill="#efb59c" {...line} strokeWidth={1.6} />

      {/* Near legs. */}
      <Leg d="M136 196c-2 18 2 34 4 42 0 10-2 18-2 24h14c0-8 0-16 0-24 2-12 4-28 4-40Z" anklet={[138, 252]} />
      <Leg d="M286 196c2 18 6 30 6 42 0 10 0 18-2 24h14c0-8 0-16 2-26 6-10 12-26 10-42Z" anklet={[290, 252]} />

      {/* Jhool: a block-printed cloth over the back, brass border, mirror work and tassels. */}
      <g>
        <path
          d="M186 88C220 92 262 88 296 92L302 150Q292 162 282 150Q272 162 262 150Q252 162 242 150Q232 162 222 150Q212 162 202 150Q192 162 182 150Z"
          fill="var(--color-kumkum)"
          {...line}
        />
        <path d="M192 98C222 101 260 98 290 101L294 140H188Z" fill="none" stroke="var(--color-haldi-400)" strokeWidth="2" strokeDasharray="1 4" strokeLinecap="round" />
        {[206, 230, 254, 278].map((x) => (
          <g key={x}>
            <path d={`M${x} 108l7 10-7 10-7-10Z`} fill="var(--color-haldi-400)" stroke={ink} strokeWidth="1" />
            <circle cx={x} cy="118" r="2.4" fill="#fff8ec" stroke="var(--color-peetal)" strokeWidth="1" />
          </g>
        ))}
        {[182, 202, 222, 242, 262, 282, 302].map((x) => (
          <g key={x}>
            <path d={`M${x} 150v8`} stroke="var(--color-haldi-700)" strokeWidth="1.4" />
            <circle cx={x} cy="160" r="2.6" fill="var(--color-haldi-500)" />
          </g>
        ))}
      </g>

      {/* Neck, head, garland and bell move together when she grazes. */}
      <g className={pose === "graze" ? "cow-graze" : undefined} style={{ transformOrigin: "150px 116px" }}>
        <path d="M156 80C134 82 110 84 92 90L74 132C80 150 86 172 104 190C112 197 124 200 134 196C126 184 120 168 118 150L130 112Z" fill={coat} {...line} />
        <path d="M86 150c6 16 12 28 22 36" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.5" />

        <g className="cow-head" style={{ transformOrigin: "100px 96px" }}>
          {/* Far horn, then head, then near horn. */}
          <path d="M80 82C86 72 96 68 100 60C103 54 103 48 99 44C105 50 107 60 102 68C97 76 90 80 86 86Z" fill="var(--color-peetal)" {...line} strokeWidth={1.6} />
          <path
            d="M96 86C86 78 70 78 62 86C54 94 52 106 50 116C46 130 38 142 34 152C30 160 32 170 42 172C52 174 62 170 70 162C80 152 92 140 98 124C102 110 102 96 96 86Z"
            fill={coat}
            {...line}
          />
          <path d="M74 120C82 114 92 118 92 128C92 138 82 140 76 134C72 130 70 124 74 120Z" fill={rust} opacity="0.88" />
          <ellipse cx="40" cy="162" rx="9" ry="8" fill="#efb59c" stroke={ink} strokeWidth="1.4" />
          <path d="M36 160c2 2 4 2 6 0" fill="none" stroke={ink} strokeWidth="1.6" />
          <path d="M48 170c4 1 8 0 11-2" fill="none" stroke={ink} strokeWidth="1.2" />

          {/* Pichwai eye: wide almond, kohl wing, arched brow. */}
          <path d="M57 109C61 103 70 103 77 108C70 114 61 114 57 109Z" fill="#fff" stroke={ink} strokeWidth="1.6" />
          <circle cx="68" cy="108.5" r="3.4" fill={hoof} />
          <circle cx="69.2" cy="107.4" r="1" fill="#fff" />
          <path d="M77 108l9-4" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <path d="M56 101C63 95 72 95 79 100" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <path className="cow-lid" d="M56 109C60 102 70 102 78 108L70 114H60Z" fill={coat} />

          {/* Tilak and a brass forehead ornament. */}
          <path d="M66 86c2 4 2 8 0 12-2-4-2-8 0-12Z" fill="var(--color-kumkum)" />
          <circle cx="66" cy="84" r="3" fill="var(--color-haldi-500)" stroke={ink} strokeWidth="1" />

          <path d="M84 84C92 74 104 72 110 64C114 58 114 52 110 48C116 54 118 64 112 72C106 80 96 84 90 90Z" fill="var(--color-haldi-500)" {...line} strokeWidth={1.6} />
          <path d="M96 78l6-6M102 74l5-6" stroke="var(--color-kumkum)" strokeWidth="2.2" />
          <path d="M110 48c-2-6 2-10 6-10" fill="none" stroke="var(--color-kumkum)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="117" cy="38" r="3" fill="var(--color-kumkum)" />

          {/* Long Gir ear, folded like a leaf and curled at the tip. */}
          <g className="cow-ear" style={{ transformOrigin: "88px 100px" }}>
            <path d="M88 100C104 104 110 124 104 146C102 154 96 158 90 154C94 150 96 146 94 142C86 132 82 114 88 100Z" fill={coat} {...line} />
            <path d="M91 108C100 116 100 132 96 142C90 132 88 120 91 108Z" fill="#efb59c" />
          </g>
        </g>

        {garland.map(([x, y], i) => (
          <Marigold key={i} x={x} y={y} tone={i % 2 ? "var(--color-haldi-500)" : "var(--color-genda)"} />
        ))}

        {/* Brass bell on a red cord. */}
        <path d="M120 120C112 136 100 146 90 152" fill="none" stroke="var(--color-kumkum)" strokeWidth="2.4" />
        <g className="cow-bell" style={{ transformOrigin: "90px 152px" }}>
          <path d="M90 152v4" stroke={ink} strokeWidth="1.6" />
          <path d="M83 170c0-8 3-14 7-14s7 6 7 14Z" fill="var(--color-haldi-500)" stroke={ink} strokeWidth="1.4" />
          <circle cx="90" cy="172" r="2.2" fill={ink} />
        </g>
      </g>

      {/* Tail with a dark switch. */}
      <g className="cow-tail" style={{ transformOrigin: "328px 104px" }}>
        <path d="M328 104C340 120 344 160 342 196C341 210 340 220 340 228" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
        <path d="M328 104C340 120 344 160 342 196C341 210 340 220 340 228" fill="none" stroke={coat} strokeWidth="3" strokeLinecap="round" />
        <path d="M340 222C331 231 331 248 340 258C349 248 349 231 340 222Z" fill={ink} />
      </g>
    </svg>
  );
}
