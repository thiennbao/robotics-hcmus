import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    aim: { type: String, required: true },
    requirement: { type: String, required: true },
    age: { type: String, required: true },
    lesson: { type: String, required: true },
    duration: { type: String, required: true },
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
