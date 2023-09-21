const router = (app) => {
  app.use("/persons", require("./Persons"));
  app.use("/banks", require("./Banks"));
  app.use("/exams", require("./Exams"));
  app.use("/scores", require("./Scores"));
  app.use("/appointments", require("./Appointments"));
  app.use("/schedules", require("./Schedules"));
};

module.exports = router;
