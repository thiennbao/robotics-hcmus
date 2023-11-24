import express from "express";
import managerController from "../../controllers/managerController.js";

const managerRouter = express.Router();

managerRouter.get("/blog/", managerController.getBlogs);
managerRouter.get("/blog/:slug", managerController.getSingleBlog);
managerRouter.post("/blog/", managerController.postBlog);
managerRouter.patch("/blog/:slug", managerController.patchBlog);
managerRouter.delete("/blog/:slug", managerController.deleteBlog);

export default managerRouter