const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const recipeSchema = new mongoose.Schema(
  {
    recipe_name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    recipe_description: {
      type: String,
      required: true,
    },
    cooking_time: {
      type: Number,
      required: true,
    },
    recipe_instructions: {
      type: String,
      required: true,
    },

    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    recipe_rating: {
      type: Number,
      default: 0,
    },
    Owner: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    recipe_review: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
