const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, find, update, destroy, browse } = require("../controllers/Banks");

router
  .post("/save", middleware, save)
  .get("/find", middleware, find)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update)
  .delete("/:id/destroy", middleware, destroy);

module.exports = router;
