import Course from "../models/Course.js";

const courseController = {
  getCourses: async (req, res) => {
    try {
      const courses = await Course.find().skip(req.query.skip).limit(req.query.limit);
      res.status(200).json(courses);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getCourse: async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.slug });
      res.status(200).json(course);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  postCourse: async (req, res) => {
    try {
      const newCourse = await Course.create(req.body);
      res.status(200).json(newCourse);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  patchCourse: async (req, res) => {
    await Course.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteCourse: async (req, res) => {
    await Course.deleteOne({ _id: req.params.slug });
  },
};

export default courseController;
