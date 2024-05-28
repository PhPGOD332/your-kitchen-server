import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workerSchema = new Schema({
  photo: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  experience: { type: String, required: true },
});

export const Worker = mongoose.model('Worker', workerSchema);

