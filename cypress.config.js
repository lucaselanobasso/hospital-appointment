const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "tests/cypress/reports",
    overwrite: false,
    charts: true,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "http://localhost:3001",
    specPattern: "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "tests/cypress/support/e2e.js",
    fixturesFolder: "tests/cypress/fixtures",
    screenshotsFolder: "tests/cypress/screenshots",
    downloadsFolder: "tests/cypress/downloads",
    videosFolder: "tests/cypress/videos",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
    },
  },
})
