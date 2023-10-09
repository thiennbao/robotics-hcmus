import express from "express";
import courseController from "../../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.get("/", courseController.getCourses);
courseRouter.get("/:slug", courseController.getCourse);
courseRouter.post("/", courseController.postCourse);
courseRouter.patch("/:slug", courseController.patchCourse);
courseRouter.delete("/:slug", courseController.deleteCourse);

export default courseRouter;
