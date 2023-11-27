import resourceRouter from "./routers/resourceRouter.js";

const router = (app) => {
  app.use("/resource", resourceRouter);
};

export default router;
