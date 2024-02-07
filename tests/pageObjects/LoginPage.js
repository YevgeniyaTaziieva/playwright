class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('https://lms.ithillel.ua/');
  }

  async login(email, password) {
    await this.page.fill('//input[@type="email"]', email);
    await this.page.fill('//input[@type="password"]', password);
    await this.page.click('//button[@type="submit"]');
  }

  async waitForValidationMessage(locator) {
    await this.page.waitForSelector(locator);
    return await this.page.textContent(locator);
  }
}

module.exports = { LoginPage };
