import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    status: { type: Boolean, default: false },
    qn1: String,
    qn2: String,
    qn3: String,
    // Add question here if need more
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
