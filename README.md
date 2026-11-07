# फ़ार्म dip (Farm Dip): pure desi buffalo ghee

A search-first storefront for Farm Dip Pure Desi Ghee, made from buffalo milk. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS 4.

This site is the design and content prototype. It is planned to become a Shopify theme; see [SHOPIFY.md](SHOPIFY.md) for how each part maps to Liquid.

The brand is फ़ार्म dip: "farm" in Devanagari, "dip" in Latin letters. Product images are generated placeholders. Every value marked `PLACEHOLDER` in the code must be confirmed or replaced before launch (see the checklist below).

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

| Pack | Price | Per litre |
| --- | --- | --- |
| 500 ml | ₹1,350 | ₹2,700 |
| 1 L | ₹2,210 | ₹2,210 |
| 5 L | ₹9,900 | ₹1,980 |

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

A desi look with painted folk art that moves, in the colours of a Punjabi-Haryanvi village at festival time.

**Brand.** The फ़ार्म dip badge: a cream oval seal, a farmer resting under a banyan, laurel sprigs.
- Drawn once in `src/components/brand/badge.mjs`.
- Used on the header, footer, social cards, app icons and every product label.
- The wordmark is outlined from Eczar Bold with HarfBuzz shaping (`wordmark.mjs`). Keep `src/assets/fonts/Eczar-Bold.ttf` for regenerating it.

**Palette (phulkari).** Tokens live in `src/app/globals.css`:
- lal (sindoori red) for festive grounds
- kattha brown for text
- haldi yellow for the main buttons
- rani pink for offers and add-to-cart
- genda orange, hara green and neel blue as embroidery accents
- peetal brass for rules
- chandan and malai cream for light surfaces

**Type.** All three cover Latin and Devanagari:
- Yatra One (hand-painted Indian signboard lettering) for headings
- Tillana (brush-pen calligraphy) for Hindi notes
- Martel (an Indian-designed serif) for reading text

**Motifs.**
- Toran across the hero
- Jharokha arches (`.arch`)
- Phulkari diamond borders (`.phulkari-band`)
- Double brass rules (`.frame-peetal`)
- A rubber-stamp "100% शुद्ध" seal
- Devanagari numerals for the steps
- A Hindi line above each section heading

**Living art.** CSS animation only. It pauses off screen and stays still for visitors who prefer reduced motion.
- **Rani**, a buffalo in the folk manner (`src/components/art/Buffalo.tsx`):
  - Curled horns painted in festival bands, a phundna tassel, a kauri-and-marigold garland, Gond-style patterns, a white tail switch and an egret on her back.
  - She swishes, flicks her ears, blinks, chews and grazes.
  - In the hero she stands in a village at dawn (sarson field, bitoda, neem, mud house). Tap her and she says "राम राम".
- **Ghee journey** on the home page (`src/components/story/GheeJourney.tsx`), a scroll-driven story in six scenes:
  1. Rani in the village pond.
  2. Milk on the chulha with malai forming.
  3. Dahi setting under the moon.
  4. The madhani churning.
  5. Makkhan melting on the fire.
  6. The jar filling, getting its lid and its "100% शुद्ध" stamp.
- **Cart:** a drop of ghee flies into the cart icon when you add a pack, and free-shipping progress is a row of diyas that light up.
- **Product page:** "What goes into one pack" counts the litres of buffalo milk behind the selected size.

**Seasonal.** The Diwali top bar and the home-page festive card are driven by `site.festive` in `src/lib/site.ts`. Set it to `null` after the festival.

## Before launch

Confirm with the brand (marked `PLACEHOLDER`):
- [ ] The six steps in `src/data/process.ts`. They describe the traditional home method (malai, dahi, makkhan, slow cooking). Make sure they match the real process.
- [ ] Litres of buffalo milk per litre of ghee (`milk` in `src/data/products.ts`, `site.stats.milkPerLitre`)
- [ ] SKUs, packaging (jar or tin for each size), shelf life, and MRPs, if they differ from the selling price
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
