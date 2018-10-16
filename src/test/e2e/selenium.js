require('chromedriver');
const seleniumDriver = require('selenium-webdriver');

const driver = new seleniumDriver.Builder()
.forBrowser('chrome')
.build();
