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
  // Old project pages were merged into the homepage. 301 them so
  // existing backlinks keep working.
  redirects: {
    "/indie": "/#projects",
    "/open-source": "/#projects",
    "/projects": "/#projects",
  },
  integrations: [sitemap()],
});
