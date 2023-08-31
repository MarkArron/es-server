const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  examinee_appointments,
  update_status,
  browse,
} = require("../controllers/Appointments");

router
  .post("/save", middleware, save)
  .get("/examinee_appointments", middleware, examinee_appointments)
  .get("/browse", middleware, browse)
  .put("/update_status", middleware, update_status);

module.exports = router;
