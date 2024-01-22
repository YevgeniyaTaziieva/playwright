const { test, expect } = require('@playwright/test');

test('Verify that logo is present', async ({ page }) => {
    await page.goto('https://comfy.ua/ua/');
    const isLogoVisible = await page.isVisible('.header-top__logo');
    expect(isLogoVisible).toBeTruthy();
});

test('Clear Search field Comfy', async ({ page }) => {
    await page.goto('https://comfy.ua/ua/');
    await page.click('.header-search-form__input');
    await page.type('.header-search-form__input', 'Apple Watch');
    await page.click('.header-search-form__btn--clear');
    await page.pause();
    const inputValue = await page.inputValue('.header-search-form__input');
    expect(inputValue).toBe('');
});



test('Search on Comfy', async ({ page }) => {
    await page.goto('https://comfy.ua/ua/');
    await page.click('.header-search-form__input');
    await page.type('.header-search-form__input', 'Apple Watch');
    await page.click('.icon-comfy.header-search-form__search-btn.header-search-form__search-btn--active');
    await page.pause();
    const pageTitle = await page.url();
    expect(pageTitle).toContain('https://comfy.ua/ua/search/?q=Apple+Watch');
});

