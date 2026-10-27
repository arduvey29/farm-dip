import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { faqGroups } from "@/data/faqs";
import { bilonaSteps } from "@/data/process";
import { labParameters } from "@/data/lab";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { formatPrice, pricePerLitre } from "@/lib/format";

/** Complete text of the catalogue, process, lab standards, FAQs and guides as Markdown for AI assistants. */
export function GET() {
  const productText = products
    .map(
      (p) => `### ${p.name}
URL: ${absoluteUrl(`/products/${p.slug}`)}

${p.description.join("\n\n")}

${p.facts.map((f) => `- ${f.label}: ${f.value}`).join("\n")}

| Pack | Packaging | Price | MRP | Per litre |
| --- | --- | --- | --- | --- |
${p.variants.map((v) => `| ${v.label} | ${v.packaging} | ${formatPrice(v.price)} | ${formatPrice(v.mrp)} | ${formatPrice(pricePerLitre(v.price, v.volumeMl))} |`).join("\n")}

Ingredients: ${p.ingredients}
Shelf life: ${p.shelfLife}. ${p.storage}

${p.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`,
    )
    .join("\n\n");

  const postText = posts
    .map(
      (p) => `### ${p.title}
URL: ${absoluteUrl(`/blog/${p.slug}`)}
Updated: ${p.dateModified}

${p.quickAnswer}

${p.sections
  .map(
    (s) =>
      `#### ${s.heading}\n${[...(s.paragraphs ?? []), ...(s.list?.items.map((i) => `- ${i}`) ?? []), ...(s.table ? [`| ${s.table.head.join(" | ")} |`, `| ${s.table.head.map(() => "---").join(" | ")} |`, ...s.table.rows.map((r) => `| ${r.join(" | ")} |`)] : []), ...(s.after ?? [])].join("\n")}`,
  )
  .join("\n\n")}

Sources: ${p.sources.map((s) => `${s.label} (${s.href})`).join("; ")}`,
    )
    .join("\n\n");

  const body = `# ${site.name}: full content

> ${site.description}

## Products
${productText}

## How bilona ghee is made
${bilonaSteps.map((s, i) => `${i + 1}. ${s.name} (${s.duration}). ${s.text}`).join("\n")}

## Lab tests on every batch
| Test | What it checks | FSSAI limit |
| --- | --- | --- |
${labParameters.map((l) => `| ${l.name} | ${l.what} | ${l.limit} |`).join("\n")}

## Questions and answers
${faqGroups.map((g) => `### ${g.title}\n${g.items.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`).join("\n\n")}

## Guides
${postText}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
