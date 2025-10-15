import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080; // Railway requires process.env.PORT

// Root endpoint to test the server
app.get("/", (req, res) => {
  res.send("✅ eBay Sneaker Bot Endpoint is Live!");
});

// Scrape endpoint
app.get("/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing ?url parameter");

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    res.status(500).send("Error fetching URL: " + error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


