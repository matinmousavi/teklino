import mongoose from "mongoose";
const provinceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    original_id: { type: Number, required: true, unique: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Province = mongoose.model("Province", provinceSchema);
export default Province;
