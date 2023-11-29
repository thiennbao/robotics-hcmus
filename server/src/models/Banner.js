import mongoose from "mongoose";

const bannerSchema = mongoose.Schema({
  name: String,
  content: String,
  images: [String],
  index: Number,
});

export default mongoose.model("Banner", bannerSchema);
