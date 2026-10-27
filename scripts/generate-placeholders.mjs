/**
 * Generates TEMPORARY placeholder artwork into /public/images.
 * Run: npm run placeholders
 *
 * Replace each file with real photography using the same path (or update the
 * paths in src/data/*.ts). Suggested art direction: jars with a red cloth tied
 * over the lid, on a banana leaf or brass thali, with marigolds, shot on a warm
 * cream or rangoli background.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { badgeMarkup, badgeSvg, emblemSvg } from "../src/components/brand/badge.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const C = {
  maroon: "#4a1410",
  maroonMid: "#6a1b15",
  maroonDeep: "#2a0e0a",
  kumkum: "#b3201a",
  kumkumDark: "#8e1712",
  haldi: "#e8a30c",
  haldiLight: "#f8d47a",
  genda: "#f07c12",
  peetal: "#b8862b",
  chandan: "#f8ead0",
  paper: "#fff8ec",
  leaf: "#3f6b1f",
  leafLight: "#6c9a35",
};

const palettes = {
  gir: { light: "#f8d98a", mid: "#e8a30c", dark: "#b8790c", bg: "#fbefd6" },
  sahiwal: { light: "#fae4a8", mid: "#efc35a", dark: "#cf9a2c", bg: "#fcf2dd" },
  buffalo: { light: "#fffcf1", mid: "#f4ecd2", dark: "#ddd0aa", bg: "#f7eedc" },
  haldi: { light: "#f7c25a", mid: "#e58a10", dark: "#b45f05", bg: "#fbead0" },
};

/** The फ़ार्म dip badge as a label, `height` tall, centred on cx. */
function badge(cx, top, height, id) {
  const s = height / 460;
  return `<g transform="translate(${(cx - 200 * s).toFixed(1)} ${top.toFixed(1)}) scale(${s.toFixed(4)})">${badgeMarkup(id)}</g>`;
}

function write(rel, svg) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + "\n");
  console.log("wrote", rel);
}

// Deterministic PRNG so regenerated files do not churn in git.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function hash(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const DEV = "'Nirmala UI', 'Kohinoor Devanagari', 'Noto Sans Devanagari', serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Segoe UI', Arial, sans-serif";

function granules(seed, { x, y, w, h, count, colors, rMin = 2, rMax = 7 }) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const cx = x + r() * w;
    const cy = y + r() * h;
    const rad = rMin + r() * (rMax - rMin);
    const fill = colors[Math.floor(r() * colors.length)];
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(1)}" fill="${fill}" opacity="${(0.35 + r() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}

/* ---------- Motifs ---------- */

function marigold(cx, cy, r) {
  let petals = "";
  for (let ring = 0; ring < 3; ring++) {
    const n = 14 - ring * 3;
    const rr = r * (1 - ring * 0.28);
    const col = ["#e86a0c", C.genda, "#f6a019"][ring];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + ring * 0.3;
      petals += `<circle cx="${(cx + Math.cos(a) * rr * 0.62).toFixed(1)}" cy="${(cy + Math.sin(a) * rr * 0.62).toFixed(1)}" r="${(rr * 0.42).toFixed(1)}" fill="${col}"/>`;
    }
  }
  return `${petals}<circle cx="${cx}" cy="${cy}" r="${(r * 0.22).toFixed(1)}" fill="#c45a00"/>`;
}

function bananaLeaf(cx, cy, w, h) {
  return `
  <path d="M${cx - w / 2} ${cy} C ${cx - w * 0.3} ${cy - h}, ${cx + w * 0.3} ${cy - h}, ${cx + w / 2} ${cy} C ${cx + w * 0.3} ${cy + h * 0.9}, ${cx - w * 0.3} ${cy + h * 0.9}, ${cx - w / 2} ${cy} Z" fill="${C.leaf}"/>
  <path d="M${cx - w / 2} ${cy} C ${cx - w * 0.3} ${cy - h * 0.82}, ${cx + w * 0.3} ${cy - h * 0.82}, ${cx + w / 2} ${cy}" fill="none" stroke="${C.leafLight}" stroke-width="5"/>
  ${Array.from({ length: 14 }, (_, i) => {
    const x = cx - w * 0.42 + (i / 13) * w * 0.84;
    return `<path d="M${x} ${cy - h * 0.28} L${x - 18} ${cy + h * 0.5}" stroke="${C.leafLight}" stroke-width="2" opacity="0.5"/>`;
  }).join("")}`;
}

