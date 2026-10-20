import { test, expect } from "../Fixtures/my-fixtures";

test.describe("End to End Flow", () => {

    test('Positive Case - Complete Checkout', async ({ page, loginPage, inventoryPage, yourCartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await yourCartPage.proceedToCheckout();
        await checkoutPage.fillPersonalInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinueButton();
        await checkoutPage.clickFinishButton();

        // Verify successful checkout
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
        await expect(checkoutPage.completeText).toBeVisible();
    });
})