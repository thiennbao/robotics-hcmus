import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  content: String,
  images: [String],
});

export default mongoose.model("Event", eventSchema);