/** Rangoli circle drawn behind the product. */
function rangoli(cx, cy, r, { wash = true } = {}) {
  const ring = (n, rr, len, w, fill, op) =>
    Array.from({ length: n }, (_, i) => {
      const a = (360 / n) * i;
      return `<path d="M${cx} ${cy - rr} C ${cx + w} ${cy - rr - len * 0.4}, ${cx + w * 0.6} ${cy - rr - len * 0.9}, ${cx} ${cy - rr - len} C ${cx - w * 0.6} ${cy - rr - len * 0.9}, ${cx - w} ${cy - rr - len * 0.4}, ${cx} ${cy - rr} Z" fill="${fill}" opacity="${op}" transform="rotate(${a} ${cx} ${cy})"/>`;
    }).join("");
  const dots = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="5" fill="${C.kumkum}" opacity="0.35"/>`;
  }).join("");
  return `
  ${wash ? `<circle cx="${cx}" cy="${cy}" r="${r * 0.92}" fill="#ffffff" opacity="0.45"/>` : ""}
  ${ring(24, r * 0.62, r * 0.26, r * 0.07, C.genda, 0.28)}
  ${ring(12, r * 0.34, r * 0.28, r * 0.12, C.kumkum, 0.18)}
  ${ring(12, r * 0.34, r * 0.18, r * 0.06, C.haldi, 0.35)}
  <circle cx="${cx}" cy="${cy}" r="${r * 0.6}" fill="none" stroke="${C.peetal}" stroke-width="3" opacity="0.5" stroke-dasharray="4 10"/>
  ${dots}`;
}

/** Kolam dot grid across the background. */
function kolamDots(w, h, gap = 60) {
  let out = "";
  for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) out += `<circle cx="${x}" cy="${y}" r="2.4" fill="${C.peetal}" opacity="0.22"/>`;
  return out;
}

function kairiStrip(x, y, width, h, id) {
  return `
  <defs>
    <pattern id="${id}" x="${x}" y="${y}" width="${h * 1.8}" height="${h}" patternUnits="userSpaceOnUse">
      <rect width="${h * 1.8}" height="${h}" fill="${C.maroon}"/>
      <path d="M${h * 0.9} ${h * 0.15} c${h * 0.3} 0 ${h * 0.45} ${h * 0.25} ${h * 0.45} ${h * 0.45} 0 ${h * 0.25} -${h * 0.2} ${h * 0.4} -${h * 0.45} ${h * 0.4} -${h * 0.1} 0 -${h * 0.15} -${h * 0.05} -${h * 0.1} -${h * 0.12} ${h * 0.12} -${h * 0.05} ${h * 0.18} -${h * 0.15} ${h * 0.12} -${h * 0.28} -${h * 0.05} -${h * 0.12} -${h * 0.2} -${h * 0.12} -${h * 0.28} -${h * 0.02} z" fill="${C.haldi}"/>
      <circle cx="${h * 0.2}" cy="${h * 0.5}" r="${h * 0.08}" fill="${C.chandan}"/>
    </pattern>
  </defs>
  <rect x="${x}" y="${y}" width="${width}" height="${h}" fill="url(#${id})"/>`;
}

/* ---------- Jar with a cloth-tied lid ---------- */
function jarGroup({ cx, baseY, scale = 1, pal, name, volume, seed, label = true }) {
  const w = 420 * scale;
  const h = 560 * scale;
  const x = cx - w / 2;
  const y = baseY - h;
  const fillTop = y + 70 * scale;
  const id = `j${seed}`;
  // Badge sticker on the front, product name on a maroon band below it.
  const labelY = y + h * 0.72;
  const labelH = h * 0.15;
  const clothTop = y - 70 * scale;
  const clothBottom = y + 62 * scale;
  const scallops = 9;
  const left = x - 20 * scale;
  const right = x + w + 20 * scale;
  const edgeY = clothBottom - 10 * scale;
  const dipY = clothBottom + 22 * scale;
  const sw = (right - left) / scallops;
  // Scalloped hem: left-to-right for the gold trim, right-to-left to close the cloth fill.
  let scallopPath = `M${left} ${edgeY}`;
  let hemBack = "";
  for (let i = 0; i < scallops; i++) {
    const sx = left + i * sw;
    scallopPath += ` Q ${sx + sw / 2} ${dipY} ${sx + sw} ${edgeY}`;
  }
  for (let i = scallops - 1; i >= 0; i--) {
    const sx = left + i * sw;
    hemBack += ` Q ${sx + sw / 2} ${dipY} ${sx} ${edgeY}`;
  }
  const clothDots = Array.from({ length: 22 }, (_, i) => {
    const px = x + ((i * 37) % 100) / 100 * w;
    const py = clothTop + 30 * scale + ((i * 53) % 100) / 100 * (clothBottom - clothTop - 50 * scale);
    return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(4 * scale).toFixed(1)}" fill="${C.haldiLight}" opacity="0.85"/>`;
  }).join("");
  return `
  <defs>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${pal.dark}"/>
      <stop offset="0.35" stop-color="${pal.mid}"/>
      <stop offset="0.6" stop-color="${pal.light}"/>
      <stop offset="1" stop-color="${pal.dark}"/>
    </linearGradient>
    <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.kumkum}"/>
      <stop offset="1" stop-color="${C.kumkumDark}"/>
    </linearGradient>
    <clipPath id="${id}k"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${60 * scale}"/></clipPath>
  </defs>
  <g clip-path="url(#${id}k)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" opacity="0.55"/>
    <rect x="${x}" y="${fillTop}" width="${w}" height="${h}" fill="url(#${id}g)"/>
    ${granules(seed, { x, y: fillTop, w, h: h - 70 * scale, count: Math.round(240 * scale), colors: [pal.light, pal.dark, "#ffffff"], rMin: 2 * scale, rMax: 6 * scale })}
    <rect x="${x + w * 0.1}" y="${y + 20 * scale}" width="${w * 0.07}" height="${h * 0.8}" rx="${12 * scale}" fill="#ffffff" opacity="0.35"/>
  </g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${60 * scale}" fill="none" stroke="${C.maroon}" stroke-opacity="0.25" stroke-width="${4 * scale}"/>

  <!-- Red cloth tied over the lid -->
  <path d="M${x + 30 * scale} ${clothTop + 30 * scale} Q ${cx} ${clothTop - 40 * scale} ${x + w - 30 * scale} ${clothTop + 30 * scale} L ${right} ${edgeY}${hemBack} Z" fill="url(#${id}c)"/>
  <path d="${scallopPath}" fill="none" stroke="${C.haldi}" stroke-width="${5 * scale}"/>
  ${clothDots}
  <!-- Twine tied round the neck -->
  <rect x="${x - 6 * scale}" y="${y + 22 * scale}" width="${w + 12 * scale}" height="${10 * scale}" rx="${5 * scale}" fill="${C.peetal}"/>
  <path d="M${x + w * 0.78} ${y + 32 * scale} q ${10 * scale} ${40 * scale} ${-6 * scale} ${70 * scale} M${x + w * 0.8} ${y + 32 * scale} q ${24 * scale} ${34 * scale} ${18 * scale} ${66 * scale}" stroke="${C.peetal}" stroke-width="${6 * scale}" fill="none" stroke-linecap="round"/>
  ${
    label
      ? `
  ${badge(cx, y + h * 0.2, h * 0.5, `${id}b`)}
  <rect x="${x - 2}" y="${labelY}" width="${w + 4}" height="${labelH}" fill="${C.maroon}"/>
  <path d="M${x - 2} ${labelY + 5 * scale}H${x + w + 2}M${x - 2} ${labelY + labelH - 5 * scale}H${x + w + 2}" stroke="${C.peetal}" stroke-width="${2 * scale}"/>
  <text x="${cx}" y="${labelY + labelH * 0.47}" text-anchor="middle" font-family="${SANS}" font-size="${24 * scale}" font-weight="700" fill="${C.chandan}">${esc(name)}</text>
  ${volume ? `<text x="${cx}" y="${labelY + labelH * 0.8}" text-anchor="middle" font-family="${SANS}" font-size="${18 * scale}" fill="${C.haldiLight}">${esc(volume)}</text>` : ""}`
      : ""
  }`;
}

