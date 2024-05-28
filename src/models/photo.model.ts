import mongoose from "mongoose";

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  name: { type: String, required: true },
});

export const Photo = mongoose.model("Photo", photoSchema);