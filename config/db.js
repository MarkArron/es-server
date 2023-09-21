const mongoose = require("mongoose");
const { red, green } = require("colorette");

const connectToDB = () =>
  mongoose
    .connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(green("mongodb connection success5"));
      return true;
    })
    .catch((err) => {
      console.log(red("mongodb connection failed"));
      throw new Error(err);
    });

module.exports = connectToDB;
