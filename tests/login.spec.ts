import { test, expect } from '../Fixtures/my-fixtures';
test.describe('Login Functionality', () => {

    test('Login with valid credentials', async ({ loginPage, page }) => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page).toHaveTitle("Swag Labs");
    });

    test('Login with Invalid credentials', async ({ loginPage, page }) => {
        await loginPage.open();
        await loginPage.login('abc', 'abc');
        await expect(page.getByText('Username and password do not match any user in this service')).toBeVisible();
    });


});