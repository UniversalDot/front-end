import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "zo1vt2",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      baseUrl: 'http://localhost:3000'
    },
  },
});
