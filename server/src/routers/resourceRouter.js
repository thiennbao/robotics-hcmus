import express from "express";
import resourceController from "../controllers/resourceController.js";

const resourceRouter = express.Router();

resourceRouter.get("/:resource", resourceController.getResources);
resourceRouter.get("/:resource/:id", resourceController.getSingleResource);
resourceRouter.post("/:resource/", resourceController.postResource);
resourceRouter.patch("/:resource/:id", resourceController.patchResource);
resourceRouter.delete("/:resource/:id", resourceController.deleteResource);

export default resourceRouter;
