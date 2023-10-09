import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    subject: String,
    status: { type: Boolean, default: false },
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
