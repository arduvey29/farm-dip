/**
 * Generates TEMPORARY placeholder artwork into /public/images.
 * Run: npm run placeholders
 *
 * Replace each file with real photography using the same path (or update the
 * paths in src/data/*.ts), then bump ASSET_VERSION in src/lib/assets.ts.
 * Suggested art direction: jars of creamy white buffalo ghee with a green cloth tied
 * over the lid, shot simply on a warm cream or oat background in soft daylight,
 * with a brass spoon or a bowl of molten ghee nearby.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { badgeMarkup, badgeSvg, emblemSvg } from "../src/components/brand/badge.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

// The site palette (see src/app/globals.css). Keys kept from the first theme so the drawings below read the same.
const C = {
  lal: "#133020", // pasture-900: dark grounds
  lalMid: "#245437", // pasture-700
  lalDeep: "#0d2216", // pasture-950
  cloth: "#245437", // the green cloth tied over each jar
  clothDark: "#1b402a",
  ink: "#231b1e",
  haldi: "#f5bf47", // ghee-400
  haldiLight: "#fad57f",
  genda: "#ef7e14",
  rani: "#c43a1c", // spice
  hara: "#2f6a45",
  neel: "#245437",
  peetal: "#b88a2e", // brass
  chandan: "#f7ecd3", // oat
  malai: "#fff8e8", // cream
  leaf: "#3f6b1f",
  leafLight: "#6c9a35",
};

// Buffalo ghee is creamy white: it carries almost no beta-carotene.
const palettes = {
  buffalo: { light: "#fffaf0", mid: "#f3e6c4", dark: "#d9c18a", bg: "#f7ecd3" },
};

/** The Farm Dip badge as a label, `height` tall, centred on cx. */
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
    return `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="5" fill="${C.cloth}" opacity="0.35"/>`;
  }).join("");
  return `
  ${wash ? `<circle cx="${cx}" cy="${cy}" r="${r * 0.92}" fill="#ffffff" opacity="0.45"/>` : ""}
  ${ring(24, r * 0.62, r * 0.26, r * 0.07, C.genda, 0.28)}
  ${ring(12, r * 0.34, r * 0.28, r * 0.12, C.cloth, 0.18)}
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
      <stop offset="0" stop-color="${C.cloth}"/>
      <stop offset="1" stop-color="${C.clothDark}"/>
    </linearGradient>
    <clipPath id="${id}k"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${60 * scale}"/></clipPath>
  </defs>
  <g clip-path="url(#${id}k)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" opacity="0.55"/>
    <rect x="${x}" y="${fillTop}" width="${w}" height="${h}" fill="url(#${id}g)"/>
    ${granules(seed, { x, y: fillTop, w, h: h - 70 * scale, count: Math.round(240 * scale), colors: [pal.light, pal.dark, "#ffffff"], rMin: 2 * scale, rMax: 6 * scale })}
    <rect x="${x + w * 0.1}" y="${y + 20 * scale}" width="${w * 0.07}" height="${h * 0.8}" rx="${12 * scale}" fill="#ffffff" opacity="0.35"/>
  </g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${60 * scale}" fill="none" stroke="${C.lal}" stroke-opacity="0.25" stroke-width="${4 * scale}"/>

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
  <rect x="${x - 2}" y="${labelY}" width="${w + 4}" height="${labelH}" fill="${C.lal}"/>
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
  <path d="M${cx + topW / 2 - 30 * scale} ${y - 10 * scale} l ${30 * scale} ${50 * scale} l ${-24 * scale} ${10 * scale} z" fill="${C.cloth}"/>
  ${badge(cx, y + 90 * scale, 260 * scale, `${id}b`)}
  <rect x="${cx - 150 * scale}" y="${y + 368 * scale}" width="${300 * scale}" height="${76 * scale}" rx="${8 * scale}" fill="${C.lal}"/>
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

/* ---------- The product: pure desi buffalo ghee in 500 ml, 1 L and 5 L ---------- */
// Earlier catalogue folders and art that no longer exist on the site.
for (const old of [
  "products/a2-gir-cow-bilona-ghee",
  "products/a2-sahiwal-cow-bilona-ghee",
  "products/desi-buffalo-bilona-ghee",
  "products/haldi-infused-cow-ghee",
  "products/family-saver-2x1l",
  "products/ghee-tasting-duo",
  "products/festive-gift-box",
  "hero",
  "farm",
  "blog",
])
  rmSync(join(root, old), { recursive: true, force: true });

{
  const slug = "pure-desi-buffalo-ghee";
  const name = "Pure Desi Buffalo Ghee";
  const pal = palettes.buffalo;
  const seed = hash(slug);
  write(`products/${slug}/jar.svg`, scene(jarGroup({ cx: 600, baseY: 1000, scale: 1.18, pal, name, volume: "500 ml", seed }), pal.bg, seed));
  write(`products/${slug}/jar-1l.svg`, scene(jarGroup({ cx: 600, baseY: 1000, scale: 1.3, pal, name, volume: "1 litre", seed: seed + 4 }), pal.bg, seed + 4));
  write(`products/${slug}/dolchi.svg`, scene(dolchiGroup({ cx: 600, baseY: 1000, scale: 1.2, name, volume: "5 litres", seed: seed + 2 }), pal.bg, seed + 2));
  write(`products/${slug}/texture.svg`, textureArt(pal, seed + 1));
  const lineup = [
    ["500 ml", 280, 0.62, false],
    ["1 L", 600, 0.76, false],
    ["5 L", 940, 0.8, true],
  ]
    .map(
      ([size, cx, s, isDolchi], i) =>
        (isDolchi
          ? dolchiGroup({ cx, baseY: 930, scale: s, name, volume: size, seed: seed + 10 + i })
          : jarGroup({ cx, baseY: 930, scale: s, pal, name, volume: size, seed: seed + 10 + i })) +
        `<text x="${cx}" y="1010" text-anchor="middle" font-family="${SANS}" font-size="38" font-weight="700" fill="${C.ink}">${size}</text>`,
    )
    .join("");
  write(`products/${slug}/sizes.svg`, scene(lineup, pal.bg, seed + 3, { leaf: false }));
}

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

// Phulkari band: a bagh diamond in haldi and rani on red, with green diamonds between. Repeats horizontally.
rmSync(join(root, "pattern", "kairi-band.svg"), { force: true });
write(
  "pattern/phulkari-band.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 28" width="56" height="28">
  <rect width="56" height="28" fill="${C.lal}"/>
  <path d="M0 2.5H56M0 25.5H56" stroke="${C.peetal}" stroke-width="1.2"/>
  <path d="M28 5 37 14 28 23 19 14Z" fill="${C.haldi}"/>
  <path d="M28 9 33 14 28 19 23 14Z" fill="${C.rani}"/>
  <circle cx="28" cy="14" r="1.6" fill="${C.haldiLight}"/>
  <path d="M0 9 5 14 0 19ZM56 9 51 14 56 19Z" fill="${C.hara}"/>
  <path d="M8 14h6M42 14h6" stroke="${C.genda}" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1.6 2.4"/>
  <g fill="${C.chandan}"><circle cx="11" cy="7" r="1"/><circle cx="11" cy="21" r="1"/><circle cx="45" cy="7" r="1"/><circle cx="45" cy="21" r="1"/></g>
</svg>`,
);

