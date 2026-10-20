import { type Page, type Locator } from "@playwright/test"
import { BasePage } from "./basePage"

export class YourCartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    // Retained for backward compatibility
    async ProceedToCheckout() {
        await this.proceedToCheckout();
    }
}