import type { ImageMetadata } from "astro";
import promptlens from "../assets/projects/promptlens.png";
import offerkit from "../assets/projects/offerkit.jpg";
import prosewire from "../assets/projects/prosewire.jpg";
import hookbell from "../assets/projects/hookbell.jpg";
import edgepush from "../assets/projects/edgepush.png";
import typesensekit from "../assets/projects/typesensekit.jpg";
import projectUrls from "./project-urls.json";

const generatedPreviews = import.meta.glob<ImageMetadata>(
  "../assets/projects/generated/*.png",
  { eager: true, import: "default" },
);

function preview(slug: string, fallback: ImageMetadata): ImageMetadata {
  return generatedPreviews[`../assets/projects/generated/${slug}.png`] ?? fallback;
}

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  tag: string;
  links: Link[];
  preview?: ImageMetadata;
}

// Flagship work, shown with a preview image.
export const featured: Project[] = [
  {
    slug: "promptlens",
    name: "PromptLens",
    description: "Catch prompt and model regressions before your next release.",
    tag: "AI evals · Early access",
    preview: preview("promptlens", promptlens),
    links: [{ label: "Visit", href: projectUrls.promptlens }],
  },
  {
    slug: "offerkit",
    name: "OfferKit",
    description: "Coupons, loyalty, gift cards, and referrals for your product.",
    tag: "Commerce · Open source",
    preview: preview("offerkit", offerkit),
    links: [
      { label: "Visit", href: projectUrls.offerkit },
      { label: "GitHub", href: "https://github.com/offerkit/offerkit" },
    ],
  },
  {
    slug: "hookbell",
    name: "HookBell",
    description: "Signups, payments, and churn. Straight to your phone.",
    tag: "iOS app",
    preview: preview("hookbell", hookbell),
    links: [
      { label: "Visit", href: projectUrls.hookbell },
      { label: "App Store", href: "https://apps.apple.com/us/app/hookbell/id6760628465" },
    ],
  },
  {
    slug: "prosewire",
    name: "Prosewire",
    description: "Add a publishing workflow to the website you already have.",
    tag: "Publishing · Open source",
    preview: preview("prosewire", prosewire),
    links: [
      { label: "Visit", href: projectUrls.prosewire },
      { label: "Demo", href: "https://demo.prosewire.com" },
      { label: "GitHub", href: "https://github.com/prosewire/prosewire" },
    ],
  },
  {
    slug: "edgepush",
    name: "EdgePush",
    description: "Mobile push notifications on Cloudflare Workers, with your own credentials.",
    tag: "Infrastructure · Self-hostable",
    preview: preview("edgepush", edgepush),
    links: [
      { label: "Visit", href: projectUrls.edgepush },
      { label: "GitHub", href: "https://github.com/akshitkrnagpal/edgepush" },
    ],
  },
  {
    slug: "typesensekit",
    name: "TypesenseKit",
    description: "A CLI and MCP server for people and AI agents working with Typesense.",
    tag: "Search · CLI + MCP",
    preview: preview("typesensekit", typesensekit),
    links: [
      { label: "Docs", href: projectUrls.typesensekit },
      { label: "GitHub", href: "https://github.com/typesensekit/typesensekit" },
    ],
  },
];

export const more: Project[] = [
  {
    slug: "zuply",
    name: "Zuply",
    description: "Supplement reminders with private iCloud sync.",
    tag: "iOS",
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/zuply/id6805640899" }],
  },
  {
    slug: "fast36",
    name: "Fast36",
    description: "Fasting sessions and history across your Apple devices.",
    tag: "iOS · watchOS",
    links: [
      { label: "Visit", href: "https://fast36.app" },
      { label: "App Store", href: "https://apps.apple.com/us/app/fast36/id6758402027" },
    ],
  },
  {
    slug: "portlessbar",
    name: "PortlessBar",
    description: "Open Portless localhost apps and control its proxy from the macOS menu bar.",
    tag: "macOS · Open source",
    links: [
      { label: "Download", href: "https://github.com/akshitkrnagpal/portlessbar/releases/latest" },
      { label: "GitHub", href: "https://github.com/akshitkrnagpal/portlessbar" },
    ],
  },
  {
    slug: "nobg",
    name: "nobg",
    description: "Remove backgrounds in your browser or through a self-hostable API.",
    tag: "Image API",
    links: [
      { label: "Visit", href: "https://nobg.akshit.io" },
      { label: "GitHub", href: "https://github.com/akshitkrnagpal/nobg" },
    ],
  },
  {
    slug: "openplaceholder",
    name: "OpenPlaceholder",
    description: "Custom placeholder images for prototypes and docs.",
    tag: "Web",
    links: [
      { label: "Visit", href: "https://www.openplaceholder.com" },
      { label: "GitHub", href: "https://github.com/open-placeholder/open-placeholder" },
    ],
  },
  {
    slug: "revcat",
    name: "revcat",
    description: "Manage RevenueCat from your terminal.",
    tag: "CLI",
    links: [
      { label: "Docs", href: "https://revcat.vercel.app" },
      { label: "GitHub", href: "https://github.com/akshitkrnagpal/revcat" },
    ],
  },
  {
    slug: "namescout",
    name: "namescout",
    description: "Check names across domains, npm, and GitHub.",
    tag: "CLI",
    links: [{ label: "GitHub", href: "https://github.com/akshitkrnagpal/namescout" }],
  },
  {
    slug: "secret-desk",
    name: "secret-desk",
    description: "Edit Kubernetes secrets in your browser.",
    tag: "Web",
    links: [{ label: "GitHub", href: "https://github.com/akshitkrnagpal/secret-desk" }],
  },
  {
    slug: "env-doctor",
    name: "env-doctor",
    description: "Catch mistakes in your .env files.",
    tag: "CLI",
    links: [{ label: "GitHub", href: "https://github.com/akshitkrnagpal/env-doctor" }],
  },
];
