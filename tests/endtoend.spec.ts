import { test } from '@playwright/test';
import { FindVeggiesPage } from '../pages/findveggiespage';
import { CheckoutPage } from '../pages/checkoutpage';

test('adds a random product to the cart and completes checkout', async ({ page }) => {
  const homePage = new FindVeggiesPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.goto();
  await homePage.searchForVegetable('');
  const selectedProductName = await homePage.addRandomProductToCart();
  await homePage.openCart();
  await homePage.proceedToCheckout();

  const cartItem = page.locator('tr').filter({ hasText: selectedProductName.split(' - ')[0] }).first();
  await cartItem.click();
  await checkoutPage.proceedWithOrder();
  await checkoutPage.verifyOrderPlaced();
});
