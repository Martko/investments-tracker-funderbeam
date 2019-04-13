const puppeteer = require('puppeteer');

/**
 * Sets up browser and does the initial configuration
 */
module.exports.setup = async () => {
  const browser = await puppeteer.launch({
    // eslint-disable-next-line eqeqeq
    headless: process.env.HEADLESS_BROWSER == 'true',
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 720 });

  return {
    browser,
    page,
  };
};