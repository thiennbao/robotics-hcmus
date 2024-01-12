import Banner from "../models/Banner.js";
import Blog from "../models/Blog.js";
import Contact from "../models/Contact.js";
import Course from "../models/Course.js";

const Models = {
  banner: Banner,
  blog: Blog,
  contact: Contact,
  course: Course,
};

const resourceController = {
  getResources: async (req, res) => {
    const { resource } = req.params;
    const { where, key, sort, order, skip, limit } = req.query;
    try {
      const data = await Models[resource]
        .find(where ? { [where]: new RegExp(key, "i") } : {})
        .sort(sort ? { [sort]: order } : {})
        .skip(skip)
        .limit(limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getSingleResource: async (req, res) => {
    const { resource, id } = req.params;
    try {
      const data = await Models[resource].findOne({ _id: id });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postResource: async (req, res) => {
    const { resource } = req.params;
    try {
      const newData = await Models[resource].create(req.body);
      res.status(200).json(newData);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchResource: async (req, res) => {
    const { resource, id } = req.params;
    await Models[resource].findByIdAndUpdate(id, req.body);
  },
  deleteResource: async (req, res) => {
    const { resource, id } = req.params;
    await Models[resource].deleteOne({ _id: id });
  },
};

export default resourceController;
