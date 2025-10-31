// index.js
import express from "express";
import { analyzeSneaker } from "./scraper.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Sneaker resale endpoint is live 👟");
});

// 🧠 Analyze sneaker profitability
app.post("/analyze", async (req, res) => {
  const { name, buyPrice } = req.body;
  if (!name || !buyPrice)
    return res.status(400).json({ error: "Missing name or buyPrice" });

  try {
    const result = await analyzeSneaker(name, buyPrice);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze sneaker" });
  }
});

app.listen(PORT, () =>
  console.log(`Sneaker resale endpoint running on port ${PORT} 🚀`)
);
