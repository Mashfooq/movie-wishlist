import pkg from 'pg';
import dotenv from "dotenv"

const { Client } = pkg;

dotenv.config({
    path: './.env'
})

// Database connection configuration
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

export {
    client
}
