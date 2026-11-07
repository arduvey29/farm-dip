# फ़ार्म dip (Farm Dip): Pure Desi Buffalo Ghee Storefront

A search-first e-commerce storefront for **Farm Dip – Pure Desi Ghee**, built with Next.js 16 (App Router, Partial Prerendering, Cache Components), React 19, TypeScript, and Tailwind CSS 4.

> **"Bring home the goodness of tradition with Farm Dip Pure Desi Ghee, crafted with care to bring authentic taste and rich aroma to your everyday meals."**
>
> **AIM**: *"We make ghee the way we ate it in our childhood: pure, simple, rich and full of goodness. Our aim is to bring that same purity and health to every family’s kitchen."*

---

## Brand & Product Highlights

- **100% Pure Buffalo Milk**: Naturally richer in wholesome fats, offering a signature danedar (grainy) texture, authentic aroma, and higher smoke point for traditional Indian cooking.
- **Client Promise**:
  - ✨ Pure and 100% natural
  - ✨ Rich in vitamins
  - ✨ No preservatives or additives
  - ✨ Perfect for everyday cooking and traditional recipes
- **Pack Sizes & Pricing**:
  - **500 ml**: ₹1,350 (MRP ₹1,699) — Airtight food-grade glass jar
  - **1 L**: ₹2,210 (MRP ₹2,799) — Bestselling kitchen staple glass jar
  - **5 L**: ₹9,900 (MRP ₹12,499) — Traditional food-grade stainless steel dolchi (Lowest per-litre cost at ₹1,980/L)

---

## Quick Start

```bash
npm install
cp .env.example .env.local   # configure NEXT_PUBLIC_SITE_URL
npm run dev                  # starts dev server on http://localhost:3000
npm run build && npm start   # production build & start
```

### Scripts

- `npm run dev`: Launch local Next.js development server with Turbopack.
- `npm run build`: Production compilation.
- `npm run typecheck`: Next.js typegen and TypeScript strict typechecking (`tsc --noEmit`).
- `npm run lint`: ESLint codebase verification.
- `npm run placeholders`: Regenerate SVG placeholder assets.

---

## Project Structure

```
src/
  app/                         App Router pages (prerendered as static HTML)
    page.tsx                   Landing page with Hero, Our Aim, Bestsellers, Festive Offer, & Bilona Story
    shop/                      Full product catalogue & interactive price-per-litre comparison table
    collections/[slug]         Collection archives (/collections/buffalo-ghee, /collections/gift-packs)
    products/[slug]            Product detail pages with pack size switcher and dynamic OG card
    blog/, blog/[slug]         Dairy guides & educational articles (benefits of buffalo ghee, purity checks, smoke point)
    bilona-process/            Traditional 8-step bilona method with HowTo schema
    lab-reports/               Batch lookup and NABL lab parameters
    about/                     Our story, founding mission, and brand aim
    faq/                       Frequently asked questions on pure buffalo ghee, storage, and orders
    contact/                   Customer support and inquiry forms
    cart/, checkout/           Shopping cart, coupon application, and checkout stubs
    search/                    Client-side real-time catalog search
    sitemap.ts, robots.ts      XML sitemaps and crawler access rules
    manifest.ts                PWA web app manifest
    llms.txt/, llms-full.txt/  Machine-readable site map & full catalogue for AI search engines
    feeds/google-merchant.xml/ Automated Google Merchant Center product feed
  components/
    art/                       Pichwai folk-art illustrations, animated vector mascots & jars
    cart/                      Cart provider, drawer, lines stepper, and free shipping diya meter
    home/                      Hero window, touch interactions, and festive highlights
    layout/                    Header, Logo (with smooth-scroll-to-top), MobileMenu drawer, & Footer
    product/                   ProductCard, PurchasePanel, MilkMath, PincodeCheck, & PriceTable
    story/                     BilonaJourney (scroll-driven 6-scene story), CompareTable, & LabTable
    ui/                        Accessible UI primitives, Breadcrumbs, Faq accordions, & Stars
  data/                        Single source of truth for catalogue, collections, reviews, FAQs, & lab data
  lib/
    site.ts                    Brand metadata, contact details, legal info, and navigation config
    seo.ts                     JSON-LD schema generators (OnlineStore, ProductGroup, HowTo, FAQPage)
    cart.ts                    Persistent browser cart state management
    format.ts                  Currency, percentage, and date formatters
```

---

## Key Features & Optimisations

### Search Engine & AI Optimisation (SEO, AEO, GEO)
- **Static Pre-rendering**: Every public page is pre-rendered for instant indexing.
- **Schema.org / JSON-LD Graph**: Interlinked `@graph` connecting `OnlineStore`, `ProductGroup`, `Offers` with shipping & returns, `AggregateRating`, `Reviews`, `HowTo`, and `FAQPage`.
- **AI Agent Discovery**: Dynamic `/llms.txt` and `/llms-full.txt` endpoints following the llmstxt.org specification.
- **Google Merchant Center Feed**: Auto-generated XML product feed with live pricing and stock status.
- **Canonical Redirects**: Backward-compatible 307 redirects for old legacy URLs (e.g. `/products/a2-gir-cow-bilona-ghee` $\to$ `/products/pure-desi-buffalo-ghee-1l`).

### User Experience (SXO)
- **Interactive Pack Switcher**: Select between 500 ml, 1 L, and 5 L packs seamlessly on product pages with instant price, per-litre savings, and packaging updates.
- **Navbar & Mobile Menu Quick-Return**: Clicking the logo from anywhere on the landing page or within the mobile drawer automatically closes the menu and smoothly scrolls directly to the top (`scroll: 0`).
- **Free Shipping Meter**: Visual diya counter in the cart drawer tracking eligibility for free delivery across India.
- **Milk-Per-Litre Counter**: Interactive visual representation showing the ~14 litres of pure buffalo milk required to craft each litre of pure desi ghee.

---

## Design System

- **Palette**: Katha (maroon) for backgrounds, haldi gold for ghee and actions, kumkum red for badges and offers, peetal (brass) for borders, and chandan cream on a handmade-paper background.
- **Typography**: Eczar for Indian-style display headings, Mukta for clear reading copy, and Kalam for handwritten notes.
- **Motifs**: Pichwai art, traditional jharokha arches, rangoli mandalas, and toran banners.

---

## Pre-Launch Checklist

- [ ] Update legal details (GSTIN, FSSAI licence number, and registered address) in `src/lib/site.ts`.
- [ ] Connect production payment gateway (Razorpay / Cashfree) in checkout handlers.
- [ ] Wire up live pincode delivery checking & courier integration (Delhivery / Shiprocket).
- [ ] Upload final high-resolution product photography into `public/images/products/`.
- [ ] Configure `NEXT_PUBLIC_SITE_URL` in your deployment environment.
