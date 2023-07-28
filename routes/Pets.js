const router = require("express").Router();
const middleware = require("../middleware/jwt");
const { save, browse, update, destroy } = require("../controllers/Pets");

router
  .post("/save", middleware, save)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update)
  .delete("/:id/destroy", middleware, destroy);

module.exports = router;
