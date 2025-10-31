// scraper.js
import puppeteer from "puppeteer-core";

export async function analyzeSneaker(name, buyPrice) {
  console.log(`Analyzing sneaker: ${name} for buy price $${buyPrice}...`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/google-chrome",
  });

  const page = await browser.newPage();
  await page.goto(
    `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
      name
    )}+sneakers&_sop=12`
  );

  // scrape sold listings for realistic resale data
  const listings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-item")).slice(0, 15).map((el) => ({
      title: el.querySelector(".s-item__title")?.innerText,
      price: el.querySelector(".s-item__price")?.innerText,
      link: el.querySelector(".s-item__link")?.href,
    }));
  });

  await browser.close();

  const prices = listings
    .map((l) => parseFloat(l.price?.replace(/[^\d.]/g, "")))
    .filter((p) => !isNaN(p) && p > 50);

  const avgPrice = prices.length
    ? prices.reduce((a, b) => a + b, 0) / prices.length
    : 0;

  const profit = avgPrice - buyPrice;

  // build your resale analysis response
  const analysis = {
    sneaker: name,
    avgResalePrice: `$${avgPrice.toFixed(2)}`,
    buyPrice: `$${buyPrice}`,
    potentialProfit: `$${profit.toFixed(2)}`,
    profitability:
      profit > 100
        ? "🔥 Strong resale opportunity — BUY"
        : profit > 0
        ? "🟡 Small profit — consider only if market stable"
        : "❌ Not profitable — skip",
    listingsAnalyzed: listings.length,
  };

  return analysis;
}
