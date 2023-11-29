import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  name: String,
  photo: String,
  position: String,
  description: String,
});

export default mongoose.model("Member", memberSchema);
