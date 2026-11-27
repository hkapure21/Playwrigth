import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';
import { InventoryPage } from '../POM/inventoryPage';
import { YourCartPage } from '../POM/yourCartPage';
import { CheckoutPage } from '../POM/checkoutPage';
import { ConfigManager, AppConfig } from '../config/ConfigManager';
import { testUsers } from '../test-data/users.data';
import { productsData } from '../test-data/products.data';
import { messagesData } from '../test-data/messages.data';
import { checkoutData, checkoutValidationCases } from '../test-data/checkout.data';
import { CustomerMother } from '../test-data/mothers/CustomerMother';
import { UserMother } from '../test-data/mothers/UserMother';
import { CustomerBuilder } from '../test-data/builders/CustomerBuilder';
import { UserBuilder } from '../test-data/builders/UserBuilder';

// Declare types for custom fixtures
type MyFixtures = {
    // Page Objects
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    yourCartPage: YourCartPage;
    checkoutPage: CheckoutPage;

    // Singleton Configuration
    appConfig: Readonly<AppConfig>;

    // Object Mothers (reusable archetypes)
    customerMother: typeof CustomerMother;
    userMother: typeof UserMother;

    // Builders (fluent factory instances)
    customerBuilder: () => CustomerBuilder;
    userBuilder: () => UserBuilder;

    // Test Datasets
    usersData: typeof testUsers;
    productsData: typeof productsData;
    messagesData: typeof messagesData;
    checkoutData: typeof checkoutData;
    checkoutValidationCases: typeof checkoutValidationCases;
};

// Extend the base test with custom page fixtures, config, mothers, and builders
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
    yourCartPage: async ({ page }, use) => use(new YourCartPage(page)),
    checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

    appConfig: async ({ }, use) => use(ConfigManager.getInstance().config),

    customerMother: async ({ }, use) => use(CustomerMother),
    userMother: async ({ }, use) => use(UserMother),

    customerBuilder: async ({ }, use) => use(() => new CustomerBuilder()),
    userBuilder: async ({ }, use) => use(() => new UserBuilder()),

    usersData: async ({ }, use) => use(testUsers),
    productsData: async ({ }, use) => use(productsData),
    messagesData: async ({ }, use) => use(messagesData),
    checkoutData: async ({ }, use) => use(checkoutData),
    checkoutValidationCases: async ({ }, use) => use(checkoutValidationCases),
});

// Re-export expect and test datasets so test files only need to import from this single fixture file
export { expect } from '@playwright/test';
export { checkoutValidationCases, checkoutData } from '../test-data/checkout.data';
export { testUsers } from '../test-data/users.data';
export { productsData } from '../test-data/products.data';
export { messagesData } from '../test-data/messages.data';
