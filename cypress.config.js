const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    baseUrl: "http://localhost:3001",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
    },
  },
})
