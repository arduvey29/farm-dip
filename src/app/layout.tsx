import type { Metadata, Viewport } from "next";
import { Eczar } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { graph, organizationLd, websiteLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Author (headings) and General Sans (text) by Indian Type Foundry, from Fontshare. The files are
// downloaded by scripts/fetch-fonts.mjs, because their licence allows self-hosting but not redistribution.
const author = localFont({
  src: [
    { path: "../assets/fonts/fontshare/Author-Variable.woff2", weight: "200 700", style: "normal" },
    { path: "../assets/fonts/fontshare/Author-VariableItalic.woff2", weight: "200 700", style: "italic" },
  ],
  variable: "--font-author",
  display: "swap",
});
const general = localFont({
  src: [{ path: "../assets/fonts/fontshare/GeneralSans-Variable.woff2", weight: "200 700", style: "normal" }],
  variable: "--font-general",
  display: "swap",
});
// Eczar sets the "Farm Dip" wordmark, matching the badge. Only Latin is preloaded; its Devanagari
// files still load on demand for the Sanskrit shlok beside the pour.
const caslon = localFont({
  src: [
    { path: "../assets/fonts/adobe-caslon/ACaslonPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/adobe-caslon/ACaslonPro-Semibold.otf", weight: "600", style: "normal" },
    { path: "../assets/fonts/adobe-caslon/ACaslonPro-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-adobe-caslon",
  display: "swap",
});
const eczar = Eczar({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-eczar", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pure Desi Buffalo Ghee | 100% Natural, No Preservatives`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  category: "food",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/apple-touch-icon-precomposed.png" },
    ],
  },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} | Pure Desi Buffalo Ghee`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  other: {
    // Regional hints. Ignored by Google, still read by some regional engines and directories.
    "geo.region": site.address.isoRegion,
    "geo.placename": `${site.address.locality}, ${site.address.region}`,
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff8e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${author.variable} ${general.variable} ${eczar.variable} ${caslon.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only z-50 rounded-full bg-ghee-500 px-5 py-3 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <JsonLd data={graph(organizationLd(), websiteLd())} />
      </body>
    </html>
  );
}
