import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Endpoint is live!");
});

app.get("/scrape", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    // Fetch eBay page HTML
    const response = await fetch(url);
    const html = await response.text();

    // Extract title text
    const match = html.match(/<title>(.*?)<\/title>/i);
    if (!match) return res.status(404).send("Name not found");

    let sneakerName = match[1]
      .replace(/for sale online \| eBay/i, "")
      .replace(/eBay/i, "")
      .trim();

    res.send(sneakerName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching name");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));



