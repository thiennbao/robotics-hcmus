import courseRouter from "./routers/courseRouter.js";
import eventRouter from "./routers/eventRouter.js";
import newsRouter from "./routers/newsRouter.js";

const router = (app) => {
  app.use("/api/course", courseRouter);
  app.use("/api/event", eventRouter);
  app.use("/api/news", newsRouter);
};

export default router;
