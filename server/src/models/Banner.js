import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    image: String,
    index: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
