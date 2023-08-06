const puppeteer = require('puppeteer');
const path = require('path');

describe('Testing the index page', () => {
    var browser, page, baseUrl = null;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            sloMo: 180,
        });

        page = await browser.newPage();
    });

    beforeEach(async () => {
        await page.goto(path.join(__dirname, '../public/index.html'));
        baseUrl = page.url();
    });

    afterAll(async () => await browser.close());

    test('Clicking on the create-free-account link navigates to the registration page', async () => {
        await page.click('a#create-acc-link');
        const currentUrl = page.url();
        expect(currentUrl).toBe(baseUrl + '#/register');
    });

    test('Clicking on the header register link navigates to the registration page', async () => {
        await page.click('a#register-link');
        const currentUrl = page.url();
        expect(currentUrl).toBe(baseUrl + '#/register');
    });

    test('Clicking on the header login link navigates to the login page', async () => {
        await page.click('a#login-link');
        const currentUrl = page.url();
        expect(currentUrl).toBe(baseUrl + '#/login');
    });
});