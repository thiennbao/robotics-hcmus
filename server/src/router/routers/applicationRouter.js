import express from "express";
import applicationController from "../../controllers/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.get("/", applicationController.getApplications);
applicationRouter.get("/:slug", applicationController.getApplication);
applicationRouter.post("/", applicationController.postApplication);
applicationRouter.patch("/:slug", applicationController.patchApplication);
applicationRouter.delete("/:slug", applicationController.deleteApplication);

export default applicationRouter;
