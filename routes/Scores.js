const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  find,
  browse,
  statistics,
  examinee_statistics,
} = require("../controllers/Scores");

router
  .post("/save", middleware, save)
  .get("/find", middleware, find)
  .get("/browse", middleware, browse)
  .get("/statistics", middleware, statistics)
  .get("/examinee_statistics", middleware, examinee_statistics);

module.exports = router;
