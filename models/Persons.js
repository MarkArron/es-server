const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      default: "",
    },
    isMale: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true, //not case sensitive
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//encrypt password
schema.pre("save", async function (proceed) {
  //old function offers 'this' which is not available in callback function
  if (!this.isModified) {
    proceed();
  }
  const salt = await bcrypt.genSalt(10); //wait first the below code to run //generate unique password with a length of 10
  this.password = await bcrypt.hash(this.password, salt); //pepper = unique pass, salt = encrypt
});

schema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password); // (password of what the user inputted, password in the database)
};

module.exports = mongoose.model("Persons", schema);
