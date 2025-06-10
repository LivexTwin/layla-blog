// @ts-check
import { defineConfig } from "astro/config";
import path from "path";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";
import netlify from "@astrojs/netlify";

import { loadEnv } from "vite";
import sitemap from "@astrojs/sitemap";
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: import.meta.env.PUBLIC_USE_CDN === "true",
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: "/admin",
      stega: {
        studioUrl: "/admin",
      },
    }),
    react(),
    pagefind(),
    sitemap(),
  ],

  // output: "static",
  adapter: netlify(),
  experimental: {
    session: true, // Enable sessions explicitly
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      host: true, // allow external access (e.g. via ngrok or local IP)
      strictPort: false,
      port: 4321, // optional: make sure the dev server sticks to this port
      allowedHosts: ["funny-plums-slide.loca.lt"],
    },
  },
  site: "https://healingwithlayla.com",
});
