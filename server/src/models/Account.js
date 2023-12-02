import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  username: String,
  password: String,
  role: Number,
});

export default mongoose.model("Account", accountSchema);
