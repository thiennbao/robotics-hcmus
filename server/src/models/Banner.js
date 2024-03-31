import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    name: String,
    content: String,
    images: [String],
    index: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
