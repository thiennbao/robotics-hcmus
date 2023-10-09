import Application from "../models/Application.js";

const applicationController = {
  getApplications: async (req, res) => {
    try {
      const applications = await Application.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(applications);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getApplication: async (req, res) => {
    try {
      const application = await Application.findOne({ _id: req.params.slug });
      res.status(200).json(application);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postApplication: async (req, res) => {
    try {
      const newApplication = await Application.create(req.body);
      res.status(200).json(newApplication);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchApplication: async (req, res) => {
    await Application.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteApplication: async (req, res) => {
    await Application.deleteOne({ _id: req.params.slug });
  },
};

export default applicationController;
