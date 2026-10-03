import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";
import sharp from "sharp";

export async function fetchProjectPreview(url, outputPath, timeoutMs = 15_000) {
  const signal = AbortSignal.timeout(timeoutMs);
  const page = await fetch(url, { signal, cache: "no-store" });
  if (!page.ok) throw new Error(`Product page returned HTTP ${page.status}`);

  const html = parse(await page.text());
  const image = html.querySelector('meta[property="og:image"]')?.getAttribute("content")?.trim();
  if (!image) throw new Error("Product page has no og:image");

  const base = html.querySelector("base[href]")?.getAttribute("href");
  const imageUrl = new URL(image, base ? new URL(base, page.url) : page.url);
  const response = await fetch(imageUrl, { signal, cache: "no-store" });
  if (!response.ok) throw new Error(`OG image returned HTTP ${response.status}`);

  // Decode before replacing the saved image so invalid responses cannot break Astro.
  const png = await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .png()
    .toBuffer();

  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp`;
  try {
    await writeFile(temporaryPath, png);
    await rename(temporaryPath, outputPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
  return imageUrl.href;
}

async function refreshProjectPreviews() {
  const urls = JSON.parse(await readFile(new URL("../src/data/project-urls.json", import.meta.url), "utf8"));
  await Promise.all(Object.entries(urls).map(async ([slug, url]) => {
    const outputPath = fileURLToPath(new URL(`../src/assets/projects/generated/${slug}.png`, import.meta.url));
    try {
      const imageUrl = await fetchProjectPreview(url, outputPath);
      console.log(`[previews] ${slug}: refreshed from ${imageUrl}`);
    } catch (error) {
      console.warn(`[previews] ${slug}: ${error.message}. Using the saved preview.`);
    }
  }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await refreshProjectPreviews();
}
