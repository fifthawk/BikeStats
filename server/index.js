import express from "express";
import pool from "./db.js";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`BikeStats listening on port ${port}`);
});

const testDb = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows);
};

testDb();
