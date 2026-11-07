import { products } from "@/data/products";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Google Merchant Center product feed (RSS 2.0). Submit this URL in Merchant Center
 * for free listings in Google Shopping. One item per pack size, grouped by product.
 * NOTE: Merchant Center needs JPG/PNG/WebP photos without text overlays. The OG image
 * is used until real product photography replaces the SVG placeholders.
 */
export function GET() {
  const items = products
    .flatMap((p) =>
      p.variants.map((v) => {
        const freeShip = v.price >= site.commerce.freeShippingThreshold;
        return `    <item>
      <g:id>${v.sku}</g:id>
      <g:item_group_id>${p.slug}</g:item_group_id>
      <title>${esc(`${site.name} ${p.name}, ${v.label}`)}</title>
      <description>${esc(`${p.summary} ${p.highlights.join(". ")}.`)}</description>
      <link>${absoluteUrl(`/products/${p.slug}?pack=${v.id}`)}</link>
      <g:image_link>${absoluteUrl(`/products/${p.slug}/opengraph-image`)}</g:image_link>
      <g:availability>${v.inStock ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${v.mrp.toFixed(2)} INR</g:price>
      <g:sale_price>${v.price.toFixed(2)} INR</g:sale_price>
      <g:condition>new</g:condition>
      <g:brand>${esc(site.name)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:mpn>${v.sku}</g:mpn>
      <g:size>${esc(v.label)}</g:size>
      <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items &gt; Dairy Products &gt; Butter &amp; Margarine</g:google_product_category>
      <g:product_type>Ghee &gt; Buffalo ghee</g:product_type>
      <g:shipping>
        <g:country>IN</g:country>
        <g:price>${freeShip ? 0 : site.commerce.shippingFee}.00 INR</g:price>
      </g:shipping>
    </item>`;
      }),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${esc(site.description)}</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
