import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const svgPath = path.join(rootDir, "src", "app", "icon.svg");
const appleIconSrc = path.join(rootDir, "src", "app", "apple-icon.png");

async function buildIco(sizes, srcPath) {
  const images = [];
  for (const size of sizes) {
    const buffer = await sharp(srcPath)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    images.push({ size, buffer });
  }

  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved. Must always be 0.
  header.writeUInt16LE(1, 2); // Specifies image type: 1 for icon (.ICO)
  header.writeUInt16LE(images.length, 4); // Number of images

  let offset = 6 + (16 * images.length);
  const directoryEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // Width
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // Height
    entry.writeUInt8(0, 2); // Color count (0 = >=8bpp)
    entry.writeUInt8(0, 3); // Reserved (0)
    entry.writeUInt16LE(1, 4); // Color planes (1)
    entry.writeUInt16LE(32, 6); // Bits per pixel (32-bit RGBA)
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset of image data from beginning of ICO
    directoryEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...images.map((img) => img.buffer)]);
}

async function main() {
  console.log("Generating favicons and touch icons...");

  // 1. Build multi-size favicon.ico (16, 32, 48)
  const icoBuffer = await buildIco([16, 32, 48], svgPath);
  fs.writeFileSync(path.join(rootDir, "public", "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(rootDir, "src", "app", "favicon.ico"), icoBuffer);
  console.log("✓ Created public/favicon.ico and src/app/favicon.ico");

  // 2. Generate standard PNG sizes
  const pngSizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "favicon.png", size: 32 },
  ];

  for (const item of pngSizes) {
    const buf = await sharp(svgPath)
      .resize(item.size, item.size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(rootDir, "public", item.name), buf);
    console.log(`✓ Created public/${item.name}`);
  }

  // 3. Apple Touch Icons in public/
  fs.copyFileSync(appleIconSrc, path.join(rootDir, "public", "apple-touch-icon.png"));
  fs.copyFileSync(appleIconSrc, path.join(rootDir, "public", "apple-touch-icon-precomposed.png"));
  console.log("✓ Created public/apple-touch-icon.png & apple-touch-icon-precomposed.png");

  // 4. SVG favicon in public/
  fs.copyFileSync(svgPath, path.join(rootDir, "public", "favicon.svg"));
  console.log("✓ Created public/favicon.svg");

  console.log("All favicon formats generated successfully!");
}

main().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
