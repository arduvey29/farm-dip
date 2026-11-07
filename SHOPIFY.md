# Porting Farm Dip to a Shopify (Liquid) theme

This Next.js site is the design and content prototype. The plan is to rebuild it as a Shopify Online Store 2.0 theme. This file maps each part of the prototype to its Shopify counterpart, so the port can be done section by section.

The prototype was built with the port in mind:
- All visual tokens are plain CSS custom properties.
- All art is plain SVG.
- All motion is CSS plus one framework-free JavaScript file.
- All content lives in data files that map onto Shopify objects and metafields.

## What Shopify gives you for free

You can drop these prototype parts. Shopify does them natively.

| Prototype | Shopify |
| --- | --- |
| `src/lib/cart.ts`, cart page and drawer state | Cart object and the AJAX Cart API (`/cart/add.js`, `/cart.js`) |
| `/checkout`, payments, COD | Shopify Checkout. Turn on cash on delivery in Settings > Payments. |
| Coupons (`site.commerce.coupons`) | Discounts |
| `/track-order` | Customer accounts and order status page |
| `/policies/*` | Settings > Policies (`shop.policies` in Liquid) |
| `sitemap.xml`, canonical tags | Generated automatically |
| Google Merchant feed | Google & YouTube app |
| Pincode delivery check | Use a delivery-date or courier app (for example Shiprocket) |

## Theme files to create

| Prototype file | Shopify theme file | Notes |
| --- | --- | --- |
| `src/app/globals.css` | `assets/farm-dip.css` | Copy the `@theme` colours as `:root` custom properties. Copy the component and "Living art" blocks as they are. Compile the Tailwind utilities used in the markup, or rewrite them as small classes. |
| Fonts (Yatra One, Tillana, Martel) | `assets/*.woff2` plus `@font-face` in `farm-dip.css` | All three are under the Open Font License. Self-host them. Shopify's font picker does not include them. |
| `src/lib/motion.ts` | `assets/farm-dip-motion.js` | Compile it once with `npx tsc src/lib/motion.ts --target es2020 --module es2020 --outDir dist`. Load it with `<script type="module">`, then call `initMotion()`. It wires everything up by data attributes. |
| `public/images/brand/farm-dip-badge.svg` | `assets/farm-dip-badge.svg` | Use it in the header, footer and favicon. Product photos carry the badge on the real label. |
| `public/images/pattern/*.svg` | `assets/` | Toran, phulkari band and arch mask. In CSS, reference them with `{{ 'toran.svg' \| asset_url }}` in a `<style>` block, or use relative URLs in the stylesheet. |
| `components/home/Hero.tsx` + `VillageWindow.tsx` | `sections/hero-village.liquid` | Make the Hindi line, the heading, the text and both buttons into section settings. The stamp text also becomes a setting. |
| `components/art/Buffalo.tsx` | `snippets/buffalo.liquid` | Paste the rendered SVG. Classes `buf-*` animate via CSS. Keep `data-hello-scene` on the wrapper and `data-hello-button` on the tap target. |
| `components/art/GheeJar.tsx` | `snippets/ghee-jar.liquid` | Same as the buffalo: static SVG. |
| `components/story/GheeJourney.tsx` + `JourneyScenes.tsx` | `sections/ghee-journey.liquid` | One block per step. Each block has settings for the Hindi name, heading, text, fact and Hindi fact. Each scene's SVG is a snippet. Keep the attributes `.journey`, `data-stage`, `data-beat`, `data-scene` and `data-i`, which `initMotion()` drives. |
| `components/product/SizeCard.tsx` | `snippets/size-card.liquid` | Loop `product.variants`. Per litre comes from `variant.price` divided by a `custom.volume_ml` variant metafield. |
| `components/product/PurchasePanel.tsx` | `sections/main-product.liquid` | Use Shopify's variant picker and product form. Hook `flyToCart(button, openDrawer)` into the add-to-cart submit. |
| `components/product/MilkMath.tsx` | Block in `main-product.liquid` | Litres per litre comes from the product metafield `custom.milk_litres_per_litre`. Re-run the count when the variant changes. |
| `components/cart/FreeShippingMeter.tsx` | `snippets/diya-meter.liquid` | Light `floor(cart.total_price / threshold * 5)` diyas. Put the threshold in a theme setting. |
| `components/story/CompareTable.tsx` | `sections/compare-table.liquid` | One block per row. |
| `components/layout/Header.tsx`, `Footer.tsx` | `sections/header.liquid`, `sections/footer.liquid` | Build the menus from Online Store > Navigation. The festive top bar becomes an announcement-bar block. |
| `app/how-its-made`, `app/about` | `templates/page.how-its-made.json`, `templates/page.about.json` | Build both from the sections above. |
| `app/blog/*` | Blog and articles | `src/data/posts.ts` becomes articles. Put the quick answer in the excerpt and the FAQs in metaobjects. |
| `app/not-found.tsx` | `templates/404.liquid` | Grazing buffalo snippet plus size cards. |

## Content: where each piece goes

| Prototype data | Shopify |
| --- | --- |
| `src/data/products.ts`: one product, three variants | One product, *Pure Desi Buffalo Ghee*, with variants 500 ml, 1 L and 5 L. Set SKU, price and compare-at price on each variant. |
| `variant.volumeMl` | Variant metafield `custom.volume_ml` (integer) |
| `product.facts` | Metaobject *fact* (label, value), referenced from product metafield `custom.facts` |
| `product.highlights`, `product.uses` | Product metafields, list of single-line text |
| `product.faqs`, `src/data/faqs.ts` | Metaobject *faq* (question, answer) |
| `product.milk.litresPerLitre` | Product metafield `custom.milk_litres_per_litre` |
| `src/data/process.ts` | Blocks of the `ghee-journey` section |
| `src/data/reviews.ts` (samples) | A reviews app (Judge.me or similar). Do not import the samples. |
| `src/lib/site.ts`: contact, address, FSSAI, GSTIN | Settings > Store details, plus theme settings for FSSAI and GSTIN in the footer |
| `site.aim` | Theme setting or a rich-text block on the home and about pages |

## Search and AI visibility after the port

- **Product structured data:** most themes output basic `Product` JSON-LD. Extend it with the variant offers, `AggregateRating` from the reviews app, and the facts as `additionalProperty`. Use `src/lib/seo.ts` as the reference.
- **Other structured data:** port `organizationLd`, `faqLd` and `howToLd` as snippets that output `<script type="application/ld+json">`.
- **robots.txt:** add `templates/robots.txt.liquid`, keep Shopify's default rules, and add the AI crawler groups from `src/app/robots.ts`.
- **llms.txt:** Shopify cannot serve a plain-text file at the domain root from a theme. Use an app proxy, or host the file in Files and add a URL redirect from `/llms.txt` to it.
- **Old URLs:** add the redirects listed in `next.config.ts` under Online Store > Navigation > URL redirects.

## What must not change in the markup

`initMotion()` relies on these attributes and classes:

- `data-pausable` on any wrapper of animated art. It pauses animations off screen.
- `.journey` on the journey section, plus:
  - `data-stage` on the sticky stage
  - `data-beat` on each step
  - `data-scene` on each scene
  - `data-i="N"` on everything that should switch with step N
- `data-hello-scene` and `data-hello-button` for Rani's hello.
- `data-cart-target` on the header cart icon, where the flying ghee drop lands.
