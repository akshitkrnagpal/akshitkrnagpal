import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const here = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(here, "fonts");

const [serifItalic, sansBold, sansMedium] = await Promise.all([
  readFile(join(fontsDir, "InstrumentSerif-Italic.ttf")),
  readFile(join(fontsDir, "DMSans-Bold.ttf")),
  readFile(join(fontsDir, "DMSans-Medium.ttf")),
]);

const avatarBytes = await readFile(join(here, "..", "src", "assets", "site", "akshit-avatar.jpg"));
const avatarDataUrl = `data:image/jpeg;base64,${avatarBytes.toString("base64")}`;

const PAPER = "#F3EADB";
const INK = "#211B18";
const TOMATO = "#E74C2F";
const BUTTER = "#F4C95D";
const LEAF = "#315D4B";
const LILAC = "#B9A3D5";
const WHITE = "#FFFAF2";

const el = (type, props) => ({ type, props });

const tree = el("div", {
  style: {
    width: "1200px",
    height: "630px",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    background: PAPER,
    color: INK,
    fontFamily: "DM Sans",
  },
  children: [
    el("div", {
      style: {
        position: "absolute",
        top: "-170px",
        right: "-100px",
        width: "480px",
        height: "480px",
        border: `3px solid ${INK}`,
        borderRadius: "48%",
        background: BUTTER,
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        bottom: "-290px",
        left: "500px",
        width: "360px",
        height: "360px",
        borderRadius: "50%",
        background: LILAC,
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        top: "42px",
        left: "58px",
        right: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "17px",
        fontWeight: 700,
        letterSpacing: "4px",
        textTransform: "uppercase",
      },
      children: [
        el("div", {
          style: { display: "flex", alignItems: "center", gap: "13px" },
          children: [
            el("div", {
              style: {
                width: "17px",
                height: "17px",
                border: `3px solid ${INK}`,
                borderRadius: "50%",
                background: TOMATO,
              },
            }),
            el("span", { children: "Akshit / Portfolio" }),
          ],
        }),
        el("span", { children: "akshit.io" }),
      ],
    }),
    el("div", {
      style: {
        position: "absolute",
        top: "132px",
        left: "58px",
        width: "690px",
        display: "flex",
        flexDirection: "column",
      },
      children: [
        el("div", {
          style: {
            color: "#B92F1B",
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
          },
          children: "Independent builder · Software engineer",
        }),
        el("div", {
          style: {
            display: "flex",
            marginTop: "18px",
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: "142px",
            lineHeight: 0.78,
            letterSpacing: "-5px",
          },
          children: "Akshit",
        }),
        el("div", {
          style: {
            display: "flex",
            marginTop: "6px",
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: "142px",
            lineHeight: 0.78,
            letterSpacing: "-5px",
            color: TOMATO,
          },
          children: "Kr Nagpal",
        }),
        el("div", {
          style: {
            width: "540px",
            marginTop: "35px",
            color: "#685B52",
            fontSize: "23px",
            fontWeight: 500,
            lineHeight: 1.45,
          },
          children: "Building developer tools, shipping side projects, and caring deeply about clean code and great UX.",
        }),
      ],
    }),
    el("div", {
      style: {
        position: "absolute",
        top: "155px",
        right: "62px",
        width: "342px",
        height: "342px",
        border: `3px solid ${INK}`,
        borderRadius: "48% 52% 42% 58%",
        background: LEAF,
        transform: "rotate(6deg)",
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        top: "137px",
        right: "82px",
        width: "342px",
        height: "342px",
        display: "flex",
        overflow: "hidden",
        border: `3px solid ${INK}`,
        borderRadius: "52% 48% 57% 43%",
        background: WHITE,
        transform: "rotate(-3deg)",
      },
      children: el("img", {
        src: avatarDataUrl,
        width: 342,
        height: 342,
        style: {
          width: "342px",
          height: "342px",
          objectFit: "cover",
        },
      }),
    }),
    el("div", {
      style: {
        position: "absolute",
        right: "48px",
        bottom: "70px",
        width: "228px",
        display: "flex",
        flexDirection: "column",
        padding: "18px 20px",
        border: `3px solid ${INK}`,
        background: WHITE,
        boxShadow: `8px 8px 0 ${INK}`,
        transform: "rotate(4deg)",
        fontFamily: "Instrument Serif",
        fontStyle: "italic",
        fontSize: "30px",
        lineHeight: 1,
      },
      children: [
        el("div", {
          style: {
            width: "13px",
            height: "13px",
            marginBottom: "8px",
            background: TOMATO,
            transform: "rotate(45deg)",
          },
        }),
        el("span", { children: "Useful things for the internet." }),
      ],
    }),
    el("div", {
      style: {
        position: "absolute",
        left: "58px",
        bottom: "36px",
        display: "flex",
        padding: "12px 18px",
        border: `3px solid ${INK}`,
        borderRadius: "999px",
        background: LEAF,
        color: WHITE,
        fontSize: "15px",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
      },
      children: "Full-stack · Open source · Great UX",
    }),
  ],
});

