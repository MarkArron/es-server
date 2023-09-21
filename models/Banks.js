const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    choices: {
      type: Array,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banks", schema);
