import mongoose from "mongoose";

const faqSchema = mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  { timestamps: true }
);

export default mongoose.model("Faq", faqSchema);
