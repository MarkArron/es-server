const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  update_status,
  browse,
  find,
} = require("../controllers/Appointments");

router
  .post("/save", middleware, save)
  .get("/find", middleware, find)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update_status);

module.exports = router;