const fonts = [
  { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
  { name: "DM Sans", data: sansBold, weight: 700, style: "normal" },
  { name: "DM Sans", data: sansMedium, weight: 500, style: "normal" },
];

const renderPng = async (renderTree) => {
  const svg = await satori(renderTree, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
};

const writeOg = async (filename, renderTree) => {
  const png = await renderPng(renderTree);
  const outPath = join(here, "..", "public", filename);
  await writeFile(outPath, png);
  console.log(`wrote ${outPath} (${png.length} bytes)`);
};

await writeOg("og.png", tree);

const projectsTree = el("div", {
  style: {
    width: "1200px",
    height: "630px",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    background: PAPER,
    color: INK,
    fontFamily: "DM Sans",
  },
  children: [
    el("div", {
      style: {
        position: "absolute",
        top: "-210px",
        right: "-100px",
        width: "600px",
        height: "600px",
        border: `3px solid ${INK}`,
        borderRadius: "48% 52% 58% 42%",
        background: LILAC,
        transform: "rotate(-8deg)",
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        top: "42px",
        left: "58px",
        right: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "17px",
        fontWeight: 700,
        letterSpacing: "4px",
        textTransform: "uppercase",
      },
      children: [
        el("div", {
          style: { display: "flex", alignItems: "center", gap: "13px" },
          children: [
            el("div", {
              style: {
                width: "17px",
                height: "17px",
                border: `3px solid ${INK}`,
                borderRadius: "50%",
                background: TOMATO,
              },
            }),
            el("span", { children: "Akshit / Portfolio" }),
          ],
        }),
        el("span", { children: "akshit.io/projects" }),
      ],
    }),
    el("div", {
      style: {
        position: "absolute",
        top: "145px",
        left: "58px",
        width: "700px",
        display: "flex",
        flexDirection: "column",
      },
      children: [
        el("span", {
          style: {
            color: "#B92F1B",
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
          },
          children: "Selected work / 01—09",
        }),
        el("span", {
          style: {
            marginTop: "22px",
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: "126px",
            lineHeight: 0.82,
            letterSpacing: "-4px",
          },
          children: "Things I’ve",
        }),
        el("span", {
          style: {
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: "126px",
            lineHeight: 0.82,
            letterSpacing: "-4px",
            color: TOMATO,
          },
          children: "made happen.",
        }),
        el("span", {
          style: {
            width: "610px",
            marginTop: "34px",
            color: "#685B52",
            fontSize: "23px",
            fontWeight: 500,
            lineHeight: 1.45,
          },
          children: "Maintained products, open-source tools, and focused experiments.",
        }),
      ],
    }),
    el("div", {
      style: {
        position: "absolute",
        right: "60px",
        top: "205px",
        width: "330px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transform: "rotate(3deg)",
      },
      children: ["TypesenseKit", "PromptLens", "OfferKit"].map((name, index) =>
        el("div", {
          style: {
            display: "flex",
            padding: "18px 22px",
            alignItems: "center",
            justifyContent: "space-between",
            border: `3px solid ${INK}`,
            borderRadius: "18px",
            background: index === 1 ? BUTTER : WHITE,
            boxShadow: `7px 7px 0 ${INK}`,
            fontSize: "22px",
            fontWeight: 700,
          },
          children: [el("span", { children: name }), el("span", { style: { color: "#B92F1B" }, children: `0${index + 1}` })],
        }),
      ),
    }),
    el("div", {
      style: {
        position: "absolute",
        left: "58px",
        bottom: "36px",
        display: "flex",
        padding: "12px 18px",
        border: `3px solid ${INK}`,
        borderRadius: "999px",
        background: LEAF,
        color: WHITE,
        fontSize: "15px",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
      },
      children: "Products · Open source · Experiments",
    }),
  ],
});

await writeOg("og-projects.png", projectsTree);
