import { test, expect } from '@playwright/test';
import { Page, chromium } from 'playwright';

class PageSingleton {
    private static instance: PageSingleton;
    private page: Page | null = null;

    private constructor() {}

    public static getInstance(): PageSingleton {
        if (!PageSingleton.instance) {
            PageSingleton.instance = new PageSingleton();
        }
        return PageSingleton.instance;
    }

    public async getPage(): Promise<Page> {
        if (!this.page) {
            const browser = await chromium.launch();
            const context = await browser.newContext();
            this.page = await context.newPage();
        }
        return this.page;
    }
}

test.describe('Singleton Pattern for Playwright Page Instance', () => {
    let pageSingleton: PageSingleton;

    test.beforeAll(async () => {
        pageSingleton = PageSingleton.getInstance();
    });

    test('Page instance should be created only once', async ({}) => {
        const page1 = await pageSingleton.getPage();
        const page2 = await pageSingleton.getPage();
        expect(page1).toBe(page2);
    });

    test('Test', async ({}) => {
        const page = await pageSingleton.getPage();
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example Domain');
    });

    test.afterAll(async () => {
        const page = await pageSingleton.getPage();
        await page.close();
    });
});
