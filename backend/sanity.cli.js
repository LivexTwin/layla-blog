import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "aahhyxfc", // replace with your real project ID
    dataset: "production", // or 'staging', CLI ignores .env here
  },
});
