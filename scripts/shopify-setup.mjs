/*
  Fills a fresh Shopify store with Farm Dip's content through the Admin GraphQL API:
  the product (3 sizes, prices, MRPs, images), the six pages with their theme templates, the
  "Know your ghee" blog and its posts, the four policies, the FIRSTJAR discount and India shipping.
  Safe to re-run: anything that already exists (same handle or code) is left alone.

  Needs .env.shopify (git-ignored) with SHOPIFY_STORE, SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET from
  a Dev Dashboard app installed on the store. Never prints the secret or the token.

  Usage: node scripts/shopify-setup.mjs [--dry-run] [--only product,pages,blog,policies,discount,shipping]
*/
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const setup = join(root, "shopify/setup");
const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const only = (args[args.indexOf("--only") + 1] || "").split(",").filter((s) => args.includes("--only") && s);
const want = (step) => !only.length || only.includes(step);
const API = "2026-10";

/* ---------- Credentials ---------- */
const env = Object.fromEntries(
  readFileSync(join(root, ".env.shopify"), "utf8")
    .split(/\r?\n/)
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);
const store = env.SHOPIFY_STORE;
for (const k of ["SHOPIFY_STORE", "SHOPIFY_CLIENT_ID", "SHOPIFY_CLIENT_SECRET"]) if (!env[k]) throw new Error(`${k} is empty in .env.shopify`);

const tokenRes = await fetch(`https://${store}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "client_credentials", client_id: env.SHOPIFY_CLIENT_ID, client_secret: env.SHOPIFY_CLIENT_SECRET }),
});
if (!tokenRes.ok) throw new Error(`Could not get an access token (${tokenRes.status}): ${(await tokenRes.text()).slice(0, 300)}`);
const { access_token: token, scope } = await tokenRes.json();
console.log(`connected to ${store}; scopes: ${scope}`);

async function gql(query, variables = {}) {
  const res = await fetch(`https://${store}/admin/api/${API}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 600));
  const payload = Object.values(json.data ?? {})[0];
  const userErrors = payload?.userErrors ?? payload?.mediaUserErrors;
  if (userErrors?.length) throw new Error(JSON.stringify(userErrors).slice(0, 600));
  return json.data;
}

/* ---------- Uploads: local file -> Shopify Files, returns the file's CDN URL ---------- */
async function upload(file) {
  const filename = basename(file);
  const size = statSync(file).size;
  const { stagedUploadsCreate } = await gql(
    `mutation($input: [StagedUploadInput!]!) { stagedUploadsCreate(input: $input) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } } }`,
    { input: [{ filename, mimeType: "image/png", resource: "IMAGE", httpMethod: "POST", fileSize: String(size) }] },
  );
  const target = stagedUploadsCreate.stagedTargets[0];
  const form = new FormData();
  for (const p of target.parameters) form.append(p.name, p.value);
  form.append("file", new Blob([readFileSync(file)], { type: "image/png" }), filename);
  const up = await fetch(target.url, { method: "POST", body: form });
  if (!up.ok) throw new Error(`upload of ${filename} failed (${up.status})`);
  return target.resourceUrl;
}

