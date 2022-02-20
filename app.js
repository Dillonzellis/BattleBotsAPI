const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://battlebots.fandom.com/wiki/Discovery_Season_6");

  // episode Titles
  const episodesTitles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".mw-headline")).map(
      (x) => x.textContent
    );
  });
  const slicedTitles = episodesTitles.slice(2, 12);
  // await fs.writeFile("outputs.txt", slicedTitles.join("\r\n"));

  // table selector range
  // "#mw-content-text > div > table:nth-child(37) a"
  // "#mw-content-text > div > table:nth-child(n+37):nth-child(-n+55) a"

  //bot match ups
  const botMatch1 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(37) a"
      )
    ).map((x) => x.textContent);
  });

  console.log(slicedTitles[0]);
  console.log(botMatch1);

  await browser.close();
}

start();
