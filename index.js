const express = require('express'); // or import express from "express" if using modules
const app = express();

const PORT = process.env.PORT || 3000; // <- important!

app.get('/', (req, res) => {
  res.send('✅ eBay Sneaker Bot Endpoint is Live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

