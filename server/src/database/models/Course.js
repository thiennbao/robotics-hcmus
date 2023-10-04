import mongoose from "mongoose";

const Course = mongoose.Schema({
  name: String,
  thumbnail: Object,
  tuition: Number,
  description: String,
  age: String,
  lesson: Number,
  time: Number,
  images: [Object],
});

export default mongoose.model("Course", Course);
