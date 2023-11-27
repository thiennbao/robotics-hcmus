import express from "express";
import resourceController from "../../controllers/resourceController.js";

const resourceRouter = express.Router();

// Courses
resourceRouter.get("/course/", resourceController.getCourses);
resourceRouter.get("/course/:slug", resourceController.getSingleCourse);
resourceRouter.post("/course/", resourceController.postCourse);
resourceRouter.patch("/course/:slug", resourceController.patchCourse);
resourceRouter.delete("/course/:slug", resourceController.deleteCourse);

// Blogs
resourceRouter.get("/blog/", resourceController.getBlogs);
resourceRouter.get("/blog/:slug", resourceController.getSingleBlog);
resourceRouter.post("/blog/", resourceController.postBlog);
resourceRouter.patch("/blog/:slug", resourceController.patchBlog);
resourceRouter.delete("/blog/:slug", resourceController.deleteBlog);

export default resourceRouter