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
    },
    reason: {
      type: String,
      required: function () {
        return this.status === "Denied";
      },
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedules",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointments", schema);
