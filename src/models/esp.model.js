import mongoose from "mongoose";

const espSchema = new mongoose.Schema({
  esp: {
    type: String,
    enum: ["mailChimp", "getResponse"],
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const espModel = mongoose.model("Esp", espSchema);
