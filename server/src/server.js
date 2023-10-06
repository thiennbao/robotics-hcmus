import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import router from "./router/router.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

router(app);

mongoose
  .connect(process.env.DB_CONNECT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT, () => console.log("Server is running ...")))
  .catch((error) => console.log(error));
