const db = require('./db');
const pageHelper = require('./page-helper');
const browserHelper = require('./browser-helper');

const COMPANY_ACCOUNT_SELECTOR = 'body > div.modal.modal-list > div > div > div.modal-body.cards.text-left > div:nth-child(4)';
const TOTAL_PORTFOLIO_VALUE_SELECTOR = 'div.wallet-table__row div.text--semibold.flex-justify--end';
const LAST_PRICE_PORTFOLIO_VALUE_SELECTOR = '#js-main-view > div:nth-child(6) > section > div > div.wallet-table.width-1 > div.wallet-table__row.padding-top--xxl.hidden-xs.hidden-sm.grid-align-items--end > div.wallet-table__col.grid__col-4-6.text--semibold.flex-justify--end';

const getMonetaryValue = value => value.replace(/EUR|\,|\s/g, '');

(async () => {
  const { browser, page } = await browserHelper.setup();

  await pageHelper.login(page);
  await page.waitForSelector('.modal-dialog');
  await page.click(COMPANY_ACCOUNT_SELECTOR);
  await page.waitForSelector('.wallet--assets');

  const portfolioValue = getMonetaryValue(
    await pageHelper.getElementContent(page, TOTAL_PORTFOLIO_VALUE_SELECTOR)
  );
  const lastPricePortfolioValue = getMonetaryValue(
    await pageHelper.getElementContent(page, LAST_PRICE_PORTFOLIO_VALUE_SELECTOR)
  );
  await browser.close();

  const connection = await db.getConnection();
  await db.insertPortfolioValue(connection, {
    value: lastPricePortfolioValue,
    initial_investment: portfolioValue
  });
  process.exit(0);
})();