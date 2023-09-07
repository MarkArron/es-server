const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    examinee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persons",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Approved", "Denied", "Completed"],
        message: "Please choose a valid status from the predefined options.",
      },
      default: "Pending",
    },
    reason: {
      type: String,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedules",
      required: true,
    },
    attendance: {
      type: String,
      enum: {
        values: ["-", "Present"],
        message:
          "Please choose a valid attendance from the predefined options.",
      },
      default: "-",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointments", schema);
