const puppeteer = require("puppeteer");
const express = require("express");
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();
const URL = (process.env.URL) // assigning the variable from the dotenv file

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Web Scrape
async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${URL}`, {waitUntil: 'load', timeout: 0}); // Now pulls from the URL dotenv variable and does not time out at 30000 ms

  // episode Titles
  const episodesTitles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("h3 > .mw-headline")).map(
      (x) => x.textContent
    );
  });

  //console.log(episodesTitles);

  // vs arr
  const botMatchRows = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "table.article-table.fandom-table td" // This pulls the correct data from the tables. Took forever to realize removing the # sign was the reason it wasn't pulling the data correctly.
      )
    ).map((x) => x.textContent.replace(/\n/g, '')) // Fixed the \n at the end
  });
  console.log(botMatchRows)

  // slice match up rows arr
  const size = 8; // Now 8 since the Youtube Bonus Battle row is avoided
  const arrOfRows = [];
  for (var i = 0; i <= botMatchRows.length - 1; i += size) { // wasn't starting at 0 the first time
    arrOfRows.push(botMatchRows.slice(i, i + size));
  }
  //console.log(arrOfRows[0][0]);
  //console.log(arrOfRows);

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
