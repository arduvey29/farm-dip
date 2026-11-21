/*
  Writes the Shopify theme's JSON templates (shopify/templates/*.json) with the site's own content:
  the eight steps, product facts, FAQs and sample reviews come from src/data, so the store starts
  with the same words as the Next site. After launch the client edits them in the theme editor,
  so only re-run this on purpose: `npm run theme:templates` overwrites those edits in the repo copy.
*/
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "shopify/templates");
mkdirSync(out, { recursive: true });

// A tiny loader for the TypeScript data files and the two lib files they import.
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  const req = (spec) => {
    if (spec.startsWith("@/")) return load(join(root, "src", spec.slice(2) + ".ts"));
    if (spec.startsWith("./")) return load(join(dirname(file), spec.slice(2) + ".ts"));
    throw new Error(`unexpected import ${spec}`);
  };
  new Function("require", "module", "exports", "process", code)(req, mod, mod.exports, { env: {} });
  cache.set(file, mod.exports);
  return mod.exports;
}
const data = (name) => load(join(root, "src/data", `${name}.ts`));
const { processSteps } = data("process");
const { faqGroups } = data("faqs");
const { reviews } = data("reviews");
const { mainProduct: product, gheeNutrition } = data("products");

const p = (text) => `<p>${text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`;
const blocks = (list, type, settings) => {
  const b = {};
  list.forEach((item, i) => (b[`${type}-${i + 1}`] = { type, settings: settings(item) }));
  return { blocks: b, block_order: Object.keys(b) };
};
const write = (name, json) => writeFileSync(join(out, `${name}.json`), JSON.stringify(json, null, 2) + "\n");
const single = (type, extra = {}) => ({ sections: { main: { type, settings: {}, ...extra } }, order: ["main"] });

/* ---------- Home ---------- */
write("index", {
  sections: {
    sizes: { type: "size-grid", settings: {} },
    numbers: {
      type: "numbers-band",
      settings: {},
      ...blocks(
        [
          ["12–14 L", "of buffalo milk go into every litre of ghee"],
          ["8–12 hrs", "for the milk to set into dahi before churning"],
          ["0", "preservatives, additives or colours"],
          ["12 months", "shelf life from the day it is packed"],
        ],
        "stat",
        ([value, label]) => ({ value, label }),
      ),
    },
    journey: { type: "ghee-journey", settings: {}, ...blocks(processSteps, "step", (s) => ({ name: s.name, text: s.text, fact: s.fact })) },
    reviews: {
      type: "home-reviews",
      settings: {},
      ...blocks(reviews.filter((r) => r.rating === 5).slice(0, 3), "review", (r) => ({ rating: r.rating, body: r.body, author: r.author, city: r.city })),
    },
    cta: { type: "cta-band", settings: {} },
  },
  order: ["sizes", "numbers", "journey", "reviews", "cta"],
});

/* ---------- Product ---------- */
const pdp = {
  ...blocks(product.facts, "fact", (f) => ({ label: f.label, value: f.value })),
};
const add = (more) => {
  Object.assign(pdp.blocks, more.blocks);
  pdp.block_order.push(...more.block_order);
};
add(blocks(product.highlights, "highlight", (text) => ({ text })));
add(blocks(product.uses, "use", (text) => ({ text })));
add(blocks(gheeNutrition, "nutrition", (n) => ({ label: n.label, value: n.value })));
add(blocks(product.faqs, "faq", (f) => ({ question: f.q, answer: p(f.a) })));
write("product", { sections: { main: { type: "main-product", settings: {}, ...pdp } }, order: ["main"] });

/* ---------- Shop, cart, pages ---------- */
write("collection", { sections: { main: { type: "main-collection", settings: {} }, guide: { type: "page-shop-guide", settings: {} } }, order: ["main", "guide"] });
write("list-collections", { sections: { main: { type: "main-collection", settings: {} } }, order: ["main"] });
write("cart", single("main-cart"));
write("page", single("main-page"));
write("page.about", single("page-about"));
write("page.how-its-made", single("page-how-its-made"));
write("page.lab-reports", single("page-lab-reports"));
write("page.contact", single("page-contact"));
write("page.track-order", single("page-track-order"));
write("page.faq", {
  sections: {
    main: {
      type: "faq-page",
      settings: {},
      ...blocks(
        faqGroups.flatMap((g) => g.items.map((item) => ({ ...item, topic: g.title }))),
        "question",
        (q) => ({ topic: q.topic, question: q.q, answer: p(q.a) }),
      ),
    },
  },
  order: ["main"],
});
write("blog", single("main-blog"));
write("article", single("main-article"));
write("search", single("main-search"));
write("404", single("main-404"));
write("password", { layout: "password", ...single("main-password") });

/* ---------- Blog posts, as HTML to paste into Online Store > Blog posts (Shopify has no blog import) ---------- */
const { posts } = data("posts");
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const blogDir = join(root, "shopify/setup/blog");
mkdirSync(blogDir, { recursive: true });
for (const post of posts) {
  const html = [
    `<p><strong>${esc(post.quickAnswer)}</strong></p>`,
    `<h2>Key takeaways</h2><ul>${post.keyTakeaways.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`,
    ...post.sections.map((s) =>
      [
        `<h2>${esc(s.heading)}</h2>`,
        ...(s.paragraphs ?? []).map((t) => `<p>${esc(t)}</p>`),
        s.list ? `<${s.list.ordered ? "ol" : "ul"}>${s.list.items.map((t) => `<li>${esc(t)}</li>`).join("")}</${s.list.ordered ? "ol" : "ul"}>` : "",
        s.table
          ? `<table><thead><tr>${s.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${s.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
          : "",
        ...(s.after ?? []).map((t) => `<p>${esc(t)}</p>`),
      ].join(""),
    ),
    post.faqs.length ? `<h2>Questions</h2>${post.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : "",
    post.sources.length ? `<h2>Sources</h2><ul>${post.sources.map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`).join("")}</ul>` : "",
  ].join("\n");
  const head = `<!--\n  Title: ${post.title}\n  URL handle: ${post.slug}\n  Tags: ${post.category}\n  Excerpt: ${post.description}\n  SEO title: ${post.title}\n  SEO description: ${post.description}\n  Paste everything below this comment into the post's content with the editor's "Show HTML" (<>) button.\n-->\n`;
  writeFileSync(join(blogDir, `${post.slug}.html`), head + html + "\n");
}

/* ---------- Policies, as HTML to paste into Settings > Policies ---------- */
const { policies } = data("policies");
const policyDir = join(root, "shopify/setup/policies");
mkdirSync(policyDir, { recursive: true });
for (const policy of policies) {
  const html = policy.sections.map((s) => `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}`).join("\n");
  writeFileSync(join(policyDir, `${policy.slug}.html`), `<!-- ${policy.title}: paste below this line into Settings > Policies with the editor's "Show HTML" (<>) button. -->\n${html}\n`);
}

console.log(`templates written, ${posts.length} blog posts and ${policies.length} policies exported`);
