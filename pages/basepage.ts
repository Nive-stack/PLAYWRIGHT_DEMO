import { Page, expect, Locator } from '@playwright/test';
import testData from '../test-data/testData.json';

const { siteData: SITE_DATA } = testData;

export class BasePage {
  readonly page: Page;
  readonly banner: Locator;
  readonly searchBox: Locator;
  readonly vegetableCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.banner = page.getByRole('banner');
    this.searchBox = page.getByRole('searchbox', { name: 'Search for Vegetables and' });
    this.vegetableCard = page.locator('div.product');
  }

  async goto() {
    await this.page.goto(SITE_DATA.baseUrl);
  }

  async clickBanner() {
    await this.banner.click();
  }

  async verifyBannerText(expectedText: string) {
    await expect(this.banner).toContainText(expectedText);
  }

  async verifySearchBoxVisible() {
    await expect(this.searchBox).toBeVisible();
  }

   async selectRandomVegetable(): Promise<string | null> {
    const count = await this.vegetableCard.count();
    if (count === 0) {
      throw new Error('No vegetables found on the page');
    }
      const randomIndex = Math.floor(Math.random() * count);
      const randomVegetable = this.vegetableCard.nth(randomIndex);

    await randomVegetable.click();
    return await randomVegetable.textContent();
  }

}

