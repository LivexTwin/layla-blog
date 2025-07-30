// @ts-check
import { defineConfig } from "astro/config";
import path from "path";

import react from "@astrojs/react";
import pagefind from "astro-pagefind";
import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), pagefind(), sitemap()],
  prefetch: {
    prefetchAll: true,
  },

  output: "static", //
  adapter: netlify(),

  experimental: {
    session: true,
  },

  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  server: {
    allowedHosts: ["some-mangos-sip.loca.lt"],
  },
  site: "https://healingwithlayla.com",
});
