const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  examinee_appointments,
  update_status,
  browse,
  examinees_room,
} = require("../controllers/Appointments");

router
  .post("/save", middleware, save)
  .get("/examinee_appointments", middleware, examinee_appointments)
  .get("/examinees_room", middleware, examinees_room)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update_status);

module.exports = router;
