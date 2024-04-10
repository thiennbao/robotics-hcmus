import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
