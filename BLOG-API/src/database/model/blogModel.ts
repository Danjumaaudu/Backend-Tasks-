import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],

  },
  { timestamps: true }
);

export const BlogModel = mongoose.model("Blog", BlogSchema);
