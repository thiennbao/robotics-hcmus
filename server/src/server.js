import express from "express";
import "dotenv/config";
import cors from "cors"
import connect from "./database/connect.js"
import router from "./router/router.js";

const app = express();

// Database
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
connect()

// Router
router(app);

// Server
app.listen(process.env.PORT, () => {
  console.log("Server is running ...");
});
