// @ts-check
import { expect } from '@playwright/test';

/**
 * Cart and inventory rows share data-test="inventory-item".
 * Match the row by its exact product name so another item cannot satisfy the check.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} name
 */
export function inventoryItemByName(page, name) {
  return page.getByTestId('inventory-item').filter({
    has: page.getByTestId('inventory-item-name').getByText(name, { exact: true }),
  });
}

/**
 * @param {import('@playwright/test').Locator} item
 * @param {{ name: string, description: string, price: string, quantity: string }} product
 */
export async function expectCartLine(item, product) {
  await expect(item.getByTestId('inventory-item-name')).toHaveText(product.name);
  await expect(item.getByTestId('inventory-item-desc')).toHaveText(product.description);
  await expect(item.getByTestId('inventory-item-price')).toHaveText(product.price);
  // Quantity is rendered in .cart_quantity and has no data-test attribute.
  await expect(item.locator('.cart_quantity')).toHaveText(product.quantity);
}
