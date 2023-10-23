import express from "express";
import registrationController from "../../controllers/registrationController.js";

const registrationRouter = express.Router();

registrationRouter.get("/", registrationController.getRegistrations);
registrationRouter.get("/:slug", registrationController.getRegistration);
registrationRouter.post("/", registrationController.postRegistration);
registrationRouter.patch("/:slug", registrationController.patchRegistration);
registrationRouter.delete("/:slug", registrationController.deleteRegistration);

export default registrationRouter;
