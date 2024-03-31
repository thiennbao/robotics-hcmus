import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: String,
    thumbnail: String,
    description: String,
    aim: String,
    requirement: String,
    age: String,
    lesson: String,
    duration: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
