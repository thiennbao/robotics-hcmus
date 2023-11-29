import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    subject: String,
    message: String,
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
