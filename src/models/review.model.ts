import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  photo: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  text: { type: String, required: true },
  photos: { type: [String], required: true },
});

export const Review = mongoose.model('Review', reviewSchema);