import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';
import testData from '../test-data/testData.json';

const { appData: APP_DATA } = testData;

export class FindVeggiesPage extends BasePage {
  readonly searchButton: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly checkoutButton: Locator;
  readonly cartItemsSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.searchButton = page.getByRole('button').filter({ hasText: /^$/ });
    this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.checkoutButton = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
    this.cartItemsSummary = page.locator('div').filter({ hasText: /^Items:1Price:164$/ });
  }

  async searchForVegetable(vegetable: string) {
    await this.searchBox.fill(vegetable);
    await this.searchButton.click();
  }

  async addRandomProductToCart() {
    const products = this.page.locator('div.product');
    const count = await products.count();

    if (count === 0) {
      throw new Error('No products are visible to add to the cart');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const selectedProduct = products.nth(randomIndex);
    const productName = (await selectedProduct.textContent()) ?? 'Unknown product';

    await selectedProduct.getByRole('button', { name: 'ADD TO CART' }).click();
    return productName;
  }

  async openCart() {
    await this.cartLink.click();
  }

  async verifyCartSummary(items: string, price: string) {
    const summary = this.page.locator('div').filter({ hasText: new RegExp(`^${APP_DATA.cartSummaryText(items, price)}$`) });
    await expect(summary).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
