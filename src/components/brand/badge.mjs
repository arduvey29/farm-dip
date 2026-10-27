/*
  फ़ार्म dip brand badge: a cream oval seal with a green double rule, the Hindi word on top,
  "dip" below, laurel sprigs at the sides, and a woodcut-style scene in the middle: a farmer
  resting under a banyan tree beside his fields at dusk.

  Plain SVG strings, used by scripts/generate-placeholders.mjs to write the brand files and
  product labels in /public/images. Pass a unique id per instance.
*/
import { dipLatin, farmHindi } from "./wordmark.mjs";

export const BRAND_COLORS = { cream: "#f3e5c4", creamEdge: "#e4cfa2", green: "#2c3b22", maroon: "#74201a" };

/** Full badge box. */
export const BADGE_VIEWBOX = { width: 400, height: 460 };
/** Emblem box: just the round scene with its rings. */
export const EMBLEM_VIEWBOX = "74 114 252 252";

const K = BRAND_COLORS;
const CX = 200;
const CY = 240;
const R = 118;

const f = (n) => Math.round(n * 10) / 10;

function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

function word(w, cx, baseline, scale) {
  return `<path transform="translate(${f(cx - (w.width * scale) / 2)} ${baseline}) scale(${scale})" d="${w.d}" fill="${K.maroon}"/>`;
}

function arc(rx, ry, a0, a1) {
  const p = (a) => [200 + rx * Math.cos((a * Math.PI) / 180), 230 + ry * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${f(x0)} ${f(y0)}A${rx} ${ry} 0 0 1 ${f(x1)} ${f(y1)}`;
}

function leaf(x, y, angle, len = 19, w = 6.5) {
  return `<path transform="translate(${x} ${y}) rotate(${angle})" d="M0 0C${w} ${-len * 0.3} ${w} ${-len * 0.75} 0 ${-len}C${-w} ${-len * 0.75} ${-w} ${-len * 0.3} 0 0Z"/>`;
}

function sprig(x, mirror) {
  const s = mirror ? -1 : 1;
  const nodes = [276, 256, 236, 216];
  return `<g fill="${K.green}">
    <path d="M${x} 292C${x - 3 * s} 262 ${x - 3 * s} 230 ${x} 198" fill="none" stroke="${K.green}" stroke-width="2"/>
    ${nodes.map((y) => leaf(x - 1.5 * s, y, -40) + leaf(x - 1.5 * s, y - 4, 40)).join("")}
    ${leaf(x, 200, 0, 17)}
    <circle cx="${x}" cy="306" r="3.2"/>
  </g>`;
}

function canopy() {
  const dark = [
    [96, 150, 32], [132, 132, 32], [172, 124, 32], [212, 126, 32], [252, 132, 32], [292, 144, 30], [318, 162, 22],
    [102, 186, 24], [142, 176, 26], [186, 170, 24], [228, 172, 24], [268, 176, 22], [302, 184, 16],
    [118, 206, 15], [162, 198, 13], [208, 192, 13], [250, 196, 12], [286, 198, 10],
  ];
  const r = rng(7);
  let leaves = "";
  for (const [x, y, rad] of dark) {
    for (let i = 0; i < 7; i++) {
      const a = Math.PI * (1.05 + r() * 0.9);
      const d = rad * (0.45 + r() * 0.45);
      leaves += `<ellipse cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" rx="4.2" ry="2.3" transform="rotate(${Math.round(r() * 180)} ${f(x + Math.cos(a) * d)} ${f(y + Math.sin(a) * d)})"/>`;
    }
  }
  return `
    <g fill="#3a5527">${dark.map(([x, y, rad]) => `<circle cx="${x}" cy="${y}" r="${rad}"/>`).join("")}</g>
    <g fill="#55753a">${dark.map(([x, y, rad]) => `<circle cx="${x - 4}" cy="${y - 6}" r="${f(rad * 0.68)}"/>`).join("")}</g>
    <g fill="#8fa955">${leaves}</g>`;
}

