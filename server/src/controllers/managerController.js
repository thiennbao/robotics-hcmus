import Blog from "../model/Blog.js";

const managerController = {
  // Blog
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

export default managerController;
