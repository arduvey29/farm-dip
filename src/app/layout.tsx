import type { Metadata, Viewport } from "next";
import { Eczar, Kalam, Mukta } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { graph, organizationLd, websiteLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Eczar (display) and Mukta (text) are Indian-designed and cover Latin and Devanagari; Kalam is a handwritten accent.
const eczar = Eczar({ subsets: ["latin", "devanagari"], variable: "--font-eczar", display: "swap" });
const kalam = Kalam({ weight: ["400", "700"], subsets: ["latin", "devanagari"], variable: "--font-kalam", display: "swap" });
const mukta = Mukta({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-mukta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Pure Desi Ghee | 100% Natural Buffalo Milk Ghee`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  category: "food",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} – Pure Desi Ghee`,
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
    "geo.region": "IN-GJ",
    "geo.placename": `${site.address.locality}, ${site.address.region}`,
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a1410",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${eczar.variable} ${kalam.variable} ${mukta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only z-50 rounded-full bg-haldi-500 px-5 py-3 font-semibold text-maroon-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
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
