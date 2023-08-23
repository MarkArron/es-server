const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  browse,
  update,
  exam_schedule,
} = require("../controllers/Schedules");

router
  .post("/save", middleware, save)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update)
  .get("/exam_schedule", middleware, exam_schedule);

module.exports = router;
