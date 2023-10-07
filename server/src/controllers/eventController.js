import Event from "../models/Event.js";

const eventController = {
  getEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.slug });
      res.status(200).json(event);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postEvent: async (req, res) => {
    try {
      const newEvent = await Event.create(req.body);
      res.status(200).json(newEvent);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchEvent: async (req, res) => {
    await Event.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteEvent: async (req, res) => {
    await Event.deleteOne({ _id: req.params.slug });
  },
};

export default eventController;
