import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class InventoryPage extends BasePage {
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryItems = page.locator('.inventory_item');
    }

    /**
     * Navigate directly to the inventory page (requires authenticated session)
     */
    async open() {
        await this.navigate('/inventory.html');
    }

    /**
     * Get locator for a specific product card by its name
     */
    getProduct(productName: string): Locator {
        return this.page.locator('.inventory_item', { hasText: productName });
    }

    /**
     * Get 'Add to cart' button locator for a specific product
     */
    getAddToCartButton(productName: string): Locator {
        return this.getProduct(productName).getByRole('button', { name: 'Add to cart' });
    }

    /**
     * Add a product to the cart by its name
     */
    async addProductToCart(productName: string) {
        await this.getAddToCartButton(productName).click();
    }
}