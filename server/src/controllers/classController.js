import Class from "../models/Class.js";

const classController = {
  getClasses: async (req, res) => {
    try {
      const classes = await Class.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(classes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getClass: async (req, res) => {
    try {
      const getClass = await Class.findOne({ _id: req.params.slug });
      res.status(200).json(getClass);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postClass: async (req, res) => {
    try {
      const newClass = await Class.create(req.body);
      res.status(200).json(newClass);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchClass: async (req, res) => {
    await Class.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteClass: async (req, res) => {
    await Class.deleteOne({ _id: req.params.slug });
  },
};

export default classController
