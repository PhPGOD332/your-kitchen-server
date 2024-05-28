import mongoose from "mongoose";

const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photos: { type: [String], required: true },
  newPhotos: { type: [String], required: false },
});

export const Furniture = mongoose.model("Furniture", furnitureSchema);