/* ---------- Steel dolchi (pail) ---------- */
function dolchiGroup({ cx, baseY, scale = 1, name, volume, seed }) {
  const topW = 440 * scale;
  const botW = 380 * scale;
  const h = 520 * scale;
  const y = baseY - h;
  const id = `d${seed}`;
  return `
  <defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8d939c"/>
      <stop offset="0.3" stop-color="#e8ebef"/>
      <stop offset="0.5" stop-color="#ffffff"/>
      <stop offset="0.75" stop-color="#c3c8cf"/>
      <stop offset="1" stop-color="#7d838c"/>
    </linearGradient>
  </defs>
  <path d="M${cx - topW / 2 - 20 * scale} ${y + 30 * scale} Q ${cx} ${y - 230 * scale} ${cx + topW / 2 + 20 * scale} ${y + 30 * scale}" fill="none" stroke="#9aa0a8" stroke-width="${12 * scale}" stroke-linecap="round"/>
  <path d="M${cx - topW / 2} ${y} L${cx + topW / 2} ${y} L${cx + botW / 2} ${baseY} L${cx - botW / 2} ${baseY} Z" fill="url(#${id}s)"/>
  <ellipse cx="${cx}" cy="${y}" rx="${topW / 2 + 8 * scale}" ry="${30 * scale}" fill="#b9bec6"/>
  <ellipse cx="${cx}" cy="${y - 6 * scale}" rx="${topW / 2 - 10 * scale}" ry="${22 * scale}" fill="#dfe3e8"/>
  <path d="M${cx + topW / 2 - 30 * scale} ${y - 10 * scale} l ${30 * scale} ${50 * scale} l ${-24 * scale} ${10 * scale} z" fill="${C.kumkum}"/>
  ${badge(cx, y + 90 * scale, 260 * scale, `${id}b`)}
  <rect x="${cx - 150 * scale}" y="${y + 368 * scale}" width="${300 * scale}" height="${76 * scale}" rx="${8 * scale}" fill="${C.maroon}"/>
  <text x="${cx}" y="${y + 400 * scale}" text-anchor="middle" font-family="${SANS}" font-size="${20 * scale}" font-weight="700" fill="${C.chandan}">${esc(name)}</text>
  ${volume ? `<text x="${cx}" y="${y + 428 * scale}" text-anchor="middle" font-family="${SANS}" font-size="${16 * scale}" fill="${C.haldiLight}">${esc(volume)}</text>` : ""}`;
}

