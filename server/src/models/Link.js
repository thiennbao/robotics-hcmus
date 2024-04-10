import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  index: { type: Number, required: true },
});

export default mongoose.model("Link", linkSchema);
