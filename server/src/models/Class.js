import mongoose from "mongoose";

const classSchema = mongoose.Schema({
  name: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  time: String,
  date: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  student: [String],
  images: [String],
});

export default mongoose.model("Class", classSchema);
