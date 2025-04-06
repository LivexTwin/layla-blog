// cypress.config.js
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false, // Disable the default support file
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "http://localhost:4321", // Set the base URL for your local environment
  },
});
