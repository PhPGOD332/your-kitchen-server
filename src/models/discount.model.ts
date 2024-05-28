import mongoose from "mongoose";

const Schema = mongoose.Schema;

const discountSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  conditions: { type: String },
  image: { type: String, required: true },
  slug: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["promotion", "gift", "discount"],
  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

export const Discount = mongoose.model("Discount", discountSchema);
