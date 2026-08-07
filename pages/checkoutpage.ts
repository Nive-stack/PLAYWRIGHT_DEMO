import { expect, Locator, Page } from '@playwright/test';
import testData from '../test-data/testData.json';

const { appData: APP_DATA } = testData;

export class CheckoutPage {
  readonly page: Page;
  readonly placeOrderButton: Locator;
  readonly countryDropdown: Locator;
  readonly countrySuggestion: Locator;
  readonly termsCheckbox: Locator;
  readonly proceedButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.countryDropdown = page.getByRole('combobox');
    this.countrySuggestion = page.getByText('Choose Country');
    this.termsCheckbox = page.getByRole('checkbox');
    this.proceedButton = page.getByRole('button', { name: 'Proceed' });
    this.successMessage = page.getByText('Thank you, your order has');
  }

  async proceedWithOrder() {
    await this.placeOrderButton.click();
    await this.countryDropdown.selectOption(APP_DATA.checkoutCountry);
    await this.countrySuggestion.click();
    await this.termsCheckbox.check();
    await this.proceedButton.click();
  }

  async verifyOrderPlaced() {
    await expect(this.successMessage).toContainText(APP_DATA.orderSuccessText);
  }
}
