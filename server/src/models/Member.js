import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  name: String,
  position: String,
  quote: String,
  image: String,
  links: String,
});

export default mongoose.model("Member", memberSchema);
