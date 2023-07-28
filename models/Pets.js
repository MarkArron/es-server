const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: ["Dog", "Cat", "Bird", "Fish"],
        message: "Please choose a valid type from the predefined options.",
      },
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    isMale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pets", schema);
