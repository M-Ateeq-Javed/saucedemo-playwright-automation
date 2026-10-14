// @ts-check
import { expect } from '@playwright/test';
import { expectCartLine, inventoryItemByName } from './inventoryItem.js';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title).toHaveText('Your Cart');
  }

  /**
   * @param {{ name: string, description: string, price: string, quantity: string }} product
   */
  async assertProduct(product) {
    await expect(this.page.getByTestId('inventory-item')).toHaveCount(1);
    await expectCartLine(inventoryItemByName(this.page, product.name), product);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
