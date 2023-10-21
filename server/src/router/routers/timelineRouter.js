import express from "express";
import timelineController from "../../controllers/timelineController.js";

const timelineRouter = express.Router();

timelineRouter.get("/", timelineController.getTimelines);
timelineRouter.get("/:slug", timelineController.getTimeline);
timelineRouter.post("/", timelineController.postTimeline);
timelineRouter.patch("/:slug", timelineController.patchTimeline);
timelineRouter.delete("/:slug", timelineController.deleteTimeline);

export default timelineRouter;
