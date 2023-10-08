import News from "../models/News.js";

const newsController = {
  getNews: async (req, res) => {
    try {
      const news = await News.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(news);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getOneNews: async (req, res) => {
    try {
      const news = await News.findOne({ _id: req.params.slug });
      res.status(200).json(news);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postNews: async (req, res) => {
    try {
      const newNews = await News.create(req.body);
      res.status(200).json(newNews);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchNews: async (req, res) => {
    await News.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteNews: async (req, res) => {
    await News.deleteOne({ _id: req.params.slug });
  },
};

export default newsController;
