import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadAssets() {
  // Author and General Sans are fetched by scripts/fetch-fonts.mjs (Fontshare licence: self-host, no redistribution).
  const fonts = join(process.cwd(), "src/assets/fonts/fontshare");
  const [author, general, badge] = await Promise.all([
    readFile(join(fonts, "Author-Semibold.ttf")),
    readFile(join(fonts, "GeneralSans-Medium.ttf")),
    readFile(join(process.cwd(), "public/images/brand/farm-dip-badge.svg")),
  ]);
  return {
    fonts: [
      { name: "Author", data: author, weight: 600 as const, style: "normal" as const },
      { name: "General Sans", data: general, weight: 500 as const, style: "normal" as const },
    ],
    // The badge's lettering is already outlined, so it renders the same in Satori as everywhere else.
    badge: `data:image/svg+xml;base64,${badge.toString("base64")}`,
  };
}

const C = { cream: "#fff8e8", ink: "#231b1e", inkSoft: "#5a4d52", ghee: "#f5bf47", gheeDeep: "#eba826", pasture: "#133020" };

/** Shared social card: cream ground, a big drop of ghee behind the badge, Author headline. PNG for WhatsApp, Facebook and X. */
export async function renderOg({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  const { fonts, badge } = await loadAssets();
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: C.cream, color: C.ink, fontFamily: "General Sans", position: "relative" }}>
        <div style={{ position: "absolute", right: -60, top: -40, width: 560, height: 560, borderRadius: 9999, background: C.ghee, display: "flex" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, background: C.pasture, display: "flex" }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only. */}
        <img src={badge} width={340} height={391} alt="" style={{ position: "absolute", right: 90, top: 92 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px 70px", width: "62%" }}>
          <div style={{ display: "flex", fontSize: 32, fontFamily: "Author", color: C.ink }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, color: C.inkSoft, marginBottom: 14 }}>{kicker}</div>
            <div style={{ fontFamily: "Author", fontSize: title.length > 48 ? 58 : 70, lineHeight: 1.02, letterSpacing: -1.5 }}>{title}</div>
          </div>
          <div style={{ fontSize: 26, color: C.inkSoft }}>{footer}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
