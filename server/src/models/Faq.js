import mongoose from "mongoose";

const faqSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Faq", faqSchema);
