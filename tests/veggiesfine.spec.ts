import { test } from '@playwright/test';
import { FindVeggiesPage } from '../pages/findveggiespage';
import testData from '../test-data/testData.json';

const { appData: APP_DATA } = testData;

test('finds vegetables and adds one to the cart using a page object', async ({ page }) => {
  const findVeggiesPage = new FindVeggiesPage(page);

  await findVeggiesPage.goto();
  await findVeggiesPage.searchForVegetable(APP_DATA.defaultSearchVegetable);
  await findVeggiesPage.addFirstVegetableToCart();
  await findVeggiesPage.openCart();
  await findVeggiesPage.verifyCartSummary(APP_DATA.cartSummaryItems, APP_DATA.cartSummaryPrice);
  await findVeggiesPage.proceedToCheckout();
});
