const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  browse,
  update,
  exam_schedules,
  admin_schedules,
} = require("../controllers/Schedules");

router
  .post("/save", middleware, save)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update)
  .get("/exam_schedules", middleware, exam_schedules)
  .get("/admin_schedules", middleware, admin_schedules);

module.exports = router;
