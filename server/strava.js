import "dotenv/config";

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
  return "https://www.strava.com/oauth/authorize?${params}";
};
