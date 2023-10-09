import express from "express";
import contactController from "../../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.get("/", contactController.getContacts);
contactRouter.get("/:slug", contactController.getContact);
contactRouter.post("/", contactController.postContact);
contactRouter.patch("/:slug", contactController.patchContact);
contactRouter.delete("/:slug", contactController.deleteContact);

export default contactRouter;
