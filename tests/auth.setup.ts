import { test as setup, expect } from '../Fixtures/my-fixtures';
import path from 'path';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

setup('authenticate as standard user', async ({ loginPage, userMother, page }) => {
    const standardUser = userMother.standardUser();
    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password!);
    await expect(page).toHaveURL(/.*inventory.html/);

    // Save browser authentication state (cookies, localStorage) to file
    await page.context().storageState({ path: authFile });
});