/** Square product scene: kolam dots, rangoli, banana leaf, marigolds, then the product. */
function scene(content, bg, seed, { leaf = true } = {}) {
  const r = rng(seed);
  const flowers = [
    [150 + r() * 60, 1040 + r() * 40, 46],
    [1050 - r() * 60, 1010 + r() * 40, 52],
    [980 - r() * 40, 1110, 34],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
  <rect width="1200" height="1200" fill="${bg}"/>
  ${kolamDots(1200, 1200)}
  ${rangoli(600, 560, 470)}
  ${leaf ? bananaLeaf(600, 1030, 1000, 150) : ""}
  ${content}
  ${flowers.map(([x, y, s]) => marigold(x, y, s)).join("")}
</svg>`;
}

function textureArt(pal, seed) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
  <defs>
    <radialGradient id="t" cx="0.4" cy="0.35" r="0.9">
      <stop offset="0" stop-color="${pal.light}"/>
      <stop offset="0.55" stop-color="${pal.mid}"/>
      <stop offset="1" stop-color="${pal.dark}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="1200" fill="url(#t)"/>
  ${granules(seed, { x: 0, y: 0, w: 1200, h: 1200, count: 1400, colors: [pal.light, pal.dark, "#ffffff", pal.mid], rMin: 3, rMax: 12 })}
  <g transform="rotate(-28 600 600)">
    <ellipse cx="600" cy="520" rx="150" ry="110" fill="#8a5a2b"/>
    <ellipse cx="600" cy="515" rx="128" ry="90" fill="${pal.mid}"/>
    ${granules(seed + 7, { x: 480, y: 440, w: 240, h: 150, count: 90, colors: [pal.light, "#ffffff"], rMin: 3, rMax: 8 })}
    <rect x="580" y="620" width="40" height="480" rx="20" fill="#8a5a2b"/>
  </g>
  ${marigold(170, 170, 70)}${marigold(1040, 1050, 80)}
</svg>`;
}

/* ---------- Products ---------- */
const products = [
  { slug: "a2-gir-cow-bilona-ghee", name: "A2 Gir Cow Ghee", pal: "gir", sizes: ["250 ml", "500 ml", "1 L", "2.5 L", "5 L"], dolchi: true },
  { slug: "a2-sahiwal-cow-bilona-ghee", name: "A2 Sahiwal Cow Ghee", pal: "sahiwal", sizes: ["500 ml", "1 L"] },
  { slug: "desi-buffalo-bilona-ghee", name: "Desi Buffalo Ghee", pal: "buffalo", sizes: ["500 ml", "1 L", "2.5 L"], dolchi: true },
  { slug: "haldi-infused-cow-ghee", name: "Haldi A2 Cow Ghee", pal: "haldi", sizes: ["250 ml", "500 ml"] },
];

for (const p of products) {
  const pal = palettes[p.pal];
  const seed = hash(p.slug);
  write(`products/${p.slug}/jar.svg`, scene(jarGroup({ cx: 600, baseY: 1000, scale: 1.18, pal, name: p.name, volume: "Bilona churned", seed }), pal.bg, seed));
  write(`products/${p.slug}/texture.svg`, textureArt(pal, seed + 1));
  if (p.dolchi) {
    write(`products/${p.slug}/dolchi.svg`, scene(dolchiGroup({ cx: 600, baseY: 1000, scale: 1.2, name: p.name, volume: "Food-grade steel", seed: seed + 2 }), pal.bg, seed + 2));
  }
  const scales = { "250 ml": 0.42, "500 ml": 0.52, "1 L": 0.62, "2.5 L": 0.7, "5 L": 0.8 };
  const n = p.sizes.length;
  const gap = 1100 / n;
  let lineup = "";
  p.sizes.forEach((size, i) => {
    const cx = 50 + gap * i + gap / 2;
    const s = scales[size] * (n > 3 ? 0.85 : 1.1);
    const isDolchi = size.endsWith(" L") && parseFloat(size) >= 2.5;
    lineup += isDolchi
      ? dolchiGroup({ cx, baseY: 930, scale: s, name: p.name, volume: size, seed: seed + 10 + i })
      : jarGroup({ cx, baseY: 930, scale: s, pal, name: p.name, volume: size, seed: seed + 10 + i });
    lineup += `<text x="${cx}" y="1010" text-anchor="middle" font-family="${SANS}" font-size="34" font-weight="700" fill="${C.maroon}">${size}</text>`;
  });
  write(`products/${p.slug}/sizes.svg`, scene(lineup, pal.bg, seed + 3, { leaf: false }));
}

/* ---------- Bundles ---------- */
{
  const pal = palettes.gir;
  const s = hash("family");
  write(
    "products/family-saver-2x1l/bundle.svg",
    scene(
      jarGroup({ cx: 400, baseY: 1000, scale: 0.9, pal, name: "A2 Gir Cow Ghee", volume: "1 L", seed: s }) +
        jarGroup({ cx: 800, baseY: 1000, scale: 0.9, pal, name: "A2 Gir Cow Ghee", volume: "1 L", seed: s + 1 }),
      pal.bg,
      s,
    ),
  );
}
{
  const s = hash("duo");
  const carton = `
  <rect x="170" y="600" width="860" height="440" rx="18" fill="${C.maroon}"/>
  <rect x="190" y="620" width="820" height="400" fill="none" stroke="${C.peetal}" stroke-width="4"/>
  <g>${kairiStrip(170, 600, 860, 34, "duoK")}</g>
  ${badge(600, 652, 184, "duoB")}
  <text x="600" y="918" text-anchor="middle" font-family="${DEV}" font-size="60" font-weight="700" fill="${C.haldi}">स्वाद जोड़ी</text>
  <text x="600" y="984" text-anchor="middle" font-family="${SERIF}" font-size="38" fill="${C.chandan}">Tasting Duo</text>`;
  write(
    "products/ghee-tasting-duo/bundle.svg",
    scene(
      jarGroup({ cx: 420, baseY: 840, scale: 0.72, pal: palettes.gir, name: "Gir Cow Ghee", volume: "250 ml", seed: s }) +
        jarGroup({ cx: 780, baseY: 840, scale: 0.72, pal: palettes.sahiwal, name: "Sahiwal Cow Ghee", volume: "250 ml", seed: s + 1 }) +
        carton,
      palettes.sahiwal.bg,
      s,
      { leaf: false },
    ),
  );
}
{
  const s = hash("gift");
  const box = `
  <defs>
    <pattern id="giftP" width="70" height="70" patternUnits="userSpaceOnUse">
      <rect width="70" height="70" fill="${C.maroon}"/>
      <path d="M35 8 L62 35 L35 62 L8 35 Z" fill="none" stroke="${C.peetal}" stroke-width="3"/>
      <circle cx="35" cy="35" r="7" fill="${C.haldi}"/>
      <circle cx="0" cy="0" r="5" fill="${C.kumkum}"/><circle cx="70" cy="70" r="5" fill="${C.kumkum}"/>
    </pattern>
  </defs>
  <rect x="150" y="640" width="900" height="400" rx="14" fill="url(#giftP)"/>
  <rect x="150" y="640" width="900" height="70" fill="${C.maroonDeep}"/>
  <rect x="560" y="640" width="80" height="400" fill="${C.kumkum}"/>
  <rect x="560" y="640" width="80" height="400" fill="none" stroke="${C.haldi}" stroke-width="4"/>
  ${badge(330, 740, 230, "giftB")}
  <rect x="680" y="760" width="300" height="180" rx="8" fill="${C.paper}" transform="rotate(-6 830 850)"/>
  <text x="830" y="840" text-anchor="middle" font-family="${DEV}" font-size="44" font-weight="700" fill="${C.kumkum}" transform="rotate(-6 830 850)">शुभ दीपावली</text>
  <g transform="rotate(20 300 560)"><rect x="280" y="300" width="36" height="380" rx="18" fill="#7a4a24"/><ellipse cx="298" cy="300" rx="62" ry="80" fill="#7a4a24"/></g>`;
  write(
    "products/festive-gift-box/bundle.svg",
    scene(jarGroup({ cx: 600, baseY: 740, scale: 0.82, pal: palettes.gir, name: "A2 Gir Cow Ghee", volume: "500 ml", seed: s }) + box, palettes.gir.bg, s, { leaf: false }),
  );
}

/* ---------- Hero jar (transparent, on a banana leaf) ---------- */
write(
  "hero/hero-jar.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1000" width="900" height="1000">
  ${bananaLeaf(450, 930, 860, 120)}
  ${jarGroup({ cx: 450, baseY: 930, scale: 1.3, pal: palettes.gir, name: "A2 Gir Cow Ghee", volume: "Bilona churned", seed: hash("hero") })}
  ${marigold(120, 940, 48)}${marigold(790, 925, 54)}${marigold(720, 975, 36)}
</svg>`,
);

/* ---------- Patterns ---------- */
rmSync(join(root, "pattern", "ajrakh-band.svg"), { force: true });

// Toran: mango leaves and marigold strands hanging from a sagging thread. Repeats horizontally.
{
  const leaf = (x, y) => `
    <path d="M${x} ${y} C ${x - 10} ${y + 12}, ${x - 8} ${y + 32}, ${x} ${y + 44} C ${x + 8} ${y + 32}, ${x + 10} ${y + 12}, ${x} ${y} Z" fill="${C.leaf}"/>
    <path d="M${x} ${y + 2} L${x} ${y + 40}" stroke="${C.leafLight}" stroke-width="1.4"/>`;
  const strand = (x, y) => `
    <path d="M${x} ${y} L${x} ${y + 8}" stroke="#8a5a2b" stroke-width="1.5"/>
    ${marigold(x, y + 16, 8.5)}${marigold(x, y + 33, 7.5)}`;
  const yAt = (x) => {
    const t = x / 120;
    return (1 - t) * (1 - t) * 6 + 2 * t * (1 - t) * 22 + t * t * 6;
  };
  write(
    "pattern/toran.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 58" width="120" height="58">
  <path d="M0 6 Q60 22 120 6" fill="none" stroke="#8a5a2b" stroke-width="2"/>
  ${leaf(15, yAt(15))}${strand(45, yAt(45))}${leaf(75, yAt(75))}${strand(105, yAt(105))}
</svg>`,
  );
}

