import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadAssets() {
  const fonts = join(process.cwd(), "src/assets/fonts");
  const [yatra, martel, badge] = await Promise.all([
    readFile(join(fonts, "YatraOne-Regular.ttf")),
    readFile(join(fonts, "Martel-Bold.ttf")),
    readFile(join(process.cwd(), "public/images/brand/farm-dip-badge.svg")),
  ]);
  return {
    fonts: [
      { name: "Yatra One", data: yatra, weight: 400 as const, style: "normal" as const },
      { name: "Martel", data: martel, weight: 700 as const, style: "normal" as const },
    ],
    // The badge's wordmark is already outlined, so Devanagari shaping does not depend on Satori.
    badge: `data:image/svg+xml;base64,${badge.toString("base64")}`,
  };
}

const C = { lal: "#6b100b", haldiLight: "#fcdb7e", chandan: "#fdebc8", peetal: "#b8862b" };

/** Shared social card, set like an invitation: sindoori red ground, double brass rule, the badge as a seal. PNG for WhatsApp, Facebook and X. */
export async function renderOg({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  const { fonts, badge } = await loadAssets();
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: C.lal, color: C.chandan, fontFamily: "Martel", position: "relative" }}>
        <div style={{ position: "absolute", top: 22, left: 22, right: 22, bottom: 22, border: `3px solid ${C.peetal}`, display: "flex" }} />
        <div style={{ position: "absolute", top: 32, left: 32, right: 32, bottom: 32, border: `1px solid ${C.peetal}`, display: "flex" }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only. */}
        <img src={badge} width={400} height={460} alt="" style={{ position: "absolute", right: 70, top: 85 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", width: "62%" }}>
          <div style={{ display: "flex", fontSize: 34, fontFamily: "Yatra One", color: C.haldiLight }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: C.haldiLight, marginBottom: 12 }}>{kicker}</div>
            <div style={{ fontFamily: "Yatra One", fontSize: title.length > 48 ? 56 : 66, lineHeight: 1.06 }}>{title}</div>
          </div>
          <div style={{ fontSize: 27, color: C.chandan }}>{footer}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
