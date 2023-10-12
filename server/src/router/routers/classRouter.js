import express from "express";
import classController from "../../controllers/classController.js";

const classRouter = express.Router();

classRouter.get("/", classController.getClasses);
classRouter.get("/:slug", classController.getClass);
classRouter.post("/", classController.postClass);
classRouter.patch("/:slug", classController.patchClass);
classRouter.delete("/:slug", classController.deleteClass);

export default classRouter;
