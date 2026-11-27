import { test, expect } from '../Fixtures/my-fixtures';

// Isolate login tests by starting with empty storage state (logged out)
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Functionality', () => {

    test('Login with valid credentials', async ({ loginPage, userMother, page }) => {
        const validUser = userMother.standardUser();

        await loginPage.open();
        await loginPage.login(validUser.username, validUser.password!);
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('Login with invalid credentials displays error', async ({ loginPage, userMother, messagesData }) => {
        const invalidUser = userMother.invalidUser();

        await loginPage.open();
        await loginPage.login(invalidUser.username, invalidUser.password!);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(messagesData.errors.invalidLogin);
    });

    test('Login with locked out user displays locked out error', async ({ loginPage, userMother, messagesData }) => {
        const lockedUser = userMother.lockedOutUser();

        await loginPage.open();
        await loginPage.login(lockedUser.username, lockedUser.password!);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(messagesData.errors.lockedOut);
    });

});