function fields() {
  const vp = [338, 262];
  let rows = "";
  for (let k = 0; k < 20; k++) {
    const x = -300 + k * 34;
    rows += `<path d="M${vp[0]} ${vp[1]}L${x} 372"/>`;
  }
  let plough = "";
  for (let k = 0; k < 8; k++) plough += `<path d="M${vp[0]} ${vp[1]}L${214 + k * 12} 372"/>`;
  return `
    <rect x="76" y="262" width="250" height="110" fill="#7f9645"/>
    <path d="M76 262H326V271C260 268 150 270 76 274Z" fill="#a9b562"/>
    <g stroke="#5f7a35" stroke-width="1.1">${rows}</g>
    <path d="M${vp[0]} ${vp[1]}L208 372H306Z" fill="#9c6b3f"/>
    <g stroke="#73492a" stroke-width="1.2">${plough}</g>
    <g stroke="#6b8739" stroke-width="0.8" fill="none"><path d="M76 280C160 276 250 273 326 270"/><path d="M76 300C160 295 250 290 326 284"/></g>`;
}

function tree() {
  const roots = [
    [96, 200, 252], [110, 206, 268], [184, 224, 296], [206, 210, 282], [234, 202, 266], [262, 194, 250], [292, 188, 236],
  ];
  return `
    <path d="M104 372C112 336 118 302 124 272C128 252 126 238 120 224L100 192L111 186C122 205 132 218 140 226C146 210 150 190 152 170L164 170C164 192 160 212 156 228C180 214 214 196 250 186C270 180 292 176 322 172L322 182C290 188 266 194 244 202C212 214 184 232 168 252C162 280 164 322 172 372Z" fill="#8a4a24" stroke="#4a2410" stroke-width="1.2"/>
    <g fill="none" stroke-linecap="round">
      <path d="M126 352C130 320 134 290 136 262M142 358C144 322 146 290 146 250M158 358C154 322 154 290 158 256" stroke="#5a2c14" stroke-width="1.6"/>
      <path d="M117 342C121 312 125 286 128 262M150 340C150 310 151 284 153 262" stroke="#b46e3b" stroke-width="1.2"/>
      <path d="M220 196C228 180 236 170 246 160M270 184C278 170 284 162 296 154M134 218C128 200 120 184 112 172" stroke="#7a4220" stroke-width="3.5"/>
    </g>
    <g fill="none" stroke="#6e3b1c" stroke-width="1.5" stroke-linecap="round">
      ${roots.map(([x, y0, y1]) => `<path d="M${x} ${y0}C${x + 3} ${y0 + (y1 - y0) * 0.35} ${x - 3} ${y0 + (y1 - y0) * 0.7} ${x + 1} ${y1}q2 4 -1 6"/>`).join("")}
    </g>`;
}

