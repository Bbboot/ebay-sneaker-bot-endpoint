import express from "express";
const app = express();
app.use(express.json());

// Verification token you choose
const VERIFICATION_TOKEN = "mySuperSecretToken123";

app.post("/marketplace-account-deletion", (req, res) => {
  // Check verification token from eBay
  const token = req.query.token || req.headers["x-ebay-verification-token"];
  if (token !== VERIFICATION_TOKEN) return res.status(403).send("Forbidden");

  // eBay may send a challenge parameter to verify
  if (req.query.challenge) return res.send(req.query.challenge);

  console.log("Account deletion event received:", req.body);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



