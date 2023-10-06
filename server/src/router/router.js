import courseRouter from "./routers/courseRouter.js";

const router = (app) => {
  app.use("/api/course", courseRouter);
};

export default router;
