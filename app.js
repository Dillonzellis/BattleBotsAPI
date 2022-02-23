const puppeteer = require("puppeteer");
const express = require("express");

const port = process.env.PORT || 4000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Web Scrape
async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://battlebots.fandom.com/wiki/Discovery_Season_6");

  // episode Titles
  const episodesTitles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("h3 > .mw-headline")).map(
      (x) => x.textContent
    );
  });

  console.log(episodesTitles);
  // const slicedTitles = episodesTitles.slice(2, 12);

  //bot match ups total
  const botMatchUps = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        " #mw-content-text > div > table:nth-child(n+37):nth-child(-n+64) a"
      )
    ).map((x) => x.textContent);
  });
  // console.log(botMatchUps);

  // vs arr
  const botMatchRows = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(n+37):nth-child(-n+64) tr"
      )
    ).map((x) => x.textContent);
  });

  // slice match up rows arr
  const size = 9;
  const arrOfRows = [];
  for (var i = 0; i <= botMatchRows.length; i += size) {
    arrOfRows.push(botMatchRows.slice(i, i + size));
  }
  console.log(arrOfRows[0][0]);
  // console.log(arrOfRows);

  // Server
  app.get("/", function (req, res) {
    res.render("home", {
      episodeTitlesRender: episodesTitles,
      matchUpsRender: arrOfRows,
    });
  });

  app.listen(port, () => {
    console.log(`Server Established and running on Port ${port}`);
  });

  await browser.close();
}

start();
