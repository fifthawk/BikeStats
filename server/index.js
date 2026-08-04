import "dotenv/config";
import express from "express";
import pool from "./db.js";
import cors from "cors";
import { getAuthUrl, exchangeToken, getRides, syncRides } from "./strava.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/auth/strava", (req, res) => {
  res.redirect(getAuthUrl());
});

app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("No code received");

  const data = await exchangeToken(code);
  if (!data.access_token) return res.send("Token exchange failed");

  const result = await pool.query(
    "INSERT INTO tokens (access_token, refresh_token, expires_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
    [data.access_token, data.refresh_token, data.expires_at],
  );

  console.log("rows inserted:", result.rowCount);
  res.send("Authorization successful!");
});

app.get("/api/rides", async (req, res) => {
  const rides = await getRides();
  res.json(rides);
});

app.get("/api/sync", async (req, res) => {
  await syncRides();
  res.send("Rides synced!");
});

app.listen(port, () => {
  console.log(`BikeStats listening on port ${port}`);
});
