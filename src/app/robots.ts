import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const privatePaths = ["/cart", "/checkout", "/search", "/api/"];

/*
  AI search and answer engines are explicitly allowed so the brand can be cited in
  ChatGPT, Claude, Perplexity, Gemini and Copilot answers. A crawler that matches a
  named group ignores the "*" group, so every group repeats the private paths.
  To opt out of model training only, move GPTBot, ClaudeBot, Google-Extended,
  Applebot-Extended and CCBot into a group with `disallow: "/"`.
*/
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
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiCrawlers, allow: "/", disallow: privatePaths },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
