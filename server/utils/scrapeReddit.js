import puppeteer from "puppeteer";
import { autoScroll } from "./autoScroll.js";

export const scrapeReddit = async (movieName, releaseDate) => {
  const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      userDataDir: "./tmp"
  });
  const page = await browser.newPage();
  const query = `site:reddit.com review movie ${movieName} ${releaseDate}`;
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);

  let comments = [];
  let linksVisited = 0;
  let threadLinks = [];
  while (comments.length < 50 && linksVisited < 10) {
      if (threadLinks.length === 0) {
          threadLinks = await page.evaluate(() => Array.from(document.querySelectorAll("a[href*='reddit.com/r/']")).map(anchor => anchor.href));
      }
      if (linksVisited >= threadLinks.length) break;

      const nextLink = threadLinks[linksVisited++];
      console.log(`Navigating to: ${nextLink}`);
      try {
          await page.goto(nextLink);
          await autoScroll(page);
          const newComments = await page.evaluate(() => Array.from(document.querySelectorAll('div[id*="-post-rtjson-content"] p'), element => element.textContent.trim()));
          comments = [...comments, ...newComments.slice(0, 50 - comments.length)];
          console.log(`Total comments collected: ${comments.length}`);
      } catch (error) {
          console.error(`Error navigating to link: ${error}`);
          continue;
      }
  }
  await browser.close();
  return comments;
};
