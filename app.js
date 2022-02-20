const puppeteer = require("puppeteer");
const express = require("express");
const fs = require("fs/promises");

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
  // ep1
  const botMatch1 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(37) a"
      )
    ).map((x) => x.textContent);
  });

  // ep2
  const botMatch2 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(40) a"
      )
    ).map((x) => x.textContent);
  });

  // ep3
  const botMatch3 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(43) a"
      )
    ).map((x) => x.textContent);
  });

  // ep4
  const botMatch4 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(46) a"
      )
    ).map((x) => x.textContent);
  });

  // ep5
  const botMatch5 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(49) a"
      )
    ).map((x) => x.textContent);
  });

  // ep6
  const botMatch6 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(52) a"
      )
    ).map((x) => x.textContent);
  });

  // ep7
  const botMatch7 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(55) a"
      )
    ).map((x) => x.textContent);
  });

  // ep8
  const botMatch8 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(58) a"
      )
    ).map((x) => x.textContent);
  });

  // ep9
  const botMatch9 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(61) a"
      )
    ).map((x) => x.textContent);
  });

  // ep10
  const botMatch10 = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#mw-content-text > div > table:nth-child(64) a"
      )
    ).map((x) => x.textContent);
  });

  const logger = () => {
    //ep1
    console.log(slicedTitles[0]);
    console.log(botMatch1);

    //ep2
    console.log(slicedTitles[1]);
    console.log(botMatch2);

    //ep3
    console.log(slicedTitles[2]);
    console.log(botMatch3);

    //ep4
    console.log(slicedTitles[3]);
    console.log(botMatch4);

    //ep5
    console.log(slicedTitles[4]);
    console.log(botMatch5);

    //ep6
    console.log(slicedTitles[5]);
    console.log(botMatch6);

    //ep7
    console.log(slicedTitles[6]);
    console.log(botMatch7);

    //ep8
    console.log(slicedTitles[7]);
    console.log(botMatch8);

    //ep9
    console.log(slicedTitles[8]);
    console.log(botMatch9);

    //ep10
    console.log(slicedTitles[9]);
    console.log(botMatch10);
  };

  // console.log(slicedTitles);

  // Server
  app.get("/", function (req, res) {
    res.render("home", {
      episodeTitlesRender: slicedTitles,
      matchUpsRender: botMatch1,
    });
  });

  app.listen(port, () => {
    console.log(`Server Established and running on Port ${port}`);
  });

  // logger();
  // console.log(slicedTitles[0]);
  await browser.close();
}

start();
