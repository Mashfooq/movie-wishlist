import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: './.env'
})

app.listen(process.env.PORT ?? 3002, () => console.log("Server started"))