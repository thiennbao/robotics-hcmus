import mongoose from "mongoose";

const contactInfoSchema = mongoose.Schema({
  key: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model("ContactInfo", contactInfoSchema);
