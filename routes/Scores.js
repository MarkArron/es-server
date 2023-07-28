const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, find, browse } = require("../controllers/Scores");

router
  .post("/save", save)
  .get("/find", middleware, find)
  .put("/browse", middleware, browse);

module.exports = router;
