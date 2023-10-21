import mongoose from "mongoose";

const timelineSchema = mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  images: [String],
});

export default mongoose.model("Timeline", timelineSchema);