function farmer() {
  const skin = "#b26c3b";
  const dhoti = "#efe7d4";
  const kurta = "#3f5f8c";
  const safa = "#d4601c";
  const ink = "#2f1d10";
  return `<g transform="translate(182 326) scale(1.1)" stroke-linejoin="round">
    <path d="M-2 -2C12 0 26 3 38 5L38 13C24 13 10 12 -2 10Z" fill="${dhoti}" stroke="${ink}" stroke-width="0.7"/>
    <path d="M37 5L53 6.5V12L37 13Z" fill="${skin}"/>
    <path d="M52 6C55 2 58 2 59 5L58 12H52Z" fill="${skin}"/>
    <path d="M-14 -36C-16 -24 -12 -10 -8 2H14C12 -10 10 -24 8 -34C2 -38 -8 -39 -14 -36Z" fill="${kurta}"/>
    <path d="M-2 -30C-2 -20 0 -10 2 0M-9 -28C-9 -18 -7 -8 -5 0" fill="none" stroke="#2b4468" stroke-width="0.9"/>
    <path d="M-8 -36C-2 -33 4 -33 8 -35L6 -30C4 -22 2 -16 0 -12H-4C-3 -20 -4 -27 -8 -33Z" fill="${safa}"/>
    <path d="M-4 -42h7v7h-7Z" fill="${skin}"/>
    <circle cx="-1" cy="-48" r="8" fill="${skin}"/>
    <path d="M6 -51.5L10 -47.6L6.4 -46.4Z" fill="${skin}"/>
    <path d="M2.4 -45C4 -44 6.4 -44.2 8.6 -45.6" fill="none" stroke="${ink}" stroke-width="1.9" stroke-linecap="round"/>
    <circle cx="3.6" cy="-50" r="0.95" fill="${ink}"/>
    <ellipse cx="-4.5" cy="-48" rx="1.4" ry="2" fill="#8f5228"/>
    <path d="M-10 -54C-14 -50 -15 -46 -13 -42L-10 -45Z" fill="${safa}"/>
    <path d="M-10 -52C-11 -60 -4 -64 2 -63C8 -62 10 -58 9 -53C4 -55 -4 -55 -10 -52Z" fill="${safa}"/>
    <path d="M-9 -56C-3 -59 3 -59 9 -56M-8 -59.5C-2 -62 3 -61.5 7 -59.5" fill="none" stroke="#a3420f" stroke-width="0.9"/>
    <path d="M27 -27C31 -16 33 -6 33 6H40C40 -6 38 -18 35 -26Z" fill="${skin}"/>
    <path d="M31 5H43C45 7 45 10 43 11H31Z" fill="${skin}"/>
    <path d="M-6 -6C4 -16 16 -26 26 -31C33 -33 38 -27 35 -20C27 -12 15 -2 8 6H-4Z" fill="${dhoti}" stroke="${ink}" stroke-width="0.7"/>
    <path d="M6 -6C13 -13 20 -19 28 -24M10 0C16 -6 22 -11 29 -16" fill="none" stroke="#b9ae95" stroke-width="0.8"/>
    <path d="M2 -32C8 -28 12 -22 14 -16L20 -18C18 -24 14 -30 8 -35Z" fill="${kurta}"/>
    <path d="M14 -16L20 -18C23 -22 26 -26 29 -30L30 -25C26 -21 22 -17 18 -14Z" fill="${skin}"/>
    <circle cx="30" cy="-28.5" r="3.2" fill="${skin}"/>
  </g>`;
}

function props() {
  return `
    <path d="M124 304H160L156 324C146 329 138 329 128 324Z" fill="#a8763a" stroke="#5e3a17" stroke-width="0.8"/>
    <path d="M126 311H158M127 318H157" stroke="#7a5124" stroke-width="0.9"/>
    <path d="M134 305L135 326M142 305V328M150 305L149 326" stroke="#7a5124" stroke-width="0.8"/>
    <path d="M125 304C130 294 154 294 159 304Z" fill="#d8b05a"/>
    <ellipse cx="142" cy="304" rx="18" ry="3.5" fill="none" stroke="#5e3a17" stroke-width="1"/>
    <g fill="#b98a35"><circle cx="134" cy="301" r="1"/><circle cx="141" cy="298" r="1"/><circle cx="148" cy="300" r="1"/><circle cx="153" cy="302" r="1"/></g>
    <path d="M128 338L146 332" stroke="#6b3e1c" stroke-width="3" stroke-linecap="round"/>
    <path d="M146 332C158 324 172 332 166 345C163 336 155 332 147 335Z" fill="#a9b0b4" stroke="#4a4f52" stroke-width="0.6"/>
    <g fill="none" stroke="#3f5a26" stroke-width="1.2" stroke-linecap="round">
      <path d="M92 340l3-9M97 341l1-8M104 343l-2-7M262 344l2-7M268 342l-1-6M210 350l2-8M216 350l-1-6"/>
    </g>`;
}

