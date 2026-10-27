import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadAssets() {
  const fonts = join(process.cwd(), "src/assets/fonts");
  const [eczar, mukta, badge] = await Promise.all([
    readFile(join(fonts, "Eczar-Bold.ttf")),
    readFile(join(fonts, "Mukta-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/images/brand/farm-dip-badge.svg")),
  ]);
  return {
    fonts: [
      { name: "Eczar", data: eczar, weight: 700 as const, style: "normal" as const },
      { name: "Mukta", data: mukta, weight: 600 as const, style: "normal" as const },
    ],
    // The badge's wordmark is already outlined, so Devanagari shaping does not depend on Satori.
    badge: `data:image/svg+xml;base64,${badge.toString("base64")}`,
  };
}

const C = { maroon: "#4a1410", haldiLight: "#f8d47a", chandan: "#f8ead0", peetal: "#b8862b" };

/** Shared social card, set like an invitation: maroon ground, double brass rule, the badge as a seal. PNG for WhatsApp, Facebook and X. */
export async function renderOg({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  const { fonts, badge } = await loadAssets();
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: C.maroon, color: C.chandan, fontFamily: "Mukta", position: "relative" }}>
        <div style={{ position: "absolute", top: 22, left: 22, right: 22, bottom: 22, border: `3px solid ${C.peetal}`, display: "flex" }} />
        <div style={{ position: "absolute", top: 32, left: 32, right: 32, bottom: 32, border: `1px solid ${C.peetal}`, display: "flex" }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only. */}
        <img src={badge} width={400} height={460} alt="" style={{ position: "absolute", right: 70, top: 85 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", width: "62%" }}>
          <div style={{ display: "flex", fontSize: 34, fontFamily: "Eczar", color: C.haldiLight }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: C.haldiLight, marginBottom: 12 }}>{kicker}</div>
            <div style={{ fontFamily: "Eczar", fontSize: title.length > 48 ? 56 : 66, lineHeight: 1.06 }}>{title}</div>
          </div>
          <div style={{ fontSize: 27, color: C.chandan }}>{footer}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
