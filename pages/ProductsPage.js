// @ts-check
import { expect } from '@playwright/test';
import { inventoryItemByName } from './inventoryItem.js';

export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.inventoryList = page.getByTestId('inventory-list');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  /**
   * @param {string} productName
   */
  async addToCart(productName) {
    const item = inventoryItemByName(this.page, productName);
    await item.getByRole('button', { name: 'Add to cart' }).click();
    await expect(item.getByRole('button', { name: 'Remove' })).toBeVisible();
  }

  /**
   * @param {string} count
   */
  async assertCartBadgeCount(count) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
