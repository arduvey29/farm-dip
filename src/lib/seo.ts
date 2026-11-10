import type { Metadata } from "next";
import { site } from "./site";
import type { Post, Product, QA, Review } from "@/data/types";
import type { ProcessStep } from "@/data/process";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  /** Set when the route has its own opengraph-image file; a config image would override it. */
  ownOgImage?: boolean;
};

// Site-wide social card. Segments with their own opengraph-image file (products, blog posts) override it.
const defaultOgImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: pure desi buffalo ghee` };

/**
 * Per-page metadata with a canonical URL, en-IN alternate and Open Graph.
 * Metadata merges shallowly, so a page's `openGraph` replaces the root one entirely:
 * the default image is repeated here, and `robots` is only set when it changes.
 */
export function pageMetadata({ title, description, path, keywords, type = "website", noindex, publishedTime, modifiedTime, ownOgImage }: PageMeta): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: {
      canonical: path,
      languages: { "en-IN": path, "x-default": path },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(ownOgImage ? {} : { images: [defaultOgImage] }),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(ownOgImage ? {} : { images: [defaultOgImage.url] }) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- JSON-LD builders. All entities share stable @id values so they link into one graph. ---------- */

export const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  returnPolicy: absoluteUrl("/policies/refund#policy"),
  farm: absoluteUrl("/about#farm"),
};

function returnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    "@id": ids.returnPolicy,
    applicableCountry: "IN",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: site.commerce.returnWindowDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    url: absoluteUrl("/policies/refund"),
  };
}

function shippingDetails(price: number) {
  const free = price >= site.commerce.freeShippingThreshold;
  return {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: free ? 0 : site.commerce.shippingFee, currency: site.currency },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: site.commerce.transitDays.min, maxValue: site.commerce.transitDays.max, unitCode: "DAY" },
    },
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

export function organizationLd() {
  return {
    "@type": "OnlineStore",
    "@id": ids.organization,
    name: site.name,
    alternateName: site.wordmark,
    legalName: site.legalName,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/images/brand/farm-dip-logo.png"), width: 512, height: 512 },
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.contact.email,
    telephone: site.contact.phoneHref,
    address: postalAddress(),
    location: {
      "@type": "Place",
      "@id": ids.farm,
      name: `${site.name} farm`,
      address: postalAddress(),
      geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    },
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: site.contact.phoneHref,
      email: site.contact.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    hasMerchantReturnPolicy: returnPolicy(),
    identifier: [{ "@type": "PropertyValue", propertyID: "FSSAI", value: site.legal.fssai }],
    knowsAbout: ["Ghee", "Desi ghee", "Buffalo ghee", "Buffalo milk", "Traditional ghee making"],
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: { "@id": ids.organization },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: readonly QA[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Product variants as a ProductGroup (Google's variant structured data), one Product + Offer per pack size.
 */
export function productLd(product: Product, reviews: Review[], rating: { average: number; count: number }) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const brand = { "@type": "Brand", name: site.name };
  const images = product.images.map((i) => absoluteUrl(i.src));

  const variants = product.variants.map((v) => ({
    "@type": "Product",
    "@id": `${url}?pack=${v.id}#product`,
    sku: v.sku,
    name: `${product.name} ${v.label}`,
    image: absoluteUrl(v.image),
    size: v.label,
    brand,
    offers: {
      "@type": "Offer",
      url: `${url}?pack=${v.id}`,
      price: v.price,
      priceCurrency: site.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: v.mrp,
        priceCurrency: site.currency,
        priceType: "https://schema.org/StrikethroughPrice",
      },
      availability: v.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ids.organization },
      shippingDetails: shippingDetails(v.price),
      hasMerchantReturnPolicy: { "@id": ids.returnPolicy },
    },
  }));

  const ratingLd =
    rating.count > 0
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: rating.average, reviewCount: rating.count, bestRating: 5, worstRating: 1 },
          review: reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            name: r.title,
            reviewBody: r.body,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
          })),
        }
      : {};

  const common = {
    name: product.name,
    description: product.summary,
    url,
    image: images,
    brand,
    category: "Food > Dairy > Ghee",
    countryOfOrigin: "IN",
    additionalProperty: product.facts.map((f) => ({ "@type": "PropertyValue", name: f.label, value: f.value })),
    ...ratingLd,
  };

  if (variants.length === 1) {
    const [only] = variants;
    return { "@type": "Product", "@id": `${url}#product`, sku: only.sku, size: only.size, offers: only.offers, ...common };
  }

  return {
    "@type": "ProductGroup",
    "@id": `${url}#product`,
    productGroupID: product.slug,
    variesBy: "https://schema.org/size",
    hasVariant: variants,
    ...common,
  };
}

export function itemListLd(name: string, path: string, items: { name: string; path: string; image: string }[]) {
  return {
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      image: absoluteUrl(item.image),
    })),
  };
}

export function articleLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: site.language,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: `${site.name} dairy team`, url: absoluteUrl("/about") },
    publisher: { "@id": ids.organization },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.href })),
    about: post.relatedProducts.map((slug) => ({ "@id": absoluteUrl(`/products/${slug}#product`) })),
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["[data-speakable]"] },
  };
}

export function howToLd(steps: ProcessStep[]) {
  return {
    "@type": "HowTo",
    name: `How ${site.name} buffalo ghee is made`,
    description: "Desi ghee made the bilona way from full-fat buffalo milk: set into dahi, churned, washed, clarified and strained through muslin, with nothing added.",
    supply: [{ "@type": "HowToSupply", name: "Full-fat buffalo milk" }, { "@type": "HowToSupply", name: "Cold water" }],
    tool: [{ "@type": "HowToTool", name: "Large saucepan" }, { "@type": "HowToTool", name: "Wooden madhani (bilona churn)" }, { "@type": "HowToTool", name: "Spoon" }, { "@type": "HowToTool", name: "Muslin cloth" }],
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: absoluteUrl(`/how-its-made#${s.id}`),
    })),
  };
}

export function webPageLd(opts: { path: string; name: string; description: string; type?: string; dateModified?: string }) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: site.language,
    isPartOf: { "@id": ids.website },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["[data-speakable]"] },
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
