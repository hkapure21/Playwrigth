import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { CustomerInfo } from "../types/testData";

export class CheckoutPage extends BasePage {
    readonly continueButton: Locator;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly postalCodeTextbox: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameTextbox = page.getByPlaceholder('First Name');
        this.lastNameTextbox = page.getByPlaceholder('Last Name');
        this.postalCodeTextbox = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.errorMessage = page.locator('[data-test="error"]');
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

    /**
     * Fills personal information. Accepts either a CustomerInfo object or individual strings.
     */
    async fillPersonalInformation(infoOrFirstName: CustomerInfo | string, lastName?: string, postalCode?: string) {
        if (typeof infoOrFirstName === 'object') {
            await this.firstNameTextbox.fill(infoOrFirstName.firstName);
            await this.lastNameTextbox.fill(infoOrFirstName.lastName);
            await this.postalCodeTextbox.fill(infoOrFirstName.postalCode);
        } else {
            await this.firstNameTextbox.fill(infoOrFirstName);
            if (lastName !== undefined) await this.lastNameTextbox.fill(lastName);
            if (postalCode !== undefined) await this.postalCodeTextbox.fill(postalCode);
        }
    }
}
