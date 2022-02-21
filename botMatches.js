// ep1
const botMatch1 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(37) a")
  ).map((x) => x.textContent);
});

// ep2
const botMatch2 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(40) a")
  ).map((x) => x.textContent);
});

// ep3
const botMatch3 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(43) a")
  ).map((x) => x.textContent);
});

// ep4
const botMatch4 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(46) a")
  ).map((x) => x.textContent);
});

// ep5
const botMatch5 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(49) a")
  ).map((x) => x.textContent);
});

// ep6
const botMatch6 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(52) a")
  ).map((x) => x.textContent);
});

// ep7
const botMatch7 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(55) a")
  ).map((x) => x.textContent);
});

// ep8
const botMatch8 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(58) a")
  ).map((x) => x.textContent);
});

// ep9
const botMatch9 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(61) a")
  ).map((x) => x.textContent);
});

// ep10
const botMatch10 = await page.evaluate(() => {
  return Array.from(
    document.querySelectorAll("#mw-content-text > div > table:nth-child(64) a")
  ).map((x) => x.textContent);
});
