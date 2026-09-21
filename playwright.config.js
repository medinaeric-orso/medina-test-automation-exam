const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 2,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on',
  },
  projects: [
    {
      name: 'web',
      testDir: './web/tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.cheapflights.com.au',
        headless: true,
      },
    },
    {
      name: 'api',
      testDir: './api/tests',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },
  ],
});
