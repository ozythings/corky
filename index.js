const puppeteer = require("puppeteer");

require("dotenv").config();

const run = async () => {

  const username = process.env.usrname;
  const password = process.env.password;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1600,
    height: 800,
    deviceScaleFactor: 1
  });

  await page.goto("https://obs.amasya.edu.tr/oibs/std/login.aspx", { waitUntil: "networkidle2" });

  const captcha = await page.$("#imgCaptchaImg");

  await page.$eval("#imgCaptchaImg", (el) => {
    el.style.width = "300px";
    el.style.height = "100px";
  });


  const captchaPath = "captcha.png";
  await captcha.screenshot({ path: captchaPath });

  const googlePage = await browser.newPage();
  await googlePage.goto("https://www.google.com/?olud=");

  await googlePage.waitForSelector('input[type="file"]');
  const inputUploadHandle = await googlePage.$('input[type="file"]');
  await inputUploadHandle.uploadFile(captchaPath);
  //await page.waitForSelector('button[jsname="TtaS0d"]');
  await page.keyboard.press('Enter')


  await googlePage.waitForSelector("#cwos");
  const captchaResult = await googlePage.$eval("#cwos", el => el.innerText.trim());

  await page.$eval("#imgCaptchaImg", (el) => {
    el.style.width = "%30";
    el.style.height = "21px";
  });

  await page.bringToFront();
  await page.waitForSelector("#txtSecCode");
  await page.type("#txtSecCode", captchaResult, { delay: 100 });
  await page.type("#txtParamT01", username);
  await page.type("#txtParamT02", password);

  const loginButton = await page.$("#btnLogin");
  await loginButton.click();

  await page.waitForSelector('li.nav-item a.nav-link[data-widget="pushmenu"]');

  // FIXME: hmmmmm
  await new Promise(resolve => setTimeout(resolve, 1000));

  await page.waitForSelector('a.nav-link');

  await page.evaluate(() => {
    const menuItems = document.querySelectorAll('a.nav-link p');
    menuItems.forEach(item => {
      if (item.textContent.trim() === 'Ders Kayıt') {
        item.click();
      }
    });
  });

  // after this, the page(document) returns an iframe and i haven't figured how to interact with it

}
run();
