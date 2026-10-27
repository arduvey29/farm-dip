import { products, lowestPrice } from "@/data/products";
import { collections } from "@/data/collections";
import { posts } from "@/data/posts";
import { policies } from "@/data/policies";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { formatPrice } from "@/lib/format";

/**
 * llms.txt (https://llmstxt.org): a plain Markdown map of the site for AI assistants.
 * Generated from the same data as the pages, so it never drifts.
 */
export function GET() {
  const { commerce, address } = site;
  const body = `# ${site.name}

> ${site.description}

Key facts:
- Based in ${address.locality}, ${address.region}, India. Ships across India.
- Ghee is made by the bilona method: milk set into curd, churned with a wooden bilona into makkhan, slow-cooked on a wood fire.
- A2 ghee comes only from purebred Gir and Sahiwal cows. About ${site.stats.milkPerLitre} of milk go into one litre of ghee.
- Every batch is tested at an independent NABL-accredited lab for ${site.stats.labParameters} parameters against FSSAI limits. Reports: ${absoluteUrl("/lab-reports")}
- Free cash on delivery. Free shipping above ₹${commerce.freeShippingThreshold}, otherwise ₹${commerce.shippingFee}. Dispatch within ${commerce.dispatchHours} hours.
- ${commerce.returnWindowDays}-day quality promise. Free replacement for jars that arrive broken.
- FSSAI licence ${site.legal.fssai}. Contact: ${site.contact.phone}, ${site.contact.email}.

## Products
${products.map((p) => `- [${p.name}](${absoluteUrl(`/products/${p.slug}`)}): ${p.summary} From ${formatPrice(lowestPrice(p))}. Packs: ${p.variants.map((v) => `${v.label} ${formatPrice(v.price)}`).join(", ")}.`).join("\n")}

## Collections
${collections.map((c) => `- [${c.name}](${absoluteUrl(`/collections/${c.slug}`)}): ${c.intro}`).join("\n")}

## Guides
${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.quickAnswer}`).join("\n")}

## Company
- [Our farms](${absoluteUrl("/about")}): who we are and how we work with Gir cow farmers.
- [Bilona process](${absoluteUrl("/bilona-process")}): the eight steps from pasture to jar.
- [Questions and answers](${absoluteUrl("/faq")}): delivery, payment, returns, storage.
- [Contact](${absoluteUrl("/contact")})

## Policies
${policies.map((p) => `- [${p.title}](${absoluteUrl(`/policies/${p.slug}`)}): ${p.description}`).join("\n")}

## Optional
- [Full content for AI assistants](${absoluteUrl("/llms-full.txt")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
