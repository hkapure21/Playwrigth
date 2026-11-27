import { test, expect } from "../Fixtures/my-fixtures";

test.describe("End to End Flow", () => {

    test('Positive Case - Complete Checkout with Valid Customer', async ({
        page,
        inventoryPage,
        yourCartPage,
        checkoutPage,
        productsData,
        messagesData,
        customerMother,
    }) => {
        // Injected via fixture
        const customer = customerMother.valid();

        // Reusing authenticated session: navigate directly to inventory
        await inventoryPage.open();
        await inventoryPage.addProductToCart(productsData.sauceLabsBackpack.name);
        await inventoryPage.goToCart();
        await yourCartPage.proceedToCheckout();

        // Fill using CustomerMother object
        await checkoutPage.fillPersonalInformation(customer);
        await checkoutPage.clickContinueButton();
        await checkoutPage.clickFinishButton();

        // Verify successful checkout
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(checkoutPage.completeHeader).toHaveText(messagesData.success.checkoutCompleteHeader);
        await expect(checkoutPage.completeText).toContainText(messagesData.success.checkoutCompleteText);
    });

    test('Negative Case - Missing Postal Code using Builder Pattern', async ({
        inventoryPage,
        yourCartPage,
        checkoutPage,
        productsData,
        messagesData,
        customerBuilder,
    }) => {
        // Injected via fixture
        const customerWithoutZip = customerBuilder().withoutPostalCode().build();

        // Reusing authenticated session: navigate directly to inventory
        await inventoryPage.open();
        await inventoryPage.addProductToCart(productsData.sauceLabsBackpack.name);
        await inventoryPage.goToCart();
        await yourCartPage.proceedToCheckout();

        await checkoutPage.fillPersonalInformation(customerWithoutZip);
        await checkoutPage.clickContinueButton();

        // Assert error message
        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toHaveText(messagesData.errors.postalCodeRequired);
    });
});
