import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import testData from '../test-data/testData.json';

const { siteData: SITE_DATA } = testData;

test('test', async ({ page }) => {
  const basePage = new BasePage(page);

  await basePage.goto();
  await basePage.clickBanner();
  await basePage.verifyBannerText(SITE_DATA.bannerText);
  await basePage.verifySearchBoxVisible();
  const selectedVegetable = await basePage.selectRandomVegetable();
  console.log(`Selected vegetable: ${selectedVegetable}`);
});