import express from "express";

import siteController from "../../app/controllers/siteController.js";

const router = express.Router();

router.get("/", siteController.home);

export default router;
