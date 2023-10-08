import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    title: String,
    thumbnail: String,
    content: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
