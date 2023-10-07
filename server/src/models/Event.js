import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  banner: String,
  content: String,
});

export default mongoose.model("Event", eventSchema);
