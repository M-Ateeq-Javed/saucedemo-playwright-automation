# SauceDemo Purchase Flow

End-to-end UI automation for the public [SauceDemo](https://www.saucedemo.com/) store. One Chromium test signs in as `standard_user`, buys the Sauce Labs Backpack, and checks the order confirmation.

## Project Overview

The suite covers the happy-path purchase a shopper completes on SauceDemo:

Login → Products page → Add Sauce Labs Backpack → Cart → Checkout → Complete order → **Thank you for your order!**

Pages, actions, and assertions live in page objects. The spec describes the business flow and does not hold locators. Checks use Playwright’s auto-waiting assertions. There is no fixed sleep.

SauceDemo exposes `data-test` attributes. Playwright is configured with `testIdAttribute: 'data-test'` so `getByTestId()` targets those hooks.

## Tech Stack

| Item | Choice |
| --- | --- |
| Language | JavaScript |
| Runtime | Node.js |
| Test runner | Playwright Test (`@playwright/test`) |
| Browser | Chromium (Desktop Chrome device) |
| Design pattern | Page Object Model |
| Reporter | HTML |

## Project Structure

```text
.
├── data/
│   └── testData.js          # user, customer, backpack, order totals
├── fixtures/
│   └── pages.js             # injects page objects into the test
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js      # information, overview, and complete screens
│   └── inventoryItem.js     # shared cart-line lookup and assertions
├── tests/
│   ├── purchase-backpack.spec.js
│   └── example.spec.js      # Playwright sample; not part of this scenario
├── playwright.config.js
└── package.json
```

## Setup Instructions

Requirements: Node.js LTS and npm.

```bash
npm ci
npx playwright install chromium
```

Credentials are the public demo account, stored in `data/testData.js`:

- Username: `standard_user`
- Password: `secret_sauce`

Checkout uses stand-in customer details (John Doe, postal code 12345). SauceDemo accepts any non-empty values.

## How to Run Tests

Purchase scenario only:

```bash
npx playwright test tests/purchase-backpack.spec.js --project=chromium
```

Every file in `tests/`:

```bash
npm test
```

Open the HTML report:

```bash
npx playwright show-report
```

After a passing purchase run, full-page screenshots are kept under `test-results/` (`preserveOutput` is `always`):

- `01-after-login.png`
- `02-after-add-to-cart.png`
- `03-cart-page.png`
- `04-after-checkout-completion.png`

A trace is collected on the first retry. Locally, retries are off. On CI, the test retries twice. The GitHub Actions workflow is `.github/workflows/playwright.yml`.

## Test Scenario Covered

`standard user can purchase Sauce Labs Backpack`

1. Open SauceDemo and log in as `standard_user`.
2. Confirm the Products page (`/inventory.html`, heading **Products**).
3. Add **Sauce Labs Backpack** and confirm the button changes to **Remove**.
4. Confirm the cart badge is **1**.
5. Open the cart and confirm one line: name, description, price **$29.99**, quantity **1**.
6. Checkout with the stand-in customer.
7. On the overview, confirm the same line, item total **$29.99**, tax **$2.40**, and total **$32.39**, then finish.
8. Confirm `/checkout-complete.html` and the exact message **Thank you for your order!**

## AI Assistance and Validation

The page objects, fixtures, test data, and spec were drafted with an AI coding assistant in Cursor, then checked against the application.

Validation performed:

- `tests/purchase-backpack.spec.js` was executed locally with Playwright on Chromium against `https://www.saucedemo.com`.
- The run passed. Assertions covered the Products page, the backpack line in the cart and on the overview, the order totals, and the completion message.
- Step screenshots are taken only after the related assertion, and they are written into the Playwright `test-results` folder.

## Limitations

- Only the `standard_user` happy path is covered. Locked-out login, invalid credentials, and empty checkout fields are not tested.
- Only Chromium is enabled. Firefox, WebKit, and mobile projects are not part of this run.
- One product is purchased. Sorting, remove-from-cart, and multi-item totals are out of scope.
- Order totals are pinned to the current catalog: backpack **$29.99**, tax **$2.40** (8%), total **$32.39**. A price change on the demo site will fail the test.
- Cart quantity has no `data-test` attribute, so that check uses `.cart_quantity` inside the matching row.
- The test calls the live public site. It is not mocked, and it needs network access.
- `npm test` also runs `tests/example.spec.js`, the Playwright starter sample against playwright.dev. Use the purchase command above to run only this scenario.
