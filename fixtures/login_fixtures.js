import { chromium } from '@playwright/test';
import { loginPage } from '../page_objects/login_page';

export const loginFixture = async ({ email, pass, result, locator }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(loginPage.url);
    await page.fill(loginPage.emailInput, email);
    await page.fill(loginPage.passwordInput, pass);
    await page.click(loginPage.submitButton);
    await page.waitForSelector(loginPage.validationLocator[locator]);

    const validationMessage = await page.textContent(loginPage.validationLocator[locator]);
    console.log(`Result for ${email}: ${validationMessage.trim() === result ? 'Pass' : 'Fail'}`);

    await browser.close();
};
