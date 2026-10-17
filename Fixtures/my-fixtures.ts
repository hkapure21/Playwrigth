import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';

// Declare types for custom fixtures
type MyFixtures = {
    loginPage: LoginPage;
};

// Extend the base test with custom page fixtures
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page))
});

// Re-export expect so test files only need to import from this fixture file
export { expect } from '@playwright/test';
