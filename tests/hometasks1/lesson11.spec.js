const { test } = require('@playwright/test');
const { browserFixture } = require('../fixtures/browserFixture');
const { LoginPage } = require('../pageObjects/loginPage');

const loginData = [
  {
    email: 'studigradilyagmail.com',
    pass: '1w24r231jr',
    result: 'Invalid email address',
    locator: 'li.validation-messages__item.ng-star-inserted',
  },
  {
    email: 'studigradilya@gmail.com',
    pass: '1w24r231jr',
    result: 'Incorrect email or password',
    locator: 'p.page-login__actions-validation.ng-star-inserted',
  },
];

for (const data of loginData) {
  test(`Login Test - ${data.email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(data.email, data.pass);
    const validationMessage = await loginPage.waitForValidationMessage(data.locator);

    console.log(`Result for ${data.email}: ${validationMessage.trim() === data.result ? 'Pass' : 'Fail'}`);
  }).use(browserFixture);
}
