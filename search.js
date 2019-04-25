require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('My Tests', function () {
    let driver;
    
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // close the browser after running tests
    afterEach(() => driver && driver.quit());


    // Next, we will write steps for our test. 
    // For the element ID, you can find it by open the browser inspect feature.
    it('Search on Google', async function() {
        // Load the page
        await driver.get('https://google.com');
        // Find the search box by id
        await driver.findElement(By.name('q')).click();
        // Enter keywords and click enter
        await driver.findElement(By.name('q')).sendKeys('dalenguyen', Key.RETURN);
        // Wait for the results box by id
        await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
        // We will get the title value and test it
        let title = await driver.getTitle();
        assert.equal(title, 'dalenguyen - Google Search');
    });

    it('Search on Yandex', async function() {
        // Load the page
        await driver.get('https://yandex.com/');
        // Find the search box by id
        await driver.findElement(By.id('text')).click();
        // Enter keywords and click enter
        await driver.findElement(By.id('text')).sendKeys('dalenguyen', Key.RETURN);
        // Wait for the results box by id
        await driver.wait(until.elementLocated(By.id('main-search-suggest')), 10000);
        // We will get the title value and test it
        let title = await driver.getTitle();
        console.log(title);
        assert.equal(title.includes('dalenguyen — Yandex:'), true);
    });    
})