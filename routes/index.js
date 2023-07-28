const router = (app) => {
  app.use("/books", require("./Books"));
  app.use("/pets", require("./Pets"));
  app.use("/persons", require("./Persons"));
  app.use("/tasks", require("./Tasks"));
};

module.exports = router;
