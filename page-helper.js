/**
 * Clear input from default contents
 */
const clearInput = async (page, selector) => {
		await page.evaluate(
			(sel) => { document.querySelector(sel).value = ''; },
			selector,
		);
  };
  
  const fillDateFrom = async (page, dateValue) => {
		const periodFromElement = '#period-from';

		await clearInput(page, periodFromElement);
		await page.type(periodFromElement, dateValue);
  };

		const fillDateTo = async (page, dateValue) => {
		const periodToElement = '#period-to';

		await clearInput(page, periodToElement);
		await page.type(periodToElement, dateValue);
  };

  /**
   *
   * @param {Page} page
   * @param {string} selector
   */
  const getElementContent = async (page, selector) => page.evaluate(
		el => el.textContent,
		await page.$(selector),
  );

  /**
   * Log in via web interface
   * @param {Page} page
   */
  const login = async (page) => {
		await page.goto('https://www.funderbeam.com/login');
		await page.waitFor(10);

		await page.type('input[name="username"]', process.env.FUNDERBEAM_USERNAME);
		await page.type('input[name="password"]', process.env.FUNDERBEAM_PASSWORD);
		await page.click('.login-box button.button-primary');
  };
  
  module.exports = {
		fillDateFrom,
		fillDateTo,
		login,
		getElementContent,
  };