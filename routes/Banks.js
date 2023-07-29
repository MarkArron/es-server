const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, find, update, destroy } = require("../controllers/Banks");

router
  .post("/save", middleware, save)
  .get("/find", middleware, find)
  .put("/update", middleware, update)
  .delete("/:id/destroy", middleware, destroy);

module.exports = router;
