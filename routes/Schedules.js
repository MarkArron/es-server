const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, browse, update, find } = require("../controllers/Schedules");

router
  .post("/save", middleware, save)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update)
  .get("/find", middleware, find);

module.exports = router;
