import mongoose from "mongoose";

const contactInfoSchema = mongoose.Schema({
  key: String,
  icon: String,
  title: String,
  content: String,
});

export default mongoose.model("ContactInfo", contactInfoSchema);
