// @ts-check
import { expect } from '@playwright/test';
import { expectCartLine, inventoryItemByName } from './inventoryItem.js';

export class CheckoutInformationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  /**
   * @param {{ firstName: string, lastName: string, postalCode: string }} customer
   */
  async submit(customer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
    await this.continueButton.click();
  }
}

export class CheckoutOverviewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  /**
   * @param {{ name: string, description: string, price: string, quantity: string }} product
   */
  async assertProduct(product) {
    await expect(this.page.getByTestId('inventory-item')).toHaveCount(1);
    await expectCartLine(inventoryItemByName(this.page, product.name), product);
  }

  /**
   * @param {{ itemTotal: string, tax: string, total: string }} summary
   */
  async assertSummary(summary) {
    await expect(this.itemTotal).toHaveText(summary.itemTotal);
    await expect(this.tax).toHaveText(summary.tax);
    await expect(this.total).toHaveText(summary.total);
  }

  async finish() {
    await this.finishButton.click();
  }
}

export class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.completeHeader = page.getByTestId('complete-header');
  }

  async assertThankYou() {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
