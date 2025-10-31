// index.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Base route — just to confirm it’s live
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 🏷️ Route 1: Search for sneakers on eBay
app.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Missing ?query=" });

  try {
    const ebayUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
      query
    )}&limit=5`;

    const response = await fetch(ebayUrl, {
      headers: {
        Authorization: `Bearer ${process.env.EBAY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from eBay:", error);
    res.status(500).json({ error: "Failed to fetch from eBay API" });
  }
});

// 💸 Route 2: Get sneaker price data
app.get("/price", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing ?id=" });

  try {
    const ebayUrl = `https://api.ebay.com/buy/browse/v1/item/${id}`;

    const response = await fetch(ebayUrl, {
      headers: {
        Authorization: `Bearer ${process.env.EBAY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.json({
      title: data.title,
      price: data.price,
      seller: data.seller,
    });
  } catch (error) {
    console.error("Error fetching price data:", error);
    res.status(500).json({ error: "Failed to fetch item price" });
  }
});

// 🧠 Route 3: Health check (for Railway)
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
