import mongoose from "mongoose";

const integrationSchema = new mongoose.Schema({
  esp: {
    type: String,
    enum: ["mailchimp", "getresponse"],
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["connected", "disconnected"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const integrationModel = mongoose.model(
  "Integration",
  integrationSchema
);
