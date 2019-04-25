/**
 * @param {Page} page
 * @param {string} selector
 */
const getElementContent = async (page, selector) =>
  page.evaluate((el) => el.textContent, await page.$(selector));

/**
 * Log in via web interface
 * @param {Page} page
 */
const login = async (page) => {
  await page.goto('https://www.funderbeam.com/login');
  setTimeout(async () => {
    await page.type('input[name="username"]', process.env.FUNDERBEAM_USERNAME);
    await page.type('input[name="password"]', process.env.FUNDERBEAM_PASSWORD);
    await page.click('.login-box button.button-primary');
  }, 3000);
};

module.exports = {
  login,
  getElementContent,
};
