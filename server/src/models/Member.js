import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  name: String,
  image: String,
  position: String,
  quote: String,
  facebook: String,
  instagram: String,
  linkedin: String,
});

export default mongoose.model("Member", memberSchema);
