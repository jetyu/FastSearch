const { defineConfig } = require('@playwright/test')
module.exports = defineConfig({
  testDir: './tests/browser', workers: 1,
  use: { headless: true, viewport: { width: 1280, height: 900 }, screenshot: 'only-on-failure' }
})
