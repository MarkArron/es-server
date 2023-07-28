const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persons",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
      enum: {
        values: [
          "Fiction",
          "Mystery",
          "Romance",
          "Sci-Fi",
          "Fantasy",
          "History",
          "Horror",
        ],
        message: "Please choose a valid genre from the predefined options.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", schema);
