import Course from "../model/Course.js";
import Blog from "../model/Blog.js";

const resourceController = {
  // Courses
  getCourses: async (req, res) => {
    const { key, skip, limit } = req.query;
    try {
      const courses = await Course.where("name")
        .regex(new RegExp(key, "i"))
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit); 
      res.status(200).json(courses);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getSingleCourse: async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.slug });
      res.status(200).json(course);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postCourse: async (req, res) => {
    try {
      const newCourse = await Course.create(req.body);
      res.status(200).json(newCourse);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchCourse: async (req, res) => {
    await Course.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteCourse: async (req, res) => {
    await Course.deleteOne({ _id: req.params.slug });
  },

  // Blogs
  getBlogs: async (req, res) => {
    const { key, skip, limit } = req.query;
    try {
      const blogs = await Blog.where("title")
        .regex(new RegExp(key, "i"))
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getSingleBlog: async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.slug });
      res.status(200).json(blog);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postBlog: async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      res.status(200).json(newBlog);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchBlog: async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteBlog: async (req, res) => {
    await Blog.deleteOne({ _id: req.params.slug });
  },
};

export default resourceController;
