import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    index: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
