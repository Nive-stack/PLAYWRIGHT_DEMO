import { Page, expect } from '@playwright/test';
import testData from '../test-data/testData.json';

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string = testData.siteData.baseUrl;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async clickBanner() {
    // The site uses a `.brand` element for the header/logo text "GREENKART" on this example site
    await this.page.click('.brand');
  }

  async verifyBannerText(expected: string) {
    const text = await this.page.textContent('.brand');
    // Use Playwright expect to give clearer failure messages in CI
    expect(text?.trim()).toBe(expected);
  }

  async verifySearchBoxVisible() {
    // GreenKart search input has class `search-keyword` on the demo site
    const search = this.page.locator('input.search-keyword');
    await expect(search).toBeVisible();
  }

  async selectRandomVegetable(): Promise<string> {
    const products = this.page.locator('.product');
    const count = await products.count();
    if (count === 0) throw new Error('No product elements found on the page');

    const index = Math.floor(Math.random() * count);
    const product = products.nth(index);

    // Product name is contained in an `h4` inside `.product` on the demo site
    const name = (await product.locator('h4').textContent())?.trim() || '';

    // Click add to cart (button) inside the product card
    // This selector clicks the button used to add the product to cart
    await product.locator('button').first().click();

    return name;
  }
}
