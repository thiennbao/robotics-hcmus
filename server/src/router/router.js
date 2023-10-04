import siteRouter from "./routers/siteRouter.js";

const router = (app) => {
  app.use("/api", siteRouter);
};

export default router;
