# फ़ार्म dip (Farm Dip): A2 bilona ghee storefront

A search-first e-commerce site for a ghee brand, built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS 4.

The brand is फ़ार्म dip: "farm" in Devanagari, "dip" in Latin letters. All product images are generated placeholders, and every value marked `PLACEHOLDER` in the code must be replaced before launch (see the checklist below).

## Quick start

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run placeholders` (regenerates placeholder artwork in `public/images`).

## Project layout

```
src/
  app/                 Routes. Every page is prerendered as static HTML.
    page.tsx           Home
    shop/              All products, price-per-litre table
    collections/[slug] A2 cow, buffalo, infused, gift packs
    products/[slug]    Product page, with its own Open Graph image
    blog/, blog/[slug] Answer-first guides, with Open Graph images
    bilona-process/    Eight-step process (HowTo schema)
    lab-reports/       Batch lookup and lab parameters
    about/ faq/ contact/ track-order/ policies/[slug]
    cart/ checkout/ search/        noindex
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx
    llms.txt/ llms-full.txt/       Site map and full content for AI assistants
    feeds/google-merchant.xml/     Google Merchant Center product feed
  data/                Catalogue, collections, reviews, FAQs, posts, policies, lab data
  lib/site.ts          Brand, contact, legal and commerce settings (single source of truth)
  lib/seo.ts           Metadata helper and JSON-LD builders
  lib/cart.ts          Browser cart store (localStorage)
  components/          UI, grouped by area
