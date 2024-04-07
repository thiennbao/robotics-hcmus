import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
