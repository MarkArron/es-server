const router = (app) => {
  app.use("/persons", require("./Persons"));
};

module.exports = router;
