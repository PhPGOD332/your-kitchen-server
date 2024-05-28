import mongoose from "mongoose";

const Schema = mongoose.Schema;

const kitchenSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  style: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    __isNew__: { type: Boolean },
  },
  onMainPage: { type: Boolean },
  photos: { type: [String], required: true },
  type: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    __isNew__: { type: Boolean },
  },
  term: { type: String, required: true },
  slug: { type: String, required: true },
  meta: {
    keywords: String,
    description: String,
    title: String,
  },
});

export const Kitchen = mongoose.model("Kitchen", kitchenSchema);
