import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    thumbnail: String,
    content: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
