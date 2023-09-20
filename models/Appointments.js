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
        values: ["Pending", "Approved", "Denied", "Completed", "Failed"],
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
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointments", schema);
