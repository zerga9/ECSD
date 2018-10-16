require('chromedriver');
const seleniumDriver = require('selenium-webdriver');

const driver = new seleniumDriver.Builder()
.forBrowser('chrome')
.build();


describe('Array challenge', () => {
  before(() => driver.get('http://localhost:3000'));

  after(() => {
    setTimeout(function () {
      return driver.quit();
    }, 5000);
  });

  it('Clicks button to render challenge', () => driver.findElement(seleniumDriver.By.xpath('//*[@id="home"]/div/div/button')).click());
})
