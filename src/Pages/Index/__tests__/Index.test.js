const puppeteer = require('puppeteer');

describe('Testing the index page', () => {

    var browser, page;
    const baseUrl = 'http://localhost:3000';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
        });

        page = await browser.newPage();
        
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.goto(baseUrl);
    });

    test('Clicking on the create-free-acc button opens the register page', async () => {
        await page.click('a#create-acc-link');
        const expectedUrl = baseUrl + '/#/register';
        expect(page.url()).toEqual(expectedUrl);
    });

    test('Clicking on the tos-link will open the tos-page', async () => {
        await page.click('a#tos-link');
        const expectedUrl = baseUrl + '/#/tos';
        expect(page.url()).toEqual(expectedUrl);
    });
})