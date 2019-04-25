require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');


let secdata = require('./secure_data.json');

describe('My Tests', function () {
    let driver;
    
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // close the browser after running tests
    afterEach(() => driver && driver.quit());

    it('Login on Facebook', async function() {
        let username = secdata['creds']['facebook']['username'];
        let password = secdata['creds']['facebook']['password'];

        // Load the page
        await driver.get('https://fb.com/');

        // Find the username box by id
        await driver.findElement(By.id('email')).click();
        // Enter keywords
        await driver.findElement(By.id('email')).sendKeys(username);

        // Find the password box by id
        await driver.findElement(By.id('pass')).click();
        // Enter keywords and click enter
        await driver.findElement(By.id('pass')).sendKeys(password, Key.RETURN);

        // Wait for the results box by id
        await driver.wait(until.elementLocated(By.id('u_0_1f')), 10000);
        // We will get the title value and test it
        let title = await driver.getTitle();
        console.log(title);
        assert.equal(title.includes('Facebook'), true);
    });

    it('Login on gmail', async function() {
        let username = secdata['creds']['gmail']['username'];
        let password = secdata['creds']['gmail']['password'];
        
        // Load the page
        await driver.get('https://gmail.com/');

        // Find the username box by id
        await driver.findElement(By.linkText('Sign in')).click();

        // Find the username box by id
        await driver.findElement(By.id('identifierId')).click();
        // Enter keywords
        await driver.findElement(By.id('identifierId')).sendKeys(username, Key.RETURN);

        // Find the password box by id
        await driver.findElement(By.name('password')).click();
        // Enter keywords and click enter
        await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);

        // Wait for the results box by id
        await driver.wait(until.elementLocated(By.name('q')), 10000);
        // We will get the title value and test it
        let title = await driver.getTitle();
        console.log(title);
        assert.equal(title.includes('Inbox'), true);
    });
    
})