const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category_Name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
  //createdAt,updateAt
);

module.exports = mongoose.model("Category", categorySchema);
