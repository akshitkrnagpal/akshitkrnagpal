// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Use the canonical domain for sitemap and other absolute URLs
  site: "https://akshit.io",
  trailingSlash: "never",
  // /indie and /open-source were merged into /projects. 301 old
  // paths so any existing backlinks keep working.
  redirects: {
    "/indie": "/projects",
    "/open-source": "/projects",
  },
  integrations: [sitemap()],
});
