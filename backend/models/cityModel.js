import mongoose from "mongoose";
const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    province_id: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const City = mongoose.model("City", citySchema);
export default City;
