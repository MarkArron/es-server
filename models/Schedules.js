const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persons",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
      required: true,
    },
    maxSlots: {
      type: Number,
      required: true,
    },
    slotsTaken: {
      type: Number,
      required: true,
    },
    didStart: {
      type: Boolean,
      default: false,
    },
    didFinish: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedules", schema);
