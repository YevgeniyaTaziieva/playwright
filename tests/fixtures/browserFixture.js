const { chromium } = require('@playwright/test');

const browserFixture = async ({}, runTest) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await runTest({ page });

  await browser.close();
};

module.exports = { browserFixture };
