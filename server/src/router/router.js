import courseRouter from "./routers/courseRouter.js";
import eventRouter from "./routers/eventRouter.js";
import newsRouter from "./routers/newsRouter.js";
import memberRouter from "./routers/memberRouter.js";
import contactRouter from "./routers/contactRouter.js";

const router = (app) => {
  app.use("/api/course", courseRouter);
  app.use("/api/event", eventRouter);
  app.use("/api/news", newsRouter);
  app.use("/api/member", memberRouter);
  app.use("/api/contact", contactRouter);
};

export default router;