// Kairi (paisley) block-print band.
write(
  "pattern/kairi-band.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 26" width="52" height="26">
  <rect width="52" height="26" fill="${C.maroon}"/>
  <path d="M0 2.5 H52 M0 23.5 H52" stroke="${C.peetal}" stroke-width="1.2"/>
  <path d="M20 22.5C15.2 22.5 12.5 19.2 13 15.6 13.5 11.8 16.8 9.6 19.3 8.3 21.8 7 23 5.3 22.6 4 25 5.7 26.7 9 26.7 12.8 26.7 18.4 23.8 22.5 20 22.5Z" fill="${C.haldi}"/>
  <path d="M20 19.8C17.6 19.8 16.2 18.1 16.5 16.2 16.8 14.2 18.6 13 20 12.3" fill="none" stroke="${C.maroon}" stroke-width="1.1"/>
  <circle cx="21.6" cy="16.4" r="1.3" fill="${C.kumkum}"/>
  <circle cx="42" cy="13" r="2.2" fill="${C.kumkum}"/>
  <circle cx="42" cy="13" r="0.9" fill="${C.chandan}"/>
  <circle cx="6" cy="13" r="1.3" fill="${C.chandan}"/>
</svg>`,
);

// Jharokha arch, used as a CSS mask. Stretched to the element, so drawn in a tall box.
write(
  "pattern/arch.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="none" width="100" height="125">
  <path d="M0 125V46C0 30 10 19 24 13 36 8 45 5 50 0 55 5 64 8 76 13 90 19 100 30 100 46V125Z" fill="#000"/>
</svg>`,
);

