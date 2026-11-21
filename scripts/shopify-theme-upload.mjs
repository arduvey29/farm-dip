/*
  Uploads theme files to the store through the Admin API (themeFilesUpsert), using the same Dev Dashboard
  app credentials as shopify-setup.mjs. Handy when the Shopify CLI login has expired.
  Usage: node scripts/shopify-theme-upload.mjs <themeId> <path inside shopify/>...
         node scripts/shopify-theme-upload.mjs <themeId> --all        (every theme file)
*/
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const themeDir = join(root, "shopify");
const [themeId, ...rest] = process.argv.slice(2);
if (!themeId || !rest.length) throw new Error("usage: shopify-theme-upload.mjs <themeId> <files...|--all>");

const env = Object.fromEntries(
  readFileSync(join(root, ".env.shopify"), "utf8")
    .split(/\r?\n/)
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);
const store = env.SHOPIFY_STORE;
const tokenRes = await fetch(`https://${store}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "client_credentials", client_id: env.SHOPIFY_CLIENT_ID, client_secret: env.SHOPIFY_CLIENT_SECRET }),
});
if (!tokenRes.ok) throw new Error(`Could not get an access token (${tokenRes.status})`);
const { access_token: token } = await tokenRes.json();

const THEME_DIRS = ["assets", "config", "layout", "locales", "sections", "snippets", "templates"];
const walk = (dir) => readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
const files = rest.includes("--all") ? THEME_DIRS.flatMap((d) => walk(join(themeDir, d))) : rest.map((f) => join(themeDir, f));
const TEXT = /\.(liquid|json|css|js|svg|txt)$/i;

const gid = `gid://shopify/OnlineStoreTheme/${themeId}`;
for (let i = 0; i < files.length; i += 20) {
  const batch = files.slice(i, i + 20).map((f) => {
    const filename = relative(themeDir, f).replace(/\\/g, "/");
    const buf = readFileSync(f);
    return { filename, body: TEXT.test(f) ? { type: "TEXT", value: buf.toString("utf8") } : { type: "BASE64", value: buf.toString("base64") } };
  });
  const res = await fetch(`https://${store}/admin/api/2026-10/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({
      query: `mutation($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) { themeFilesUpsert(themeId: $themeId, files: $files) { upsertedThemeFiles { filename } userErrors { filename message } } }`,
      variables: { themeId: gid, files: batch },
    }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 400));
  const r = json.data.themeFilesUpsert;
  for (const e of r.userErrors) console.log(`error ${e.filename}: ${e.message}`);
  for (const f of r.upsertedThemeFiles) console.log(`uploaded ${f.filename}`);
}
