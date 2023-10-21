import Timeline from "../models/Timeline.js";

const timelineController = {
  getTimelines: async (req, res) => {
    try {
      const timelines = await Timeline.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(timelines);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getTimeline: async (req, res) => {
    try {
      const timeline = await Timeline.findOne({ _id: req.params.slug });
      res.status(200).json(timeline);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postTimeline: async (req, res) => {
    try {
      const newTimeline = await Timeline.create(req.body);
      res.status(200).json(newTimeline);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchTimeline: async (req, res) => {
    await Timeline.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteTimeline: async (req, res) => {
    await Timeline.deleteOne({ _id: req.params.slug });
  },
};

export default timelineController;