/* ---------- Brand: फ़ार्म dip badge and round emblem ---------- */
for (const old of ["logo.svg", "farm-deep-badge.svg", "farm-deep-emblem.svg", "farm-deep-logo.png"]) rmSync(join(root, "brand", old), { force: true });
write("brand/farm-dip-badge.svg", badgeSvg("fd"));
write("brand/farm-dip-emblem.svg", emblemSvg("fe"));

/* ---------- Blog covers ---------- */
const posts = [
  { slug: "a2-vs-a1-ghee", title: "A2 vs A1 ghee: what the difference actually is", tag: "Buying guide", hindi: "ए2 बनाम ए1" },
  { slug: "bilona-vs-cream-ghee", title: "Bilona ghee vs cream ghee", tag: "Process", hindi: "बिलोना विधि" },
  { slug: "how-to-check-ghee-purity", title: "How to check ghee purity at home", tag: "Purity", hindi: "शुद्धता की जाँच" },
  { slug: "ghee-smoke-point-cooking", title: "Ghee smoke point and cooking", tag: "Cooking", hindi: "तड़का और घी" },
  { slug: "how-to-store-ghee", title: "How to store ghee", tag: "Storage", hindi: "घी कैसे रखें" },
];

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else line += " " + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

for (const p of posts) {
  const lines = wrap(p.title, 22);
  const text = lines.map((l, i) => `<text x="90" y="${300 + i * 72}" font-family="${SERIF}" font-size="62" font-weight="700" fill="${C.chandan}">${esc(l)}</text>`).join("");
  write(
    `blog/${p.slug}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="${C.maroon}"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${C.peetal}" stroke-width="3"/>
  <rect x="34" y="34" width="1132" height="562" fill="none" stroke="${C.peetal}" stroke-width="1.2"/>
  <g opacity="0.95">${rangoli(960, 330, 230, { wash: false })}</g>
  ${badge(960, 200, 260, `cover${hash(p.slug)}`)}
  <text x="90" y="140" font-family="${SANS}" font-size="28" font-weight="600" fill="${C.haldi}">${esc(p.tag)}</text>
  <text x="90" y="215" font-family="${DEV}" font-size="54" font-weight="700" fill="${C.haldi}">${p.hindi}</text>
  ${text}
</svg>`,
  );
}

