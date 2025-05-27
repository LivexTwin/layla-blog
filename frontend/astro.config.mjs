// @ts-check
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

import { loadEnv } from "vite";
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
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: "/admin",
      stega: {
        studioUrl: "/admin",
      },
    }),
    react(),
  ],
  vite: {
    server: {
      host: true, // allow external access (e.g. via ngrok or local IP)
      strictPort: false,
      port: 4321, // optional: make sure the dev server sticks to this port
      allowedHosts: ["thin-ducks-slide.loca.lt"],
    },
  },
  site: "https://healingwithlayla.com",
});
