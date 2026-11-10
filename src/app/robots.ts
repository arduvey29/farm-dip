import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const privatePaths = ["/cart", "/checkout", "/search", "/api/"];

const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "meta-externalagent",
  "CCBot",
  "Googlebot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiCrawlers, allow: "/", disallow: privatePaths },
    ],
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/feeds/google-merchant.xml")],
    host: absoluteUrl("/"),
  };
}
