import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';
import { InventoryPage } from '../POM/inventoryPage';
import { YourCartPage } from '../POM/yourCartPage';
import { CheckoutPage } from '../POM/checkoutPage';
// Declare types for custom fixtures
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    yourCartPage: YourCartPage;
    checkoutPage: CheckoutPage;
};

// Extend the base test with custom page fixtures
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
    yourCartPage: async ({ page }, use) => use(new YourCartPage(page)),
    checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

// Re-export expect so test files only need to import from this fixture file
export { expect } from '@playwright/test';
