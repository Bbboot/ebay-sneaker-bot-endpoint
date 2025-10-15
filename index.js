import express from "express";
const app = express();
app.use(express.json());

// eBay deletion notifications will POST here
app.post("/ebay-deletion", (req, res) => {
  console.log("✅ Received eBay deletion notification:", req.body);
  res.status(200).send("OK");
});

// Simple GET endpoint to test
app.get("/", (req, res) => {
  res.send("Endpoint is live!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

