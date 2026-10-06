import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const here = dirname(fileURLToPath(import.meta.url));
const [serifItalic, sansBold, sansMedium, avatarBytes] = await Promise.all([
  readFile(join(here, "fonts/InstrumentSerif-Italic.ttf")),
  readFile(join(here, "fonts/DMSans-Bold.ttf")),
  readFile(join(here, "fonts/DMSans-Medium.ttf")),
  readFile(join(here, "../src/assets/avatar.jpg")),
]);
const avatarDataUrl = `data:image/jpeg;base64,${avatarBytes.toString("base64")}`;
const PAPER = "#f7f5ee";
const INK = "#242824";
const MUTED = "#61635a";
const BLUE = "#2955da";
const el = (type, props) => ({ type, props });

const tree = el("div", {
  style: {
    width: "1200px",
    height: "630px",
    background: PAPER,
    color: INK,
    fontFamily: "DM Sans",
    display: "flex",
    flexDirection: "column",
    padding: "48px 64px",
    position: "relative",
    overflow: "hidden",
  },
  children: [
    el("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #deded2",
        paddingBottom: "20px",
        fontSize: "20px",
      },
      children: [
        el("span", { style: { fontWeight: 700 }, children: "akshit.io" }),
        el("span", {
          style: { color: MUTED, fontSize: "15px", letterSpacing: "2px" },
          children: "A SMALL SOFTWARE WORKSHOP",
        }),
      ],
    }),
    el("div", {
      style: { display: "flex", flex: 1, alignItems: "center", gap: "54px" },
      children: [
        el("div", {
          style: { display: "flex", flexDirection: "column", flex: 1 },
          children: [
            el("div", {
              style: {
                fontSize: "88px",
                fontWeight: 700,
                letterSpacing: "-5px",
                lineHeight: 1.02,
              },
              children: "Akshit Kr Nagpal.",
            }),
            el("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                fontFamily: "Instrument Serif",
                fontStyle: "italic",
                color: BLUE,
                fontSize: "61px",
                lineHeight: 1.1,
                marginTop: "20px",
              },
              children: [
                el("div", { children: "Engineer by trade." }),
                el("div", { children: "Builder by nature." }),
              ],
            }),
            el("div", {
              style: {
                color: MUTED,
                fontSize: "22px",
                lineHeight: 1.5,
                marginTop: "26px",
                maxWidth: "630px",
              },
              children:
                "Senior full-stack engineer, now building AI agents, evals, and developer tools.",
            }),
          ],
        }),
        el("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "280px",
            padding: "12px",
            background: "#fffef8",
            border: "1px solid #deded2",
            boxShadow: "6px 6px 0 #deded2",
            transform: "rotate(-6deg)",
          },
          children: [
            el("div", {
              style: {
                position: "absolute",
                top: "-15px",
                left: "96px",
                width: "80px",
                height: "30px",
                background: "#f6d975",
                opacity: 0.8,
                transform: "rotate(4deg)",
              },
            }),
            el("img", {
              src: avatarDataUrl,
              width: 254,
              height: 254,
              style: { objectFit: "cover" },
            }),
            el("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                fontFamily: "Instrument Serif",
                fontStyle: "italic",
                fontSize: "28px",
                paddingTop: "13px",
                paddingBottom: "4px",
              },
              children: "Hi, I'm the human",
            }),
          ],
        }),
      ],
    }),
    el("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        color: MUTED,
        fontSize: "17px",
        borderTop: "1px solid #deded2",
        paddingTop: "20px",
      },
      children: [
        el("span", { style: { color: BLUE, fontSize: "22px" }, children: "+" }),
        el("span", { children: "Small tools. Big rabbit holes." }),
      ],
    }),
  ],
});

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Instrument Serif",
      data: serifItalic,
      weight: 400,
      style: "italic",
    },
    { name: "DM Sans", data: sansBold, weight: 700, style: "normal" },
    { name: "DM Sans", data: sansMedium, weight: 500, style: "normal" },
  ],
});
const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
  .render()
  .asPng();
const outPath = join(here, "../public/og.png");
await writeFile(outPath, png);
console.log(`wrote ${outPath} (${png.length} bytes)`);
