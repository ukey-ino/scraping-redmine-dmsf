const puppeteer = require('puppeteer');
const config = require('config');
const baseUrl = config.get('baseUrl');
const project = config.get('project');
const username = config.get('username');
const passwd = config.get('passwd');

let filesSelector = '.display > tbody > tr > .dmsf_title > a';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(baseUrl + '/login');
  await sleep(1000);
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', passwd);
  await page.click('input[type="submit"]');
  await page.goto(baseUrl + '/projects/' + project + '/dmsf');
  await sleep(1000);

  await getFileTree(page, '/');

  await browser.close();
})();

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
};

async function getFileTree(page, parentDir) {
  let files = await page.$$(filesSelector);
  let items = [];
  for (let i = 0; i < files.length; i++) {
    let item = {
      href: await (await files[i].getProperty('href')).jsonValue(),
      textContent: await (await files[i].getProperty('textContent')).jsonValue(),
      className: await (await files[i].getProperty('className')).jsonValue()
    };
    items.push(item);
  }

  for (let i = 0; i < items.length; i++) {
    let itemName = parentDir + items[i].textContent;
    let href = items[i].href;
    console.log(itemName + '\t' + href);
    if (items[i].className.indexOf('icon-folder') > 0) {
      await page.goto(href);
      await sleep(1000);
      await getFileTree(page, itemName + '/')
    }
  }
}