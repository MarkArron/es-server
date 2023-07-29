const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, find, browse } = require("../controllers/Scores");

router
  .post("/save", middleware, save)
  .get("/find", middleware, find)
  .get("/browse", middleware, browse);

module.exports = router;
