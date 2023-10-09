import Contact from "../models/Contact.js";

const contactController = {
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(contacts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getContact: async (req, res) => {
    try {
      const contact = await Contact.findOne({ _id: req.params.slug });
      res.status(200).json(contact);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postContact: async (req, res) => {
    try {
      const newContact = await Contact.create(req.body);
      res.status(200).json(newContact);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchContact: async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteContact: async (req, res) => {
    await Contact.deleteOne({ _id: req.params.slug });
  },
};

export default contactController;