function millet() {
  return `<g>
    <path d="M102 322V296M108 322V290M114 322V300" stroke="#5f7a35" stroke-width="1.4"/>
    <g fill="#a8452a"><ellipse cx="102" cy="292" rx="2.6" ry="6"/><ellipse cx="108" cy="286" rx="2.6" ry="6.5"/><ellipse cx="114" cy="296" rx="2.4" ry="5.5"/></g>
  </g>`;
}

/** The round scene with its rings, centred on (200, 240). */
function emblem(id) {
  return `
  <defs>
    <clipPath id="${id}-c"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
    <linearGradient id="${id}-s" x1="0" y1="122" x2="0" y2="262" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#efe6c6"/><stop offset="0.55" stop-color="#f4dca2"/><stop offset="1" stop-color="#f6c47c"/>
    </linearGradient>
  </defs>
  <circle cx="${CX}" cy="${CY}" r="${R + 6}" fill="${K.cream}"/>
  <g clip-path="url(#${id}-c)">
    <rect x="76" y="116" width="250" height="150" fill="url(#${id}-s)"/>
    <g fill="#fbf3dc" opacity="0.9"><ellipse cx="270" cy="234" rx="28" ry="3.6"/><ellipse cx="302" cy="226" rx="18" ry="3"/><ellipse cx="236" cy="244" rx="16" ry="2.6"/></g>
    <path d="M76 262V252C100 246 120 250 140 245C160 240 175 248 195 250C215 252 235 242 255 244C275 246 295 238 326 246V262Z" fill="#8b9aa6"/>
    <path d="M76 262C120 256 160 260 200 257C240 254 280 259 326 255V262Z" fill="#a9b3ae"/>
    ${fields()}
    ${millet()}
    <path d="M76 330C120 322 170 326 230 340C260 346 290 350 326 352V372H76Z" fill="#55722f"/>
    ${tree()}
    ${canopy()}
    ${farmer()}
    ${props()}
  </g>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${K.green}" stroke-width="3"/>
  <circle cx="${CX}" cy="${CY}" r="${R + 6}" fill="none" stroke="${K.green}" stroke-width="1"/>`;
}

/** Inner markup for <svg viewBox="0 0 400 460">. */
export function badgeMarkup(id = "fd") {
  return `
  <defs>
    <radialGradient id="${id}-p" cx="0.5" cy="0.45" r="0.6"><stop offset="0.6" stop-color="${K.cream}"/><stop offset="1" stop-color="${K.creamEdge}"/></radialGradient>
  </defs>
  <ellipse cx="200" cy="230" rx="196" ry="226" fill="url(#${id}-p)" stroke="${K.green}" stroke-width="3.5"/>
  <ellipse cx="200" cy="230" rx="185" ry="215" fill="none" stroke="${K.green}" stroke-width="1.4"/>
  <g fill="none" stroke="${K.maroon}" stroke-width="2.2" stroke-linecap="round">
    <path d="M68 112L114 90M332 112L286 90M80 388L132 400M320 388L268 400"/>
  </g>
  <g fill="none" stroke="${K.green}" stroke-width="2" stroke-linecap="round">
    <path d="${arc(168, 198, 200, 212)}"/><path d="${arc(168, 198, 148, 160)}"/>
    <path d="${arc(168, 198, 328, 340)}"/><path d="${arc(168, 198, 20, 32)}"/>
  </g>
  ${sprig(46, false)}
  ${sprig(354, true)}
  ${word(farmHindi, 200, 106, 0.074)}
  ${word(dipLatin, 200, 420, 0.076)}
  ${emblem(id)}`;
}

/** Inner markup for <svg viewBox={EMBLEM_VIEWBOX}>. */
export function emblemMarkup(id = "fe") {
  return emblem(id);
}

/** Standalone SVG files (favicons, Open Graph, product labels). */
export function badgeSvg(id = "fd") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460" width="400" height="460">${badgeMarkup(id)}</svg>`;
}
export function emblemSvg(id = "fe") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${EMBLEM_VIEWBOX}" width="252" height="252">${emblemMarkup(id)}</svg>`;
}
