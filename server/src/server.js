import express from "express";
import "dotenv/config";

import router from "./routes/router.js";

const app = express();

router(app);

app.listen(process.env.PORT, () => {
  console.log("Server is running ...");
});
