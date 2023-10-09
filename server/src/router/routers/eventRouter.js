import express from "express";
import eventController from "../../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/", eventController.getEvents);
eventRouter.get("/:slug", eventController.getEvent);
eventRouter.post("/", eventController.postEvent);
eventRouter.patch("/:slug", eventController.patchEvent);
eventRouter.delete("/:slug", eventController.deleteEvent);

export default eventRouter;