scripts/generate-placeholders.mjs
```

All content comes from `src/data/*.ts` and `src/lib/site.ts`. Pages, structured data, `llms.txt`, the sitemap and the Merchant feed are generated from the same data, so they cannot drift apart.

## Search optimisation, built in

**SEO**
- Static HTML for every public page, canonical URLs, `en-IN` hreflang, titles and descriptions per page.
- Structured data as one linked `@graph`: `OnlineStore` with address, geo coordinates, return policy and FSSAI identifier; `WebSite`; `ProductGroup` with a `Product` and `Offer` per pack size (price, strikethrough MRP, shipping details, return policy); `AggregateRating` and `Review`; `BreadcrumbList`; `ItemList`; `CollectionPage`; `Article`; `FAQPage`; `HowTo`.
- XML sitemap with image entries, `robots.txt`, web manifest, generated PNG social cards.
- Permanent redirects for common old URL shapes (`/product/x`, `/shop/x`).

**AEO (answer engines, featured snippets, voice)**
- A short, direct answer block at the top of guides, collections and key pages, marked `speakable`.
- Question-shaped headings, `<details>` FAQ accordions (answers stay in the HTML), plain HTML comparison tables.

**GEO and AIO (generative and AI search)**
- `/llms.txt` and `/llms-full.txt` generated from the catalogue.
- `robots.txt` explicitly allows AI search crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others). To opt out of model training only, see the comment in `src/app/robots.ts`.
- Factual, quotable copy: "At a glance" definition lists on products, cited sources on guides, consistent entity facts (name, address, phone) across pages and schema.
- Regional signals: `geo.*` meta tags, `areaServed: India`, INR pricing, Indian pincode delivery estimates.

**SXO (search experience)**
- Price per litre on every pack, "best value" pack, savings shown against the smallest pack.
- Pincode delivery estimate, free COD and free shipping threshold near the buy button, sticky mobile buy bar, cart drawer with a free-shipping meter.
- Lab report lookup by batch number, verified review distribution.
- Responsive from 360 px, keyboard accessible (native `<dialog>` drawers, visible focus), respects reduced motion.

## Design

A traditional Indian look, like a puja thali or a wedding card, with painted folk art that moves.

- Brand: the फ़ार्म dip badge, a cream oval seal with a green double rule, laurel sprigs and a woodcut-style scene of a farmer resting under a banyan beside his fields. It is drawn once in `src/components/brand/badge.mjs` and used everywhere: header, footer, Open Graph cards, app icons and every jar, dolchi and gift box label. The wordmark is outlined from Eczar Bold with HarfBuzz shaping (`wordmark.mjs`), so the Devanagari reph and nukta render correctly even in standalone SVG files.
- Palette: maroon (katha) for text and festive grounds, haldi gold for ghee and main buttons, kumkum red for offers and add-to-cart, genda (marigold) orange for flowers, peetal (brass) for borders and ornament, mehndi green for trust marks, chandan cream on a handmade-paper background. Tokens live in `src/app/globals.css`.
- Type: Eczar for headings (Indian-designed, Latin and Devanagari), Kalam for handwritten Hindi notes, Mukta for body text.
- Motifs: toran across the hero, jharokha arches (`.arch`), rangoli mandala, kairi block-print borders (`.kairi-band`), double brass rules (`.frame-peetal`), a rubber-stamp lab seal, Devanagari numerals for sequences and a Hindi line above each section heading. Components are in `src/components/ui/Ornament.tsx`.
- Living art (CSS animation only, paused off screen, still for visitors who prefer reduced motion):
  - **Gauri**, a Gir cow painted in the Pichwai manner (`src/components/art/GirCow.tsx`): she swishes her tail, flicks her ears, blinks, chews and grazes. In the hero she stands in a jharokha window onto a goshala at dawn; tap her and she calls out.
  - **Bilona journey** on the home page (`src/components/story/BilonaJourney.tsx`): a scroll-driven story in six scenes. The sky turns from morning to night and back, milk pours, curd sets under the moon, the madhani churns, makkhan melts golden on a wood fire and the jar fills, gets its lid and is stamped. Step text is plain HTML; `JourneyDriver` only sets attributes and CSS variables.
  - **Cart**: a drop of ghee flies into the cart icon on add, and free-shipping progress is a row of diyas that light up.
  - **Product page**: "What goes into one pack" counts the litres of milk behind the selected pack, in 5-litre cans (`milk` in `src/data/products.ts`).
- Seasonal greeting in the top bar is set by `site.festive` in `src/lib/site.ts` (set it to `null` after Diwali).
- Placeholder product art shows the intended shoot: jars with a red cloth tied over the lid, on a banana leaf with marigolds and rangoli, with the badge as the label.

## Before launch

Replace placeholders:
- [ ] Legal name, address, phone, WhatsApp, email in `src/lib/site.ts`
- [ ] FSSAI licence number, GSTIN and grievance officer (legally required for Indian food e-commerce)
- [ ] Social profile URLs in `site.social` (become `sameAs` in structured data)
- [ ] Product photography: replace SVGs in `public/images` (1600×1600 WebP/AVIF, no text overlays for Google Shopping), update paths in `src/data/products.ts` and bump `ASSET_VERSION` in `src/lib/assets.ts` so browsers fetch the new files
- [ ] Prices, SKUs, pack sizes and milk-per-litre figures in `src/data/products.ts`
- [ ] **Reviews in `src/data/reviews.ts` are samples.** Replace with real, verified reviews from your review platform. Fake review markup violates Google's policies.
- [ ] Stats in `site.stats` (partner farms, lab parameters): publish only numbers you can substantiate
- [ ] Lab results and batch list in `src/data/lab.ts`; put report PDFs in `public/lab-reports/`
- [ ] Nutrition values in `gheeNutrition` from your own lab
- [ ] Policy text in `src/data/policies.ts` reviewed by a lawyer
- [ ] Author details on guides: named, credentialed authors improve E-E-A-T

Wire up services (each is marked `PLACEHOLDER` in code):
- [ ] Checkout: a server action that re-prices the cart from the catalogue and creates the order, plus Razorpay or Cashfree for online payment
- [ ] Courier serviceability and tracking (Shiprocket, Delhivery) in `PincodeCheck` and `TrackOrderForm`
- [ ] Newsletter and contact forms (email provider or helpdesk)
- [ ] Analytics and consent

After deploying:
- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] Verify in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`
- [ ] Submit `/feeds/google-merchant.xml` in Google Merchant Center (free listings)
- [ ] Create a Google Business Profile with the same name, address and phone as `site.ts`
- [ ] Test pages in Google's Rich Results Test and the Schema Markup Validator
