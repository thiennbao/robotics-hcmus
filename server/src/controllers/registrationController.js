import Registration from "../models/Registration.js";

const registrationController = {
  getRegistrations: async (req, res) => {
    try {
      const registrations = await Registration.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(registrations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getRegistration: async (req, res) => {
    try {
      const registration = await Registration.findOne({ _id: req.params.slug });
      res.status(200).json(registration);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postRegistration: async (req, res) => {
    try {
      const newRegistration = await Registration.create(req.body);
      res.status(200).json(newRegistration);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchRegistration: async (req, res) => {
    await Registration.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteRegistration: async (req, res) => {
    await Registration.deleteOne({ _id: req.params.slug });
  },
};

export default registrationController;
