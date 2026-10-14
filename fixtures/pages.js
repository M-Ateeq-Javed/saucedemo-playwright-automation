// @ts-check
import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';
import {
  CheckoutCompletePage,
  CheckoutInformationPage,
  CheckoutOverviewPage,
} from '../pages/CheckoutPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';

/**
 * @typedef {object} PageFixtures
 * @property {LoginPage} loginPage
 * @property {ProductsPage} productsPage
 * @property {CartPage} cartPage
 * @property {CheckoutInformationPage} checkoutInformationPage
 * @property {CheckoutOverviewPage} checkoutOverviewPage
 * @property {CheckoutCompletePage} checkoutCompletePage
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & PageFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = base.extend(
  /** @type {any} */ ({
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
      await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
      await use(new CartPage(page));
    },
    checkoutInformationPage: async ({ page }, use) => {
      await use(new CheckoutInformationPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
      await use(new CheckoutOverviewPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
      await use(new CheckoutCompletePage(page));
    },
  }),
);
