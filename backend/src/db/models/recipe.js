import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true },
);

export const Recipe = mongoose.model("recipe", recipeSchema);
