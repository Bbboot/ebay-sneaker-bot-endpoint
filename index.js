import express from "express";
import cors from "cors";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ Sneaker endpoint is live!");
});

app.get("/sneaker", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing ?url= parameter" });

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    const title = await page.title();
    await browser.close();

    res.json({ status: "success", title });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
