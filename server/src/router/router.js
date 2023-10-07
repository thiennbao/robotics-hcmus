import courseRouter from "./routers/courseRouter.js";
import eventRouter from "./routers/eventRouter.js";

const router = (app) => {
  app.use("/api/course", courseRouter);
  app.use("/api/event", eventRouter);
};

export default router;
