import express from "express";
import pool from "./db.js";
import { getAuthUrl, exchangeToken } from "./strava.js";
const app = express();
const port = 3000;

app.get("/auth/strava", (req, res) => {
  res.redirect(getAuthUrl());
});

app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("No code received");

  const data = await exchangeToken(code);
  console.log(data);
  if (!data.access_token) return res.send("Token exchange failed");

  console.log(data);

  await pool.query("DELETE FROM tokens");

  await pool
    .query(
      "INSERT INTO tokens (access_token, refresh_token, expires_at) VALUES ($1, $2, $3)",
      [data.access_token, data.refresh_token, data.expires_at],
    )
    .then(() => console.log("token saved"))
    .catch((err) => console.log("insert error:", err));

  res.send("Authorization successful!");
});

app.listen(port, () => {
  console.log(`BikeStats listening on port ${port}`);
});
