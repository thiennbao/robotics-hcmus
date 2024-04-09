import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
  title: String,
  content: String,
  index: Number,
});

export default mongoose.model("Link", linkSchema);
