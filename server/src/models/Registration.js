import mongoose from "mongoose";

const registrationSchema = mongoose.Schema(
  {
    course: String,
    name: String,
    phone: String,
    email: String,
    message: String,
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema);
