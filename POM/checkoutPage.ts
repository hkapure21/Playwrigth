import { type Page, type Locator } from "@playwright/test"
import { BasePage } from "./basePage"

export class CheckoutPage extends BasePage {
    readonly continueButton: Locator;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly postalCodeTextbox: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameTextbox = page.getByPlaceholder('First Name');
        this.lastNameTextbox = page.getByPlaceholder('Last Name');
        this.postalCodeTextbox = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
    }

    // Retained for backward compatibility
    get finshButton(): Locator {
        return this.finishButton;
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async fillPersonalInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameTextbox.fill(firstName);
        await this.lastNameTextbox.fill(lastName);
        await this.postalCodeTextbox.fill(postalCode);
    }
}