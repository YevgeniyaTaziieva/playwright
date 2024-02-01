const { chromium } = require('playwright');

const loginData = [
    {
        email: "studigradilyagmail.com",
        pass: "1w24r231jr",
        result: "Invalid email address",
        locator: "li.validation-messages__item.ng-star-inserted"
    },
    {
        email: "studigradilya@gmail.com",
        pass: "1w24r231jr",
        result: "Incorrect email or password",
        locator: "p.page-login__actions-validation.ng-star-inserted"
    },
];

async function runTest(data) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://lms.ithillel.ua/');
    await page.fill('//input[@type="email"]', data.email);
    await page.fill('//input[@type="password"]', data.pass);
    await page.click('//button[@type="submit"]');
    await page.waitForSelector(data.locator);

    const validationMessage = await page.textContent(data.locator);
    console.log(`Result for ${data.email}: ${validationMessage.trim() === data.result ? 'Pass' : 'Fail'}`);

    await browser.close();
}

(async () => {
    for (const data of loginData) {
        await runTest(data);
    }
})();
