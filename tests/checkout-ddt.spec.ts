import { test, expect, checkoutValidationCases } from '../Fixtures/my-fixtures';

/**
 * Data-Driven Testing (DDT): Checkout Form Validations
 *
 * - Single source of truth import: Everything comes from `my-fixtures`
 * - Retains individual test reporting for each parameter scenario
 * - Zero imports from `../test-data`
 */
test.describe('Data-Driven: Checkout Form Validations', () => {

    for (const { scenario, customer, expectedError } of checkoutValidationCases) {
        test(`Negative Validation - ${scenario}`, async ({
            inventoryPage,
            yourCartPage,
            checkoutPage,
            productsData,
        }) => {
            // 1. Navigate to inventory using pre-authenticated session
            await inventoryPage.open();
            await inventoryPage.addProductToCart(productsData.sauceLabsBackpack.name);
            await inventoryPage.goToCart();
            await yourCartPage.proceedToCheckout();

            // 2. Fill personal information with test case data
            await checkoutPage.fillPersonalInformation(customer);
            await checkoutPage.clickContinueButton();

            // 3. Verify appropriate validation error is displayed
            await expect(checkoutPage.errorMessage).toBeVisible();
            await expect(checkoutPage.errorMessage).toHaveText(expectedError);
        });
    }

});
