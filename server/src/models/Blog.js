import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    content: { type: String, required: true },
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
