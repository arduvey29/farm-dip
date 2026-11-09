# Farm Dip: pure desi buffalo ghee

A search-first storefront for Farm Dip Pure Desi Ghee, made from buffalo milk. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS 4.

This site is the design and content prototype. It is planned to become a Shopify theme; see [SHOPIFY.md](SHOPIFY.md) for how each part maps to Liquid.

The brand is Farm Dip, always written in English. Product images are generated placeholders. Every value marked `PLACEHOLDER` in the code must be confirmed or replaced before launch (see the checklist below).

## Quick start

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Other scripts:
- `npm run lint`
- `npm run typecheck`
- `npm run placeholders` regenerates the placeholder artwork in `public/images`.

## The product

One ghee in three sizes, at the brand's prices:

| Pack | Price | MRP | Per litre | Packed in |
| --- | --- | --- | --- | --- |
| 500 ml | ₹1,350 | ₹1,699 | ₹2,700 | Airtight glass jar |
| 1 L | ₹2,210 | ₹2,799 | ₹2,210 | Airtight glass jar |
| 5 L | ₹9,900 | ₹12,499 | ₹1,980 | Stainless steel dolchi |

About 12 to 14 litres of buffalo milk go into each litre of ghee. Shelf life is 12 months from packing.

All product copy comes from the brand's own description: pure and 100% natural, rich in vitamins, no preservatives or additives, for everyday cooking and traditional recipes. The aim statement is in `site.aim`.

## Project layout

```
src/
  app/                 Routes. Every page is prerendered as static HTML.
    page.tsx           Home
    shop/              The three pack sizes, price-per-litre table
    products/[slug]    Product page, with its own Open Graph image
    how-its-made/      Six-step process (HowTo schema), animated churn
    about/             Our story
    blog/, blog/[slug] Answer-first guides, with Open Graph images
    faq/ contact/ track-order/ policies/[slug]
    cart/ checkout/ search/        noindex
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx
    llms.txt/ llms-full.txt/       Site map and full content for AI assistants
    feeds/google-merchant.xml/     Google Merchant Center product feed
  data/                Product, process steps, reviews, FAQs, guides, policies
  lib/site.ts          Brand, contact, legal and commerce settings (single source of truth)
  lib/seo.ts           Metadata helper and JSON-LD builders
  lib/motion.ts        All interactive motion, framework-free (reused by the Shopify theme)
  lib/assets.ts        Version stamp for /public/images
  lib/cart.ts          Browser cart store (localStorage)
  components/          UI, grouped by area
scripts/generate-placeholders.mjs
```

All content comes from `src/data/*.ts` and `src/lib/site.ts`. Pages, structured data, `llms.txt`, the sitemap and the Merchant feed are all generated from the same data, so they cannot drift apart.

## Search optimisation, built in

**SEO**
- Static HTML for every public page, canonical URLs, `en-IN` hreflang, titles and descriptions per page.
- Structured data as one linked `@graph`:
  - `OnlineStore` with address, geo coordinates, return policy and FSSAI identifier
  - `WebSite`
  - `ProductGroup`, with a `Product` and `Offer` for each pack size (shipping details, return policy)
  - `AggregateRating` and `Review`
  - `BreadcrumbList`, `ItemList`, `Article`, `FAQPage`, `HowTo`
- XML sitemap with image entries, `robots.txt`, web manifest, generated PNG social cards.
- Permanent redirects for old URLs, including pages from the earlier multi-product catalogue.

**AEO (answer engines, featured snippets, voice)**
- A short, direct answer block at the top of guides and key pages, marked `speakable`.
- Question-shaped headings, `<details>` FAQ accordions (answers stay in the HTML), plain HTML comparison tables.

**GEO and AIO (generative and AI search)**
- `/llms.txt` and `/llms-full.txt`, generated from the catalogue.
- `robots.txt` explicitly allows AI search crawlers. To opt out of model training only, see the comment in `src/app/robots.ts`.
- Factual, quotable copy, cited sources on guides, and the same entity facts (name, address, phone) on every page and in the schema.

**SXO (search experience)**
- Price per litre on every pack, with the saving shown against the smallest pack.
- Near the buy button: pincode delivery estimate, free cash on delivery and the free-shipping threshold.
- Sticky mobile buy bar, and a cart drawer with a free-shipping meter.
- Responsive from 360 px, keyboard accessible, respects reduced motion.

## Design

Semi-modern and warm, built around one thing: ghee. Desi in its content (Rani the buffalo, the bilona method, the Sanskrit shlok), modern in its layout and type. The only Devanagari on the site is the Sanskrit shlok beside the pour.

