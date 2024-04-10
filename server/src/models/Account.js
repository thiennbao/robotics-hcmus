import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