/* ---------- Story scenes: placeholder with art-direction caption ---------- */
const scenes = [
  { file: "farm/gir-cows-pasture.svg", caption: "Photo needed: Gir cows grazing at dawn, Talala", sky: "#f9d38a", land: "#7f9a52" },
  { file: "farm/bilona-churning.svg", caption: "Photo needed: hands churning curd with a wooden bilona", sky: "#f3c98a", land: "#8a5a2b" },
  { file: "farm/wood-fire-kadhai.svg", caption: "Photo needed: makkhan simmering in an iron kadhai", sky: "#f2a85a", land: "#3b2a1a" },
  { file: "farm/lab-testing.svg", caption: "Photo needed: ghee sample being tested in the lab", sky: "#f8ead0", land: "#e3c3ae" },
];
for (const s of scenes) {
  write(
    s.file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <rect width="1600" height="1000" fill="${s.sky}"/>
  <circle cx="1220" cy="300" r="120" fill="${C.genda}" opacity="0.85"/>
  <path d="M0 640 Q 400 520 800 620 T 1600 580 V1000 H0 Z" fill="${s.land}" opacity="0.75"/>
  <path d="M0 760 Q 500 660 1000 760 T 1600 720 V1000 H0 Z" fill="${s.land}"/>
  ${marigold(160, 160, 50)}${marigold(260, 120, 34)}
  <rect x="60" y="880" width="${Math.min(1480, s.caption.length * 21 + 60)}" height="70" rx="35" fill="${C.maroon}" opacity="0.9"/>
  <text x="90" y="926" font-family="${SANS}" font-size="32" fill="${C.chandan}">${esc(s.caption)}</text>
</svg>`,
  );
}

console.log("Done.");
