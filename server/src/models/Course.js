import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: String,
  thumbnail: String,
  tuition: String,
  description: String,
  age: String,
  lesson: String,
  time: String,
  images: [String],
});

export default mongoose.model("Course", courseSchema);
