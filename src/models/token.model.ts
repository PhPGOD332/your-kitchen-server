import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const Token = mongoose.model("Token", TokenSchema);