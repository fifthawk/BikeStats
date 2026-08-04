import 'dotenv/config';
import { Pool } from "pg";


const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER
})

export default pool