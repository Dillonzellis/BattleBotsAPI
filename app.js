const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const writeStream = fs.createWriteStream("output.csv");

const port = process.env.PORT || 4000;

const app = express();

const url = "https://battlebots.fandom.com/wiki/Discovery_Season_6";

const peopleArr = ["joe", "bob", "sue", "cody"];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

axios
  .get(url)
  .then((res) => {
    const $ = cheerio.load(res.data);
    $(".article-table").each((index, element) => {
      const botTitles = $(element).find("td").text();
      console.log(botTitles);

      let botArr = botTitles.split(" ");
      let cleanArr = botArr.filter((a) => a !== "vs.");
      console.log(`${cleanArr}`);

      writeStream.write(`Bot name: ${cleanArr} \n`);
    });
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server Established and running on Port ${port}`);
});