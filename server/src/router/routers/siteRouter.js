import express from "express";

import siteController from "../../app/controllers/siteController.js";

const router = express.Router();

router.get("/course", siteController.getCourses);
router.get("/course/:slug", siteController.getCourse);
router.post("/course", siteController.postCourse);
router.patch("/course/:slug", siteController.patchCourse)
router.delete("/course/:slug", siteController.deleteCourse);

export default router;
