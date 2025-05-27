// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { presentationTool } from "sanity/presentation";
import { resolve } from "./src/sanity/lib/resolve";
import { myStructure } from "./src/sanity/lib/structure";
import { visionTool } from "@sanity/vision";
import { laylaDarkTheme } from "./src/sanity/theme";

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  name: "layla-blog",
  title: "Layla’s Blog Studio",
  theme: laylaDarkTheme,
  plugins: [
    structureTool({ structure: myStructure }),
    presentationTool({
      resolve,
      previewUrl: location.origin,
    }),
    visionTool({}),
  ],
  schema,
});
