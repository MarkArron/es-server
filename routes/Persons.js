const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  browse,
  update,
  destroy,
  login,
} = require("../controllers/Persons");

router
  .post("/save", save)
  .get("/login", login)
  .get("/browse", middleware, browse)
  .put("/update", middleware, update)
  .delete("/:id/destroy", middleware, destroy);

module.exports = router;
