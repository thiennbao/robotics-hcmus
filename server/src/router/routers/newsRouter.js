import express from "express";
import newsController from "../../controllers/newsController.js";

const newsRouter = express.Router();

newsRouter.get("/", newsController.getNews);
newsRouter.get("/:slug", newsController.getOneNews);
newsRouter.post("", newsController.postNews);
newsRouter.patch("/:slug", newsController.patchNews);
newsRouter.delete("/:slug", newsController.deleteNews);

export default newsRouter;
