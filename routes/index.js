const router = (app) => {
  app.use("/persons", require("./Persons"));
  app.use("/banks", require("./Banks"));
  app.use("/exams", require("./Exams"));
  app.use("/scores", require("./Scores"));
};

module.exports = router;
