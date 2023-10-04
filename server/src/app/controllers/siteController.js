import Course from "../../database/models/Course.js";

const siteController = {
  getCourses: async (req, res) => {
    const courses = await Course.find().limit(req.query.limit);
    res.status(200).json(courses);
  },
  getCourse: async (req, res) => {
    const course = await Course.findOne({ _id: req.params.slug });
    res.status(200).json(course);
  },
  postCourse: async (req, res) => {
    await Course.create(req.body);
  },
  patchCourse: async (req, res) => {
    await Course.findByIdAndUpdate(req.params.slug, req.body);
  },
  deleteCourse: async (req, res) => {
    await Course.deleteOne({ _id: req.params.slug });
  },
};

export default siteController;
