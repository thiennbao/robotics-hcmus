import express from "express";
import resourceController from "../controllers/resourceController.js";
import resourceMiddleware from "../middlewares/resourceMiddleware.js";

const resourceRouter = express.Router();

resourceRouter.get("/:resource", resourceMiddleware.checkResourceAuth, resourceController.getResources);
resourceRouter.get("/:resource/:id", resourceMiddleware.checkResourceAuth, resourceController.getSingleResource);
resourceRouter.post("/:resource/", resourceMiddleware.checkResourceAuth, resourceController.postResource);
resourceRouter.patch("/:resource/:id", resourceMiddleware.checkResourceAuth, resourceController.patchResource);
resourceRouter.delete("/:resource/:id", resourceMiddleware.checkResourceAuth, resourceController.deleteResource);

export default resourceRouter;
