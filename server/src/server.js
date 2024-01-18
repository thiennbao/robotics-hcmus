import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";

import resourceRouter from "./routers/resourceRouter.js";
import authRouter from "./routers/authRouter.js";

import authSetup from "./utils/authSetup.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/resource", resourceRouter);
app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.DB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, async () => {
      await authSetup();
      console.log("Server is running ...");
    })
  )
  .catch((error) => console.log(error));
