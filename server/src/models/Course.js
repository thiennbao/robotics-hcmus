import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: String,
  thumbnail: String,
  tuition: Number,
  description: String,
  age: String,
  lesson: Number,
  time: Number,
  images: [String],
});

export default mongoose.model("Course", courseSchema);
