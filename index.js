const db = require('./db');
const pageHelper = require('./page-helper');
const browserHelper = require('./browser-helper');

const COMPANY_ACCOUNT_SELECTOR =
  'body > div.modal.modal-list > div > div > div.modal-body.cards.text-left > div:nth-child(4)';
const TOTAL_PORTFOLIO_VALUE_SELECTOR =
  '#js-main-view > section > div.box-fill--gray.padding-around--m > div > div:nth-child(10)';
const LAST_PRICE_PORTFOLIO_VALUE_SELECTOR =
  '#js-main-view > section > div.box-fill--gray.padding-around--m > div > div:nth-child(12)';

const getMonetaryValue = (value) => value.replace(/EUR|,|\s/g, '');

(async () => {
  try {
    const { browser, page } = await browserHelper.setup();

    await pageHelper.login(page);
    await page.waitForSelector('.modal-dialog');
    await page.click(COMPANY_ACCOUNT_SELECTOR);
    console.log('selected compant');
    await page.waitForSelector('.assets-block');
    console.log('assets block found');
    await page.goto('https://www.funderbeam.com/portfolio');
    console.log('navigated to portfolio page');
    await page.waitForSelector(TOTAL_PORTFOLIO_VALUE_SELECTOR);

    const portfolioValue = getMonetaryValue(
      await pageHelper.getElementContent(page, TOTAL_PORTFOLIO_VALUE_SELECTOR),
    );
    const lastPricePortfolioValue = getMonetaryValue(
      await pageHelper.getElementContent(
        page,
        LAST_PRICE_PORTFOLIO_VALUE_SELECTOR,
      ),
    );
    await browser.close();

    console.log(JSON.stringify({
      value: lastPricePortfolioValue,
      initial_investment: portfolioValue,
      profit: lastPricePortfolioValue - portfolioValue,
    }));

    const connection = await db.getConnection();
    await db.insertPortfolioValue(connection, {
      value: lastPricePortfolioValue,
      initial_investment: portfolioValue,
      profit: lastPricePortfolioValue - portfolioValue,
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
