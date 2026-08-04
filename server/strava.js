import "dotenv/config";
import pool from "./db.js";

export const exchangeToken = async (code) => {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  return data;
};

export const getAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID,
    redirect_uri: "http://localhost:3000/auth/callback",
    response_type: "code",
    scope: "activity:read_all",
  });
  console.log(`https://www.strava.com/oauth/authorize?${params}`);
  return `https://www.strava.com/oauth/authorize?${params}`;
};

export const getRides = async () => {
  const result = await pool.query("SELECT access_token FROM tokens LIMIT 1");
  const accessToken = result.rows[0].access_token;

  const response = await fetch(
    "https://www.strava.com/api/v3/athlete/activities",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const rides = await response.json();
  return rides;
};
