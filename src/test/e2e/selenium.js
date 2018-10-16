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

const findIndex = (array) => {
    let rightSum = array.reduce((acc, val) => acc + val, 0), leftSum = 0;

    for (let i = 0; i < array.length; i++) {
        rightSum -= array[i];
        // return first found
        if (rightSum === leftSum) return i;

        leftSum += array[i];
    }

    return null;
}

const answers = function (row, i) {
  const answer = findIndex(row);
  console.log(`row ${i + 1}: ${answer}`);
  return driver.findElements(seleniumDriver.By.tagName('input')).then((inputFields) => {
    inputFields[i].sendKeys(answer);
  });
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

  it('Gives index sum array left equal to sum array right', () =>  Promise.each(table, answers))


});
