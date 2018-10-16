require('chromedriver');
const seleniumDriver = require('selenium-webdriver');
const Promise = require('bluebird')

const driver = new seleniumDriver.Builder()
.forBrowser('chrome')
.build();

const table = [];

const tableRows = function (row, i) {
  table[i] = [];
  return row.findElements(seleniumDriver.By.tagName('td')).then(columns =>
    // for every column
    Promise.each(columns, (column, j) => columns[j].getText().then((number) => {
      table[i][j] = parseInt(number);
    })));
};

describe('Array challenge', () => {
  before(() => driver.get('http://localhost:3000'));

  after(() => {
    setTimeout(function () {
      return driver.quit();
    }, 5000);
  });

  it('Clicks button to render challenge', () => driver.findElement(seleniumDriver.By.xpath('//*[@id="home"]/div/div/button')).click());

  it('Reads the table elements', () => driver.findElements(seleniumDriver.By.tagName('tr'))
      .then(rows => Promise.each(rows, tableRows)))


  it('Prints the table', () => console.log(table));
});
