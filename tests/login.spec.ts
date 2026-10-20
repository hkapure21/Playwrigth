import { test, expect } from '../Fixtures/my-fixtures';


test.describe('Login Functionality', () => {

    test('Login with valid credentials', async ({ loginPage, page }) => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page).toHaveTitle("Swag Labs");
    });

    test('Login with Invalid credentials', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login('abc', 'abc');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });


});