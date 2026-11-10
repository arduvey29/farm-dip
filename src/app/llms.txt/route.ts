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
- One product: pure desi ghee made from 100% natural buffalo milk, in ${products[0].variants.map((v) => v.label).join(", ")} jars.
- 100% natural. No preservatives, no additives, no artificial colours.
- Made the traditional bilona way in eight steps: full-fat buffalo milk is heated slowly, set into dahi for 8 to 12 hours, churned until makkhan separates, washed in cold water, clarified into golden ghee, cooled and strained through muslin.
- Our aim: ${site.aim}
- Farm & Production based in ${address.locality}, ${address.region}, India. Ships across India.
- Free cash on delivery nationwide. Free shipping above ₹${commerce.freeShippingThreshold}, otherwise flat ₹${commerce.shippingFee}. Dispatch within ${commerce.dispatchHours} hours.
- 7-day purity guarantee: full refund upon verified independent accredited laboratory test report.
- FSSAI licence number: ${site.legal.fssai}.
- Contact: Phone/WhatsApp ${site.contact.phone}, Email ${site.contact.email}.

## Products & Pack Sizes
${products.map((p) => `- [${p.name}](${absoluteUrl(`/products/${p.slug}`)}): ${p.summary} From ${formatPrice(lowestPrice(p))}. Packs: ${p.variants.map((v) => `${v.label} ${formatPrice(v.price)}`).join(", ")}.`).join("\n")}

## Direct Pages & Sections
- [Buy Buffalo Ghee (Shop)](${absoluteUrl("/shop")}): Compare 500 ml, 1 L and 5 L jars with prices and kitchen guidance.
- [Independent Lab Reports](${absoluteUrl("/lab-reports")}): Official purity test certificates, RM value (32.4), and on-pack QR verification.
- [How It's Made](${absoluteUrl("/how-its-made")}): The 8 traditional bilona steps from fresh buffalo milk to strained jar.
- [Our Story](${absoluteUrl("/about")}): Who we are, our farm in Rohtak, and why we make ghee the way we ate it as children.
- [Frequently Asked Questions](${absoluteUrl("/faq")}): Searchable database covering buffalo vs cow ghee, lactose, smoke point, delivery, and storage.
- [Contact Support](${absoluteUrl("/contact")}): Direct WhatsApp, phone, email, and farm location map.
- [Track Your Order](${absoluteUrl("/track-order")}): Live tracking for shipped parcels across India.

## Informational Guides
${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.quickAnswer}`).join("\n")}

## Official Policies
${policies.map((p) => `- [${p.title}](${absoluteUrl(`/policies/${p.slug}`)}): ${p.description}`).join("\n")}

## Full Documentation for AI
- [Complete content for AI assistants](${absoluteUrl("/llms-full.txt")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
