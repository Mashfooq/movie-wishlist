import dotenv from "dotenv"
import { app } from "./app.js"
import { testDatabaseConnection } from "../database/postgresConnection.js"

dotenv.config({
    path: './.env'
})

// Connect to the database
testDatabaseConnection();

app.listen(process.env.PORT ?? 3002, () => console.log('Server started'));