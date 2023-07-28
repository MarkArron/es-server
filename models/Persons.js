const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["administrator", "examinee"],
        message: "Please choose a valid role from the predefined options.",
      },
    },
    dob: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (proceed) {
  if (!this.isModified) {
    proceed();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Persons", schema);
