import mongoose from "mongoose";

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  firstName: { type: String },
  mobilePhone: { type: String, required: true },
  email: { type: String },
  date: { type: String, required: true, default: new Date().toISOString() },
  tag: { type: String },
  location: { type: String },
  files: { type: [String] },
});

export const Claim = mongoose.model("Claim", claimSchema);