async function fileUrl(resourceUrl, alt) {
  const { fileCreate } = await gql(
    `mutation($files: [FileCreateInput!]!) { fileCreate(files: $files) { files { id } userErrors { field message } } }`,
    { files: [{ originalSource: resourceUrl, contentType: "IMAGE", alt }] },
  );
  const id = fileCreate.files[0].id;
  for (let i = 0; i < 30; i++) {
    const { node } = await gql(`query($id: ID!) { node(id: $id) { ... on MediaImage { fileStatus image { url } } } }`, { id });
    if (node?.image?.url) return node.image.url;
    if (node?.fileStatus === "FAILED") throw new Error("Shopify could not process an uploaded image");
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("Timed out waiting for an uploaded image");
}

/* ---------- Product ---------- */
async function product() {
  const handle = "pure-desi-buffalo-ghee";
  const { productByHandle } = await gql(`query($h: String!) { productByHandle(handle: $h) { id } }`, { h: handle });
  if (productByHandle) return console.log("product: already there");
  if (dry) return console.log("product: would create");
  const csv = readFileSync(join(setup, "products.csv"), "utf8");
  const body = csv.match(/"(<p>[\s\S]*?<\/p>)"/)[1].replace(/""/g, '"');
  const images = [
    ["jar.png", "Jar of Farm Dip pure desi buffalo ghee with a green cloth tied over the lid"],
    ["jar-1l.png", "1 litre jar of Farm Dip buffalo ghee"],
    ["dolchi.png", "5 litre jar of Farm Dip buffalo ghee"],
    ["texture.png", "Close view of creamy white buffalo ghee on a wooden spoon"],
    ["sizes.png", "Farm Dip buffalo ghee in 500 ml, 1 L and 5 L jars"],
  ];
  const staged = {};
  for (const [name] of images) staged[name] = await upload(join(setup, "images", name));
  const sizes = [
    ["500 ml", "FD-BUF-500", 900, "1350", "1699", "jar.png"],
    ["1 L", "FD-BUF-1000", 1700, "2210", "2799", "jar-1l.png"],
    ["5 L", "FD-BUF-5000", 5600, "9900", "12499", "dolchi.png"],
  ];
  const input = {
    title: "Pure Desi Buffalo Ghee",
    handle,
    descriptionHtml: body,
    vendor: "Farm Dip",
    productType: "Ghee",
    tags: ["buffalo ghee", "desi ghee", "ghee"],
    status: "ACTIVE",
    seo: {
      title: "Pure Desi Buffalo Ghee | Rich, Creamy & 100% Natural",
      description: "Buy Farm Dip pure desi ghee made from buffalo milk | 100% natural, no preservatives or additives. 500 ml ₹1,350, 1 L ₹2,210, 5 L ₹9,900. Free cash on delivery across India.",
    },
    files: images.map(([name, alt]) => ({ originalSource: staged[name], alt, contentType: "IMAGE", filename: name })),
    productOptions: [{ name: "Size", values: sizes.map(([name]) => ({ name })) }],
    variants: sizes.map(([name, sku, grams, price, mrp, img]) => ({
      optionValues: [{ optionName: "Size", name }],
      price,
      compareAtPrice: mrp,
      taxable: true,
      inventoryPolicy: "DENY",
      inventoryItem: { sku, tracked: false, requiresShipping: true, measurement: { weight: { value: grams, unit: "GRAMS" } } },
      file: { originalSource: staged[img], alt: images.find(([n]) => n === img)[1], contentType: "IMAGE", filename: img },
    })),
  };
  const { productSet } = await gql(
    `mutation($input: ProductSetInput!) { productSet(input: $input, synchronous: true) { product { id handle } userErrors { field message } } }`,
    { input },
  );
  console.log(`product: created ${productSet.product.handle}`);
  await publish(productSet.product.id, "product");
}

async function publish(id, what) {
  try {
    const { publications } = await gql(`{ publications(first: 20) { nodes { id name } } }`);
    const online = publications.nodes.find((p) => p.name === "Online Store");
    if (!online) return console.log(`${what}: no Online Store channel found; publish it by hand`);
    await gql(`mutation($id: ID!, $input: [PublicationInput!]!) { publishablePublish(id: $id, input: $input) { userErrors { field message } } }`, {
      id,
      input: [{ publicationId: online.id }],
    });
    console.log(`${what}: published to the Online Store`);
  } catch (e) {
    console.log(`${what}: could not publish (${e.message.slice(0, 120)}). Tick "Online Store" under Publishing on its admin page.`);
  }
}

/* ---------- Pages ---------- */
async function pages() {
  const list = [
    ["Our story", "about", "about"],
    ["How it's made", "how-its-made", "how-its-made"],
    ["Lab reports", "lab-reports", "lab-reports"],
    ["Contact", "contact", "contact"],
    ["FAQ", "faq", "faq"],
    ["Track your order", "track-order", "track-order"],
  ];
  const { pages: existing } = await gql(`{ pages(first: 100) { nodes { id handle templateSuffix } } }`);
  const have = new Map(existing.nodes.map((p) => [p.handle, p]));
  for (const [title, handle, templateSuffix] of list) {
    const page = have.get(handle);
    if (page) {
      // A page Shopify made itself (like "Contact") just needs the theme's template.
      if (page.templateSuffix === templateSuffix) console.log(`page ${handle}: already there`);
      else if (dry) console.log(`page ${handle}: would switch to template page.${templateSuffix}`);
      else {
        await gql(`mutation($id: ID!, $page: PageUpdateInput!) { pageUpdate(id: $id, page: $page) { page { id } userErrors { field message } } }`, {
          id: page.id,
          page: { templateSuffix, isPublished: true },
        });
        console.log(`page ${handle}: switched to template page.${templateSuffix}`);
      }
      continue;
    }
    if (dry) {
      console.log(`page ${handle}: would create`);
      continue;
    }
    await gql(`mutation($page: PageCreateInput!) { pageCreate(page: $page) { page { id } userErrors { field message } } }`, {
      page: { title, handle, templateSuffix, isPublished: true, body: "" },
    });
    console.log(`page ${handle}: created`);
  }
}

/* ---------- Blog and posts ---------- */
async function blog() {
  const handle = "know-your-ghee";
  const { blogs } = await gql(`{ blogs(first: 50) { nodes { id handle } } }`);
  let blog = blogs.nodes.find((b) => b.handle === handle);
  if (!blog) {
    if (dry) return console.log("blog: would create with posts");
    const { blogCreate } = await gql(`mutation($blog: BlogCreateInput!) { blogCreate(blog: $blog) { blog { id handle } userErrors { field message } } }`, {
      blog: { title: "Know your ghee", handle },
    });
    blog = blogCreate.blog;
    console.log("blog: created");
  }
  const { articles } = await gql(`query($q: String!) { articles(first: 100, query: $q) { nodes { handle } } }`, { q: `blog_id:${blog.id.split("/").pop()}` });
  const have = new Set(articles.nodes.map((a) => a.handle));
  for (const file of readdirSync(join(setup, "blog")).filter((f) => f.endsWith(".html"))) {
    const html = readFileSync(join(setup, "blog", file), "utf8");
    const meta = Object.fromEntries([...html.matchAll(/^\s{2}([A-Za-z ]+): (.*)$/gm)].map((m) => [m[1].trim(), m[2].trim()]));
    const handleOf = meta["URL handle"];
    if (have.has(handleOf)) {
      console.log(`post ${handleOf}: already there`);
      continue;
    }
    if (dry) {
      console.log(`post ${handleOf}: would create`);
      continue;
    }
    const body = html.slice(html.indexOf("-->") + 3).trim();
    const cover = await fileUrl(await upload(join(setup, "blog", file.replace(".html", ".png"))), meta.Title);
    await gql(`mutation($article: ArticleCreateInput!) { articleCreate(article: $article) { article { id } userErrors { field message } } }`, {
      article: {
        blogId: blog.id,
        title: meta.Title,
        handle: handleOf,
        body,
        summary: meta.Excerpt,
        tags: [meta.Tags],
        isPublished: true,
        author: { name: "Farm Dip dairy team" },
        image: { url: cover, altText: meta.Title },
      },
    });
    console.log(`post ${handleOf}: created`);
  }
}

/* ---------- Policies ---------- */
async function policies() {
  const map = { refund: "REFUND_POLICY", privacy: "PRIVACY_POLICY", terms: "TERMS_OF_SERVICE", shipping: "SHIPPING_POLICY" };
  for (const [file, type] of Object.entries(map)) {
    const body = readFileSync(join(setup, "policies", `${file}.html`), "utf8").replace(/^<!--[\s\S]*?-->\s*/, "");
    if (dry) {
      console.log(`policy ${file}: would set`);
      continue;
    }
    try {
      await gql(`mutation($p: ShopPolicyInput!) { shopPolicyUpdate(shopPolicy: $p) { shopPolicy { id } userErrors { field message } } }`, { p: { type, body } });
      console.log(`policy ${file}: set`);
    } catch (e) {
      // Shopify can manage the privacy policy itself; leave it that way rather than overwrite it.
      if (e.message.includes("Automatic management")) console.log(`policy ${file}: kept Shopify's automatically managed version`);
      else throw e;
    }
  }
}

/* ---------- Discount ---------- */
async function discount() {
  const { codeDiscountNodeByCode } = await gql(`{ codeDiscountNodeByCode(code: "FIRSTJAR") { id } }`);
  if (codeDiscountNodeByCode) return console.log("discount FIRSTJAR: already there");
  if (dry) return console.log("discount FIRSTJAR: would create");
  await gql(
    `mutation($d: DiscountCodeBasicInput!) { discountCodeBasicCreate(basicCodeDiscount: $d) { codeDiscountNode { id } userErrors { field message } } }`,
    {
      d: {
        title: "FIRSTJAR: 10% off your first order",
        code: "FIRSTJAR",
        startsAt: new Date().toISOString(),
        customerSelection: { all: true },
        customerGets: { value: { percentage: 0.1 }, items: { all: true } },
        appliesOncePerCustomer: true,
      },
    },
  );
  console.log("discount FIRSTJAR: created");
}

/* ---------- Shipping: India, ₹79 below ₹999, free from ₹999 ---------- */
async function shipping() {
  const { deliveryProfiles } = await gql(`{
    deliveryProfiles(first: 5) { nodes { id default profileLocationGroups { locationGroup { id }
      locationGroupZones(first: 20) { nodes { zone { id name countries { code { countryCode } } }
        methodDefinitions(first: 20) { nodes { id name } } } } } } }
  }`);
  const profile = deliveryProfiles.nodes.find((p) => p.default);
  const group = profile.profileLocationGroups[0];
  const zones = group.locationGroupZones.nodes;
  const india = zones.find((z) => z.zone.countries.some((c) => c.code.countryCode === "IN"));
  const methods = [
    { name: "Standard delivery", rateDefinition: { price: { amount: 79, currencyCode: "INR" } }, priceConditionsToCreate: [{ operator: "LESS_THAN_OR_EQUAL_TO", criteria: { amount: 998.99, currencyCode: "INR" } }] },
    { name: "Free delivery", rateDefinition: { price: { amount: 0, currencyCode: "INR" } }, priceConditionsToCreate: [{ operator: "GREATER_THAN_OR_EQUAL_TO", criteria: { amount: 999, currencyCode: "INR" } }] },
  ];
  if (india && india.methodDefinitions.nodes.some((m) => m.name === "Free delivery")) return console.log("shipping: already set");
  if (dry) return console.log(`shipping: would ${india ? `replace the rates in zone "${india.zone.name}"` : "create an India zone"}`);
  const zoneChange = india
    ? { zonesToUpdate: [{ id: india.zone.id, methodDefinitionsToCreate: methods }] }
    : { zonesToCreate: [{ name: "India", countries: [{ code: "IN", includeAllProvinces: true }], methodDefinitionsToCreate: methods }] };
  await gql(`mutation($id: ID!, $profile: DeliveryProfileInput!) { deliveryProfileUpdate(id: $id, profile: $profile) { profile { id } userErrors { field message } } }`, {
    id: profile.id,
    profile: {
      locationGroupsToUpdate: [{ id: group.locationGroup.id, ...zoneChange }],
      ...(india?.methodDefinitions.nodes.length ? { methodDefinitionsToDelete: india.methodDefinitions.nodes.map((m) => m.id) } : {}),
    },
  });
  console.log("shipping: India set to ₹79 below ₹999, free from ₹999");
}

const steps = { product, pages, blog, policies, discount, shipping };
for (const [name, run] of Object.entries(steps)) {
  if (!want(name)) continue;
  try {
    await run();
  } catch (e) {
    console.log(`${name}: FAILED: ${e.message}`);
    process.exitCode = 1;
  }
}
