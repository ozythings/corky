const puppeteer = require("puppeteer");
require("dotenv").config();
const readline = require("readline");

const timeout = 30000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let timeoutClose;

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: ["--window-size=1600,800"]
  });

  try {
    const usrname = process.env.usrname;
    const password = process.env.password;

    const page = await browser.newPage();

    await page.setViewport({
      width: 1600,
      height: 800,
      deviceScaleFactor: 1,
    });

    await page.goto("https://obs.amasya.edu.tr/oibs/std/login.aspx", { waitUntil: "networkidle2" });

    const captcha = await page.$("#imgCaptchaImg");

    await page.$eval("#imgCaptchaImg", (el) => {
      el.style.width = "300px";
      el.style.height = "100px";
    });

    const captchaPath = "captcha.png";
    await captcha.screenshot({ path: captchaPath });

    // Lens is an ES module thus the dynamic import
    const Lens = await import('chrome-lens-ocr');
    const lens = new Lens.default();

    const sum = await new Promise((resolve, reject) => {
      lens.scanByFile(captchaPath)
        .then((result) => {
          const text = result.segments[0].text;
          console.log(text);
          const regex = /(\d+)\+(\d+)\=?/;
          const match = text.match(regex);

          if (match) {
            const num1 = parseInt(match[1]);
            const num2 = parseInt(match[2]);

            const sum = num1 + num2;
            console.log(`Extracted text: ${text}`);
            console.log(`Sum: ${sum}`);
            resolve(sum);
          } else {
            console.log("Text does not match the expected format.");
            reject("Text doesn't match expected format");
          }
        })
        .catch(reject);
    });

    await page.bringToFront();
    await page.waitForSelector("#txtSecCode");

    await page.$eval("#imgCaptchaImg", (el) => {
      el.style.width = "%30";
      el.style.height = "21px";
    });

    await page.type("#txtSecCode", sum.toString());
    await page.type("#txtParamT01", usrname);
    await page.type("#txtParamT02", password);

    const loginButton = await page.$("#btnLogin");
    await loginButton.click();

    await page.waitForSelector('li.nav-item a.nav-link[data-widget="pushmenu"]');

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


    timeoutClose = setTimeout(async () => {
      await browser.close();
      console.log("Browser closed after timeout.");
    }, timeout / 2);

  } catch (error) {
    console.error("Error:", error);
    await browser.close();
  }

  console.log("---- enter 0 to stop closing ----");
};

setInterval(run, timeout);

// listen for keypress to stop closing the browser
rl.on("line", (input) => {
  if (input === "0") {
    clearTimeout(timeoutClose);
    console.log("Browser will not close. Timeout cleared.");
  }
});
