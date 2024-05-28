import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleModel = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  preview: { type: String, required: true },
  content: { type: String, required: true },
  onMainPage: { type: Boolean },
  viewCount: { type: Number },
  createdAt: { type: String, required: true },
  updatedAt: { type: String },
  meta: {
    keywords: String,
    description: String,
    title: String,
  },
});

export const Article = mongoose.model("Article", articleModel);
