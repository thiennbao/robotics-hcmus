import managerRouter from "./routers/managerRouter.js";

const router = (app) => {
  app.use("/api", managerRouter);
};

export default router;
