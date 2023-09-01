import siteRouter from "./routers/siteRouter.js";

const router = (app) => {
  app.use("/", siteRouter);
};

export default router;
