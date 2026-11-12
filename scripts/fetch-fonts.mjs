/*
  Downloads the two brand typefaces from Fontshare (Indian Type Foundry):
    Author        headings
    General Sans  reading text and interface

  Both are under the ITF Free Font License. It lets us self-host the fonts on our own website,
  but not redistribute the font files (that includes committing them to a public repository).
  So the files are fetched here, at install and build time, into src/assets/fonts/fontshare/,
  which is git-ignored. The Shopify theme should do the same: download from fontshare.com and
  upload to the theme's assets, or use the Fontshare CSS API.

  Usage: node scripts/fetch-fonts.mjs [--force]
*/
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "src/assets/fonts/fontshare");
const API = "https://api.fontshare.com/v2/css";

// "@1" is the upright variable font, "@2" the italic variable font. The static TTFs are for the
// Open Graph image renderer, which cannot read WOFF2.
const files = [
  { file: "Author-Variable.woff2", query: "author@1", format: "woff2" },
  { file: "Author-VariableItalic.woff2", query: "author@2", format: "woff2" },
  { file: "GeneralSans-Variable.woff2", query: "general-sans@1", format: "woff2" },
  { file: "Author-Semibold.ttf", query: "author@600", format: "truetype" },
  { file: "GeneralSans-Medium.ttf", query: "general-sans@500", format: "truetype" },
];

const force = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });

async function get(url, as) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return as === "text" ? res.text() : Buffer.from(await res.arrayBuffer());
}

let fetched = 0;
for (const { file, query, format } of files) {
  const target = join(OUT, file);
  if (existsSync(target) && !force) continue;
  const css = await get(`${API}?f[]=${query}&display=swap`, "text");
  const match = css.match(new RegExp(`url\\('(//cdn\\.fontshare\\.com/[^']+)'\\) format\\('${format}'\\)`));
  if (!match) throw new Error(`No ${format} file for ${query} in the Fontshare response`);
  writeFileSync(target, await get(`https:${match[1]}`));
  fetched++;
}

// Adobe Caslon Pro font files for brand wordmark
const CASLON_OUT = join(process.cwd(), "src/assets/fonts/adobe-caslon");
mkdirSync(CASLON_OUT, { recursive: true });
const caslonFiles = ["ACaslonPro-Bold.otf", "ACaslonPro-Semibold.otf", "ACaslonPro-Regular.otf"];
const caslonBase = "https://raw.githubusercontent.com/bstaats/livestaats/master/design/Adobe%20Caslon%20Pro/Adobe%20Caslon%20Pro%20Font%20Files/";
for (const f of caslonFiles) {
  const target = join(CASLON_OUT, f);
  if (existsSync(target) && !force) continue;
  writeFileSync(target, await get(caslonBase + encodeURIComponent(f)));
  fetched++;
}

console.log(fetched ? `Fetched ${fetched} font file(s)` : "Fonts already present");
