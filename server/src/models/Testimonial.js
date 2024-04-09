import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    image: String,
    name: String,
    position: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
