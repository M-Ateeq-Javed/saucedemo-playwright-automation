// @ts-check
import { backpack, backpackOrderSummary, customer, standardUser } from '../data/testData.js';
import { test } from '../fixtures/pages.js';

test('standard user can purchase Sauce Labs Backpack', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}, testInfo) => {
  await test.step('Login successfully', async () => {
    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password);
  });

  await test.step('Verify Products page', async () => {
    await productsPage.assertLoaded();
    await saveStepScreenshot(page, testInfo, '01-after-login');
  });

  await test.step('Add Sauce Labs Backpack to cart', async () => {
    await productsPage.addToCart(backpack.name);
    await saveStepScreenshot(page, testInfo, '02-after-add-to-cart');
  });

  await test.step('Verify cart badge count', async () => {
    await productsPage.assertCartBadgeCount(backpack.quantity);
  });

  await test.step('Open cart', async () => {
    await productsPage.openCart();
    await cartPage.assertLoaded();
  });

  await test.step('Verify product details', async () => {
    await cartPage.assertProduct(backpack);
    await saveStepScreenshot(page, testInfo, '03-cart-page');
  });

  await test.step('Checkout with customer information', async () => {
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.assertLoaded();
    await checkoutInformationPage.submit(customer);
  });

  await test.step('Complete order', async () => {
    await checkoutOverviewPage.assertLoaded();
    await checkoutOverviewPage.assertProduct(backpack);
    await checkoutOverviewPage.assertSummary(backpackOrderSummary);
    await checkoutOverviewPage.finish();
  });

  await test.step('Verify thank you message', async () => {
    await checkoutCompletePage.assertThankYou();
    await saveStepScreenshot(page, testInfo, '04-after-checkout-completion');
  });
});

/**
 * Saves a full-page screenshot into this test's Playwright output directory
 * (test-results/<test-name>/).
 *
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {string} name
 */
async function saveStepScreenshot(page, testInfo, name) {
  await page.screenshot({
    path: testInfo.outputPath(`${name}.png`),
    fullPage: true,
  });
}
