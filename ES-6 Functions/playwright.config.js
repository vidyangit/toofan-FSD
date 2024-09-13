module.exports = {
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    browserName: 'chromium',
    headless: true,
  },
};
