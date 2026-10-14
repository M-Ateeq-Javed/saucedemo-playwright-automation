// @ts-check

/** Public SauceDemo demo account supplied for this suite. */
export const standardUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

/**
 * The purchase flow does not name a customer.
 * SauceDemo accepts any non-empty checkout fields, so these stand-ins are used.
 */
export const customer = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

export const backpack = {
  name: 'Sauce Labs Backpack',
  description:
    'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
  price: '$29.99',
  quantity: '1',
};

/**
 * Overview amounts for one backpack.
 * SauceDemo tax is 8% rounded to cents: 29.99 * 0.08 = 2.40.
 */
export const backpackOrderSummary = {
  itemTotal: 'Item total: $29.99',
  tax: 'Tax: $2.40',
  total: 'Total: $32.39',
};