// Jharokha arch, used as a CSS mask. Stretched to the element, so drawn in a tall box.
write(
  "pattern/arch.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="none" width="100" height="125">
  <path d="M0 125V46C0 30 10 19 24 13 36 8 45 5 50 0 55 5 64 8 76 13 90 19 100 30 100 46V125Z" fill="#000"/>
</svg>`,
);

/* ---------- Brand: Farm Dip badge and round emblem ---------- */
for (const old of ["logo.svg", "farm-deep-badge.svg", "farm-deep-emblem.svg", "farm-deep-logo.png"]) rmSync(join(root, "brand", old), { force: true });
write("brand/farm-dip-badge.svg", badgeSvg("fd"));
write("brand/farm-dip-emblem.svg", emblemSvg("fe"));

/* ---------- Blog covers ---------- */
const posts = [
  { slug: "buffalo-ghee-vs-cow-ghee", title: "Buffalo ghee vs cow ghee", tag: "Buying guide" },
  { slug: "benefits-of-pure-buffalo-ghee", title: "Pure buffalo ghee: taste, texture, nutrition", tag: "Buying guide" },
  { slug: "how-to-check-ghee-purity", title: "How to check ghee purity at home", tag: "Purity" },
  { slug: "ghee-smoke-point-cooking", title: "Ghee smoke point and cooking", tag: "Cooking" },
  { slug: "how-to-store-ghee", title: "How to store ghee", tag: "Storage" },
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
  const text = lines.map((l, i) => `<text x="90" y="${232 + i * 72}" font-family="${SERIF}" font-size="62" font-weight="700" fill="${C.chandan}">${esc(l)}</text>`).join("");
  write(
    `blog/${p.slug}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="${C.lal}"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${C.peetal}" stroke-width="3"/>
  <rect x="34" y="34" width="1132" height="562" fill="none" stroke="${C.peetal}" stroke-width="1.2"/>
  <g opacity="0.95">${rangoli(960, 330, 230, { wash: false })}</g>
  ${badge(960, 200, 260, `cover${hash(p.slug)}`)}
  <text x="90" y="140" font-family="${SANS}" font-size="28" font-weight="600" fill="${C.haldi}">${esc(p.tag)}</text>
  ${text}
</svg>`,
  );
}

/* ---------- Story scenes: placeholder with art-direction caption ---------- */
const scenes = [
  { file: "farm/buffaloes-at-the-farm.svg", caption: "Photo needed: our buffaloes at the farm", sky: "#f9d38a", land: "#7f9a52" },
  { file: "farm/makkhan-churning.svg", caption: "Photo needed: makkhan churned with a wooden madhani", sky: "#f3c98a", land: "#8a5a2b" },
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
  <rect x="60" y="880" width="${Math.min(1480, s.caption.length * 21 + 60)}" height="70" rx="35" fill="${C.lal}" opacity="0.9"/>
  <text x="90" y="926" font-family="${SANS}" font-size="32" fill="${C.chandan}">${esc(s.caption)}</text>
</svg>`,
  );
}

console.log("Done.");