**Brand.** The Farm Dip badge: a cream oval seal, a farmer resting under a banyan, laurel sprigs.
- Drawn once in `src/components/brand/badge.mjs`.
- Used on the header, footer, social cards, app icons and every product label.
- "Farm" and "Dip" on the badge are outlined from Eczar Bold (`wordmark.mjs`). Keep `src/assets/fonts/Eczar-Bold.ttf` for regenerating them.

**Palette.** Tokens live in `src/app/globals.css`:
- ghee (molten gold) for the brand bands, the drips and buy buttons
- pasture (deep green) for dark sections and the footer
- ink (Rani's plum-black) for text and the main buttons
- cream for the page, oat for quiet panels, milk for cards
- spice (chilli red) only for offers and savings

**Type.**
- Author (Indian Type Foundry, Fontshare) for headings
- General Sans (Indian Type Foundry, Fontshare) for text and interface
- Eczar for the "Farm Dip" wordmark (matching the badge) and the shlok आयुर्वै घृतम्

Author and General Sans are under the ITF Free Font License. It allows self-hosting on our own site but not redistributing the files, so they are not in git: `scripts/fetch-fonts.mjs` downloads them into `src/assets/fonts/fontshare/` before `dev`, `build` and `typecheck` (`npm run fonts` runs it by hand).

**Buttons.** `.btn` with `.btn-ink` (go somewhere), `.btn-gold` (add to cart, pay) or `.btn-line` (secondary).

**Motion.** CSS animation plus a little framework-free JavaScript in `src/lib/motion.ts`. Looping art pauses off screen and stays still for visitors who prefer reduced motion.
- **Ghee drips** (`components/art/GheeDrip.tsx`): molten ghee hangs off the bottom of the gold bands. The drips lengthen as you scroll and the longest let a drop fall.
- **The pour** (`components/home/PourSection.tsx`): beside the brand's aim, a brass pateela tips as you scroll, a stream of ghee fills a jar, and at the very end it spills over the rim.
- **Rani**, a buffalo in the folk manner (`components/art/Buffalo.tsx`), stands in front of a giant drop of ghee in the hero. She swishes, flicks her ears, blinks and chews. Tap her and she says "Ram Ram!".
- **Ghee journey** on the home page and the how-it's-made page (`components/story/GheeJourney.tsx`): a scroll-driven story in the brand's eight steps (`src/data/process.ts`), one scene each: Rani and her milk, the slow boil, setting overnight, the bilona churn, collecting the butter, the cold-water wash, clarifying, and cooling and straining into the jar. A line of ghee runs down the steps as you go.
- **Cart:** a drop of ghee flies into the cart icon when you add a pack.

**Test report.** `components/ui/TestReport.tsx` shows the QR code for the ghee's test report (a PDF on Google Drive, set in `site.testReport`). It sits in the footer and as the fourth tile of the pack-size grid.

**Checkout.** Three steps, like Shopify's three-page checkout: phone, delivery address, then review and pay, followed by a receipt.
- **Product page:** "What goes into one pack" counts the litres of buffalo milk behind the selected size.

## Before launch

Confirm with the brand (marked `PLACEHOLDER`):
- [ ] MRPs (₹1,699, ₹2,799, ₹12,499) match the MRP printed on each pack, since they are shown struck through
- [ ] "Rich in vitamins": FSSAI's labelling and claims rules apply to nutrient claims, so back it with your own lab values in `gheeNutrition`
- [ ] Legal name, address, coordinates, phone, WhatsApp and email in `src/lib/site.ts`
- [ ] FSSAI licence number, GSTIN and grievance officer (legally required for Indian food e-commerce)
- [ ] Social profile URLs in `site.social`
- [ ] Product photography: replace the SVGs in `public/images` (1600×1600 WebP/AVIF, no text overlays for Google Shopping), then bump `ASSET_VERSION` in `src/lib/assets.ts`
- [ ] **Reviews in `src/data/reviews.ts` are samples.** Replace them with real, verified reviews. Fake review markup violates Google's policies.
- [ ] The "Our story" copy on the about page, written in the founders' own words
- [ ] Policy text in `src/data/policies.ts`, reviewed by a lawyer

Wire up services, if staying on Next.js (on Shopify these are native; see SHOPIFY.md):
- [ ] Checkout and payments (Razorpay or Cashfree)
- [ ] Courier serviceability and tracking (Shiprocket, Delhivery)
- [ ] Newsletter and contact forms
- [ ] Analytics and consent

After deploying:
- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] Verify in Google Search Console and Bing Webmaster Tools, and submit `/sitemap.xml`
- [ ] Submit the product feed in Google Merchant Center (free listings)
- [ ] Create a Google Business Profile with the same name, address and phone as `site.ts`
- [ ] Test pages in Google's Rich Results Test and the Schema Markup Validator
