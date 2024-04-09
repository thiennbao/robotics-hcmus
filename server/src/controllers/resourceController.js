import Link from "../models/Link.js";
import Banner from "../models/Banner.js";
import Testimonial from "../models/Testimonial.js";
import Course from "../models/Course.js";
import Blog from "../models/Blog.js";
import Contact from "../models/Contact.js";
import ContactInfo from "../models/ContactInfo.js";
import Faq from "../models/Faq.js";

const Models = {
  link: Link,
  banner: Banner,
  testimonial: Testimonial,
  course: Course,
  blog: Blog,
  contact: Contact,
  contactInfo: ContactInfo,
  faq: Faq,
};

const resourceController = {
  getResources: async (req, res) => {
    try {
      const { resource } = req.params;
      const { where, key, sort, order, skip, limit } = req.query;
      const data = await Models[resource]
        .find(where ? { [where]: new RegExp(key, "i") } : {})
        .sort(sort ? { [sort]: order } : {})
        .skip(skip)
        .limit(limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSingleResource: async (req, res) => {
    try {
      const { resource, id } = req.params;
      const data = await Models[resource].findOne({ _id: id });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postResource: async (req, res) => {
    try {
      const { resource } = req.params;
      const postedData = await Models[resource].create(req.body);
      res.status(200).json(postedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  patchResource: async (req, res) => {
    try {
      const { resource, id } = req.params;
      const patchedData = await Models[resource].findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      res.status(200).json(patchedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteResource: async (req, res) => {
    try {
      const { resource, id } = req.params;
      const deletedData = await Models[resource].findByIdAndDelete(id);
      res.status(200).json(deletedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default resourceController;
