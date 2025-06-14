// src/sanity/lib/sanityClient.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: "2024-06-01",
  useCdn: import.meta.env.PUBLIC_USE_CDN === "true",
});
