import dotenv from "dotenv"
import { app } from "./app.js"
import { client } from "./database.js"

dotenv.config({
    path: './.env'
})

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err));

app.listen(process.env.PORT ?? 3002, () => console.log('Server started'));