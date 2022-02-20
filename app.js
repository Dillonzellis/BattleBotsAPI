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
  await fs.writeFile("test.txt", slicedTitles.join("\r\n"));

  await browser.close();
}

start();
