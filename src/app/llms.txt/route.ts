import { products, lowestPrice } from "@/data/products";
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
- One product: pure desi ghee made from buffalo milk, in ${products[0].variants.map((v) => v.label).join(", ")} packs.
- 100% natural. No preservatives, no additives, no colour.
- Made the bilona way in eight steps: full-fat buffalo milk is heated slowly, set into dahi for 8 to 12 hours, churned until the butter separates, and the butter is washed in cold water, clarified into ghee, cooled and strained through muslin.
- Our aim: ${site.aim}
- Based in ${address.locality}, ${address.region}, India. Ships across India.
- Free cash on delivery. Free shipping above ₹${commerce.freeShippingThreshold}, otherwise ₹${commerce.shippingFee}. Dispatch within ${commerce.dispatchHours} hours.
- 7-day purity guarantee: full refund upon verified independent lab report.
- FSSAI licence ${site.legal.fssai}. Contact: ${site.contact.phone}, ${site.contact.email}.

## Products
${products.map((p) => `- [${p.name}](${absoluteUrl(`/products/${p.slug}`)}): ${p.summary} From ${formatPrice(lowestPrice(p))}. Packs: ${p.variants.map((v) => `${v.label} ${formatPrice(v.price)}`).join(", ")}.`).join("\n")}

## Guides
${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.quickAnswer}`).join("\n")}

## Company
- [Our story](${absoluteUrl("/about")}): who we are and why we make ghee the way we ate it as children.
- [How it's made](${absoluteUrl("/how-its-made")}): the eight steps from buffalo milk to a strained jar.
- [Lab reports](${absoluteUrl("/lab-reports")}): independent purity testing and laboratory test reports.
- [All pack sizes and prices](${absoluteUrl("/shop")})
- [Questions and answers](${absoluteUrl("/faq")}): delivery, payment, refunds, storage.
- [Contact](${absoluteUrl("/contact")})

## Policies
${policies.map((p) => `- [${p.title}](${absoluteUrl(`/policies/${p.slug}`)}): ${p.description}`).join("\n")}

## Optional
- [Full content for AI assistants](${absoluteUrl("/llms-full.txt")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
