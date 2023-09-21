const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, update, browse, find } = require("../controllers/Appointments");

router
  .post("/save", middleware, save)
  .get("/find", middleware, find)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update);

module.exports = router;
