const puppeteer = require('puppeteer');

describe('Testing the index page', () => {

    var browser, page;
    const baseUrl = 'http://localhost:3000';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            sloMo: 20,
        });

        page = await browser.newPage();
    });

    beforeEach(async () => {
        await page.goto(baseUrl);
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Clicking on the create-free-acc button opens the register page', async () => {
        await page.click('a#create-acc-link');
        const expectedUrl = baseUrl + '/#/register';
        expect(page.url()).toEqual(expectedUrl);
    });

    test('Clicking on the header register link will open the register page', async () => {
        await page.click('a#register-link');
        const expectedUrl = baseUrl + '/#/register';
        expect(page.url()).toEqual(expectedUrl);
    });

    test('Clicking on the header login link opens the login page', async () => {
        await page.click('a#login-link');
        const expectedUrl = baseUrl + '/#/login';
        expect(page.url()).toEqual(expectedUrl);
    });

    test('Clicking on the tos-link will open the tos-page', async () => {
        await page.click('a#tos-link');
        const expectedUrl = baseUrl + '/#/tos';
        expect(page.url()).toEqual(expectedUrl);
    });

    test('Contact form submission', async () => {
        await page.type('input#contact-name-input', 'Jens');
        await page.type('input#contact-email-input', 'jens.osterberg@gmail.com');
        await page.type('textarea#contact-message-input', 'Mikää saaatanan huijjaussivusto tämääki ny o!?!?');
    })
})