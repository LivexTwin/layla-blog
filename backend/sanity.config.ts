// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes";
import { presentationTool } from "sanity/presentation";
import { resolve } from "./sanity/lib/resolve";
import { myStructure } from "./sanity/lib/structure";
import { visionTool } from "@sanity/vision";
const { theme } = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  "https://themer.sanity.build/api/hues?preset=verdant&default=a8bdb3"
)) as { theme: import("sanity").StudioTheme };

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const previewUrl = process.env.SANITY_PREVIEW_URL ?? "";

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_PROJECT_ID or SANITY_DATASET in .env.local");
}

export default defineConfig({
  basePath: "/admin",
  projectId: projectId,
  dataset: dataset,

  name: "layla-blog",
  title: "Layla’s Blog Studio",
  theme: theme,
  plugins: [
    structureTool({ structure: myStructure }),
    presentationTool({
      resolve,
      previewUrl: previewUrl,
    }),
    visionTool({}),
  ],
  schema,
});
